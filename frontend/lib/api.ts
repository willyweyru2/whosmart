export async function getLevel(level: number) {
  return {
    question: "Who is smarter?",
    cards: [
      { name: "Albert Einstein", correct: true },
      { name: "Random Person", correct: false }
    ]
  };
}
