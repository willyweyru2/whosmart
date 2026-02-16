// lib/questionEngine.ts

export type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

// ================= GLOBAL CLIENT CACHE =================
let questionCache: Question[] = [];
let cacheIndex = 0;
let isFetching = false;
let lastFetchTime = 0;

// CONFIG
const CACHE_TTL = 1000 * 60 * 2; // refresh every 2 min
const LOW_WATER_MARK = 5;
const MAX_CACHE = 50;

// ================= UTILS =================

// Shuffle without mutation
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Deduplicate by question text
function dedupeQuestions(list: Question[]) {
  const seen = new Set<string>();
  return list.filter(q => {
    const key = q.question.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ================= GEMINI FETCH =================
async function fetchGeminiBatch() {
  if (isFetching) return;
  isFetching = true;

  try {
    console.log("🧠 Fetching Gemini questions...");

    const res = await fetch("/api/geminiBatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: 20,
        difficulty: "medium",
      }),
      cache: "no-store", // 🔥 FORCE NO CACHE
    });

    if (!res.ok) throw new Error(`Gemini API failed ${res.status}`);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid Gemini JSON");

    const cleaned: Question[] = data.map((q: any) => ({
      question: String(q.question || "AI glitch 🤖"),
      a: String(q.a || "Option A"),
      b: String(q.b || "Option B"),
      correct: q.correct === "b" ? "b" : "a",
    }));

    const merged = dedupeQuestions([...questionCache, ...cleaned]);
    questionCache = shuffle(merged).slice(0, MAX_CACHE);

    if (cacheIndex >= questionCache.length) cacheIndex = 0;

    console.log("✅ BrainWho cache size:", questionCache.length);
  } catch (err) {
    console.error("❌ Gemini fetch failed:", err);
  } finally {
    isFetching = false;
    lastFetchTime = Date.now();
  }
}

// ================= PUBLIC API =================

// Preload
export async function getQuestions(): Promise<Question[]> {
  if (!questionCache.length) {
    await fetchGeminiBatch();
  }

  // Background refresh
  if (Date.now() - lastFetchTime > CACHE_TTL) {
    fetchGeminiBatch();
  }

  return questionCache;
}

// Main game loop
export async function getNextQuestion(): Promise<Question | null> {
  if (!questionCache.length) {
    await fetchGeminiBatch();
    if (!questionCache.length) return null;
  }

  const q = questionCache[cacheIndex];
  cacheIndex++;

  if (cacheIndex >= questionCache.length) cacheIndex = 0;

  // Auto refill
  if (questionCache.length - cacheIndex < LOW_WATER_MARK) {
    fetchGeminiBatch();
  }

  return q;
}
