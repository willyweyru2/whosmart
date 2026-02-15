// lib/questionEngine.ts

type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

let questionCache: Question[] = [];
let cacheIndex = 0;
let lastFetchTime = 0;

const CACHE_TTL = 1000 * 30; // 30 seconds (faster refresh while dev)

// Fisher-Yates shuffle (better than Math.random sort)
function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getQuestions(difficulty = "medium") {
  const now = Date.now();

  try {
    // Force refresh if empty OR expired
    if (!questionCache.length || now - lastFetchTime > CACHE_TTL) {
      console.log("🧠 Fetching NEW Gemini questions...");

      const res = await fetch("/api/geminiQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty, seed: Date.now() }), // seed forces randomness
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Gemini API failed");

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("Bad Gemini data");

      questionCache = data.map((q: any) => ({
        question: q.question || "AI glitch question 🤖",
        a: q.a || "Option A",
        b: q.b || "Option B",
        correct: q.correct === "b" ? "b" : "a",
      }));

      shuffle(questionCache);

      cacheIndex = 0;
      lastFetchTime = now;
    }

    return questionCache;
  } catch (err) {
    console.warn("⚠️ Gemini failed, using fallback", err);

    // Fallback pool (bigger so it doesn’t feel repetitive)
    const fallback: Question[] = [
      { question: "What is the speed of light?", a: "299,792 km/s", b: "150,000 km/s", correct: "a" },
      { question: "Who created the World Wide Web?", a: "Tim Berners-Lee", b: "Elon Musk", correct: "a" },
      { question: "What planet is known as the Red Planet?", a: "Mars", b: "Venus", correct: "a" },
      { question: "What is the largest ocean?", a: "Pacific", b: "Indian", correct: "a" },
      { question: "What is H2O?", a: "Water", b: "Oxygen", correct: "a" },
      { question: "Who wrote Hamlet?", a: "Shakespeare", b: "Einstein", correct: "a" },
    ];

    questionCache = shuffle(fallback);
    cacheIndex = 0;
    lastFetchTime = now;

    return questionCache;
  }
}

// Serve ONE question sequentially
export function getNextQuestion(): Question | null {
  if (!questionCache.length) return null;

  const q = questionCache[cacheIndex];
  cacheIndex++;

  // Loop but reshuffle each round
  if (cacheIndex >= questionCache.length) {
    cacheIndex = 0;
    shuffle(questionCache);
  }

  return q;
}
