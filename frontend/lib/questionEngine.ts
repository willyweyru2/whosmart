// lib/questionEngine.ts
import { QUESTIONS as questions, Question, Difficulty } from "./questions";

// shuffle once per session
let pool: Question[] = [];
let index = 0;
let currentDifficulty: Difficulty = "medium";

function shuffle(arr: Question[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export function resetQuestionPool(diff: Difficulty = "medium") {
  currentDifficulty = diff;
  pool = shuffle(questions.filter(q => q.difficulty === diff));
  index = 0;
}

// preload next question without advancing pointer
export function peekNextQuestion(): Question {
  if (!pool.length) resetQuestionPool(currentDifficulty);
  return pool[index % pool.length];
}

// advance pointer
export function getNextQuestion(): Question {
  if (!pool.length) resetQuestionPool(currentDifficulty);
  const q = pool[index % pool.length];
  index++;
  return q;
}
