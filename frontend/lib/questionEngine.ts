// lib/questionEngine.ts

let questionCache: any[] = [];
let cacheIndex = 0;
let lastFetchTime = 0;

// Fetch fresh questions every round or every 2 minutes
const CACHE_TTL = 1000 * 60 * 2; 

export async function getQuestions(difficulty = "medium") {
  const now = Date.now();

  try {
    // Force refresh if cache expired OR empty
    if (questionCache.length === 0 || now - lastFetchTime > CACHE_TTL) {
      console.log("🧠 Fetching NEW Grok questions...");

      const res = await fetch("/api/grokQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Grok API failed");

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("Bad Grok data");

      questionCache = data.map((q: any) => ({
        question: q.question || "AI glitch question 🤖",
        a: q.a || "Option A",
        b: q.b || "Option B",
        correct: q.correct === "b" ? "b" : "a",
      }));

      // Shuffle questions
      questionCache = questionCache.sort(() => Math.random() - 0.5);

      cacheIndex = 0;
      lastFetchTime = now;
    }

    return questionCache;
  } catch (err) {
    console.warn("⚠️ Grok failed, using emergency fallback", err);

    // Randomized fallback so it never repeats the same 2
    const fallback = [
      {
        question: "What is the speed of light?",
        a: "299,792 km/s",
        b: "150,000 km/s",
        correct: "a",
      },
      {
        question: "Who created the World Wide Web?",
        a: "Tim Berners-Lee",
        b: "Elon Musk",
        correct: "a",
      },
      {
        question: "What planet is known as the Red Planet?",
        a: "Mars",
        b: "Venus",
        correct: "a",
      },
      {
        question: "What is the largest ocean on Earth?",
        a: "Pacific Ocean",
        b: "Atlantic Ocean",
        correct: "a",
      },
    ];

    questionCache = fallback.sort(() => Math.random() - 0.5);
    cacheIndex = 0;
    lastFetchTime = now;

    return questionCache;
  }
}

// Get ONE question sequentially
export function getNextQuestion() {
  if (questionCache.length === 0) return null;

  const q = questionCache[cacheIndex];
  cacheIndex++;

  // Auto loop but reshuffle each cycle
  if (cacheIndex >= questionCache.length) {
    cacheIndex = 0;
    questionCache = questionCache.sort(() => Math.random() - 0.5);
  }

  return q;
}
