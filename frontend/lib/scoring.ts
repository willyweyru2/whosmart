// lib/scoring.ts

import { Category } from "./questions";

export type ScoreState = {
  total: number;
  correct: number;
  categoryScore: Record<Category, number>;
  categoryTotal: Record<Category, number>;
};

export function createScoreState(): ScoreState {
  return {
    total: 0,
    correct: 0,
    categoryScore: {
      science: 0,
      logic: 0,
      math: 0,
      trick: 0,
    },
    categoryTotal: {
      science: 0,
      logic: 0,
      math: 0,
      trick: 0,
    },
  };
}

export function recordAnswer(
  state: ScoreState,
  category: Category,
  isCorrect: boolean
) {
  state.total++;
  state.categoryTotal[category]++;

  if (isCorrect) {
    state.correct++;
    state.categoryScore[category]++;
  }
}

// Convert to IQ-like score
export function calculateIQ(state: ScoreState) {
  const baseIQ = 70;
  const maxIQ = 160;

  const accuracy = state.correct / Math.max(state.total, 1);
  return Math.round(baseIQ + accuracy * (maxIQ - baseIQ));
}

// Category breakdown %
export function categoryPercent(state: ScoreState, category: Category) {
  const total = state.categoryTotal[category];
  if (!total) return 0;
  return Math.round((state.categoryScore[category] / total) * 100);
}
