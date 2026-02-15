let questionCache: any[] = [];
let cacheIndex = 0;

export async function getQuestions(difficulty = "medium") {
  try {
    // If we still have questions, return cached ones
    if (questionCache.length > 0 && cacheIndex < questionCache.length) {
      return questionCache;
    }

    const res = await fetch("/api/grokQuestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Grok API failed");

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("Bad Grok data");

    // Sanitize + shuffle
    questionCache = data
      .map((q: any) => ({
        question: q.question || "AI glitch question 🤖",
        a: q.a || "Option A",
        b: q.b || "Option B",
        correct: q.correct === "b" ? "b" : "a",
      }))
      .sort(() => Math.random() - 0.5); // shuffle

    cacheIndex = 0;
    return questionCache;
  } catch (err) {
    console.warn("⚠️ Grok failed, fallback questions", err);

    questionCache = [
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
    ];
    cacheIndex = 0;
    return questionCache;
  }
}

// Get ONE question at a time (safe helper)
export function getNextQuestion() {
  if (cacheIndex >= questionCache.length) cacheIndex = 0;
  return questionCache[cacheIndex++];
}
