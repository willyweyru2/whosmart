import { Category, ALL_CATEGORIES } from "./questions";

export const score = {
  categoryCorrect: Object.fromEntries(
    ALL_CATEGORIES.map((c) => [c, 0])
  ) as Record<Category, number>,

  categoryTotal: Object.fromEntries(
    ALL_CATEGORIES.map((c) => [c, 0])
  ) as Record<Category, number>,
};

export function recordAnswer(category: Category, correct: boolean) {
  score.categoryTotal[category]++;
  if (correct) score.categoryCorrect[category]++;
}
