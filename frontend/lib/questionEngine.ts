// lib/questionEngine.ts

import { QUESTIONS, Question, Difficulty } from "./questions";

/* Shuffle pool */
let pool: Question[] = [];

/* Reset pool by difficulty */
export function resetQuestionPool(diff: Difficulty) {
  pool = QUESTIONS.filter(q => q.difficulty === diff);

  // fallback if empty
  if (pool.length === 0) pool = QUESTIONS;

  pool = pool.sort(() => Math.random() - 0.5);
}

/* Get next question */
export function getNextQuestion(): Question {
  if (pool.length === 0) {
    resetQuestionPool("medium");
  }
  return pool.shift()!;
}

/* Peek next question */
export function peekNextQuestion(): Question {
  if (pool.length === 0) {
    resetQuestionPool("medium");
  }
  return pool[0];
}
