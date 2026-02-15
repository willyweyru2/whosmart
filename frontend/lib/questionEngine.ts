export async function getQuestions(difficulty = "medium") {
  try {
    const res = await fetch("/api/grokQuestions", {
      method: "POST",
      body: JSON.stringify({ difficulty }),
    });

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Bad Grok data");

    return data;
  } catch {
    console.warn("Grok failed, fallback questions");

    return [
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
  }
}
