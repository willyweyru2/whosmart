export function aiDecision(
  question: { correct: "a" | "b" },
  iq: number
): "a" | "b" {
  // AI chooses correct answer based on IQ probability
  if (Math.random() < iq) return question.correct;
  return question.correct === "a" ? "b" : "a";
}
