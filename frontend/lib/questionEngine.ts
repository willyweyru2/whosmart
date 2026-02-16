// lib/questionEngine.ts

export type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

// GLOBAL CACHE (client singleton)
let questionCache: Question[] = [];
let cacheIndex = 0;
let isFetching = false;
let lastFetchTime = 0;

// CONFIG
const CACHE_TTL = 1000 * 60 * 2; // 2 minutes
const LOW_WATER_MARK = 5;
const MAX_CACHE = 50;

// 🔀 Safe shuffle (no mutation)
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// 🧹 Remove duplicate questions
function dedupeQuestions(list: Question[]) {
  const seen = new Set<string>();
  return list.filter(q => {
    const key = q.question.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 🔥 Fetch from Gemini API route
async function fetchGeminiBatch() {
  if (isFetching) return;
  isFetching = true;

  try {
    console.log("🧠 Fetching Gemini questions...");

    const res = await fetch("/api/geminiQuestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        difficulty: "medium",
        seed: Date.now(),
      }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gemini API failed");

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid Gemini JSON");

    const cleaned: Question[] = data.map((q: any) => ({
      question: String(q.question || "AI glitch 🤖"),
      a: String(q.a || "Option A"),
      b: String(q.b || "Option B"),
      correct: q.correct === "b" ? "b" : "a",
    }));

    // Merge + dedupe + shuffle
    const merged = dedupeQuestions([...questionCache, ...cleaned]);
    questionCache = shuffle(merged).slice(0, MAX_CACHE);

    // Reset index if needed
    if (cacheIndex >= questionCache.length) {
      cacheIndex = 0;
    }

    console.log("✅ BrainWho cache size:", questionCache.length);
  } catch (err) {
    console.error("❌ Gemini fetch failed:", err);
  } finally {
    isFetching = false;
    lastFetchTime = Date.now();
  }
}

// 🧠 Preload questions
export async function getQuestions(): Promise<Question[]> {
  if (questionCache.length === 0) {
    await fetchGeminiBatch();
  }

  // Refresh in background
  if (Date.now() - lastFetchTime > CACHE_TTL) {
    fetchGeminiBatch();
  }

  return questionCache;
}

// 🎮 Main game loop function
export async function getNextQuestion(): Promise<Question | null> {
  if (questionCache.length === 0) {
    await fetchGeminiBatch();
    if (!questionCache.length) return null;
  }

  const q = questionCache[cacheIndex];

  cacheIndex++;

  // Loop safely
  if (cacheIndex >= questionCache.length) {
    cacheIndex = 0;
  }

  // Background refill
  if (questionCache.length - cacheIndex < LOW_WATER_MARK) {
    fetchGeminiBatch();
  }

  return q;
}
