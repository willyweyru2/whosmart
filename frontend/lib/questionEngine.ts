// lib/questionEngine.ts

type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

let questionCache: Question[] = [];
let cacheIndex = 0;
let isFetching = false;
let lastFetchTime = 0;

const CACHE_TTL = 1000 * 60 * 2;
const LOW_WATER_MARK = 5;
const MAX_CACHE = 50;

// IMPORTANT: Do NOT mutate original array
function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function dedupeQuestions(list: Question[]) {
  const seen = new Set<string>();
  return list.filter(q => {
    const key = q.question.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchGeminiBatch() {
  if (isFetching) return;
  isFetching = true;

  try {
    console.log("🧠 Fetching Gemini questions...");

    const res = await fetch("/api/geminiBatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: 20, difficulty: "medium" }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gemini API failed");

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid Gemini format");

    const cleaned: Question[] = data.map((q: any) => ({
      question: q.question || "AI glitch 🤖",
      a: q.a || "Option A",
      b: q.b || "Option B",
      correct: q.correct === "b" ? "b" : "a",
    }));

    const merged = dedupeQuestions([...questionCache, ...cleaned]);
    questionCache = shuffle(merged).slice(0, MAX_CACHE);

    // ✅ Reset index if cache shrank or overflowed
    if (cacheIndex >= questionCache.length) {
      cacheIndex = 0;
    }

    console.log(`✅ Cache size: ${questionCache.length}`);
  } catch (err) {
    console.error("❌ Gemini fetch failed:", err);
  } finally {
    isFetching = false;
    lastFetchTime = Date.now();
  }
}

// Preload questions
export async function getQuestions() {
  if (questionCache.length === 0) {
    await fetchGeminiBatch();
  }

  if (Date.now() - lastFetchTime > CACHE_TTL) {
    // fire & forget refresh (safe)
    fetchGeminiBatch();
  }

  return questionCache;
}

// Main game function
export async function getNextQuestion(): Promise<Question | null> {
  if (questionCache.length === 0) {
    await fetchGeminiBatch();
    if (!questionCache.length) return null;
  }

  const q = questionCache[cacheIndex];

  cacheIndex++;

  if (cacheIndex >= questionCache.length) {
    cacheIndex = 0;
  }

  // Preload more in background safely
  if (questionCache.length - cacheIndex < LOW_WATER_MARK) {
    fetchGeminiBatch();
  }

  return q;
}
