export function aiDecision(
  question: { correct: "a" | "b" },
  iq: number,
  difficulty: "easy" | "medium" | "hard" | "god" = "medium",
  streak = 0
): "a" | "b" {

  // Base accuracy curve (non-linear like humans)
  let baseAccuracy = Math.pow(iq, 1.5);

  // Difficulty modifiers
  const diffMod = {
    easy: 1.1,
    medium: 1.0,
    hard: 0.85,
    god: 1.0, // god handled by iq, keep neutral
  }[difficulty];

  // Streak momentum (AI confidence tilt)
  const streakBoost = Math.min(streak * 0.02, 0.15);

  // Human randomness noise
  const chaos = (Math.random() - 0.5) * 0.1;

  let finalAccuracy = baseAccuracy * diffMod + streakBoost + chaos;

  // Clamp (prevent AI becoming literally perfect)
  finalAccuracy = Math.max(0, Math.min(0.97, finalAccuracy));

  // Decision
  if (Math.random() < finalAccuracy) return question.correct;
  return question.correct === "a" ? "b" : "a";
}
