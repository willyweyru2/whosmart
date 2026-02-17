// lib/questionEngine.ts

import { QUESTIONS, Question, Difficulty } from "./questions";

/* Shuffle pool */
let pool: Question[] = [];
let currentDifficulty: Difficulty = "medium";

/* Fisher-Yates shuffle (SAFE) */
function shuffle(array: Question[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* Reset pool by difficulty */
export function resetQuestionPool(diff: Difficulty) {
  currentDifficulty = diff;

  pool = QUESTIONS.filter(q => q.difficulty === diff);

  // fallback if empty
  if (pool.length === 0) pool = [...QUESTIONS];

  pool = shuffle(pool);
}

/* Get next question */
export function getNextQuestion(): Question {
  if (pool.length === 0) {
    resetQuestionPool(currentDifficulty);
  }

  const next = pool.shift();
  return next ?? QUESTIONS[0]; // ✅ NEVER return undefined
}

/* Peek next question */
export function peekNextQuestion(): Question {
  if (pool.length === 0) {
    resetQuestionPool(currentDifficulty);
  }

  return pool[0] ?? QUESTIONS[0];
}
