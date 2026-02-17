import type { Question } from "./questions";

/* BASE TRASH POOL */
const BASE_TRASH = [
  "Human neural lag detected.",
  "Your cortex is buffering.",
  "You think slow.",
  "Interesting. Still inferior.",
  "Carbon-based disappointment.",
  "Try again, organic unit.",
  "Your neurons are overheating.",
];

/* SMART TRASH BY CATEGORY */
const CATEGORY_TRASH: Record<string, string[]> = {
  science: [
    "Physics says you're wrong.",
    "Your science teacher weeps.",
    "Reality disagrees with you.",
  ],
  philosophy: [
    "Descartes would facepalm.",
    "Existential crisis detected.",
    "Cogito? More like forgot-o.",
  ],
  logic: [
    "Logic circuits outperform you.",
    "Your reasoning chain snapped.",
    "Boolean humiliation confirmed.",
  ],
  math: [
    "Arithmetic annihilation.",
    "Your calculator is smarter.",
    "Numbers reject you.",
  ],
  general: [
    "Common knowledge not found.",
    "General ignorance confirmed.",
  ],
};

/* TRASH WHEN USER WINS */
const PRAISE_TRASH = [
  "Impossible. You are not supposed to win.",
  "Statistical anomaly detected.",
  "Human intelligence spike detected.",
  "Are you cheating?",
];

/* SMART TRASH FUNCTION */
export function getSmartTrash(q: Question, correct: boolean): string {
  if (correct) {
    return PRAISE_TRASH[Math.floor(Math.random() * PRAISE_TRASH.length)];
  }

  const catLines = CATEGORY_TRASH[q.category] || BASE_TRASH;
  const allLines = [...BASE_TRASH, ...catLines];

  return allLines[Math.floor(Math.random() * allLines.length)];
}
