// lib/questions.ts

const baseCategories: Category[] = ["science", "logic", "math"];

export const score = {
  categoryCorrect: Object.fromEntries(baseCategories.map(c => [c, 0])) as Record<Category, number>,
  categoryTotal: Object.fromEntries(baseCategories.map(c => [c, 0])) as Record<Category, number>,
};


export type Difficulty = "easy" | "medium" | "hard";

export type Category =
  | "science"
  | "philosophy"
  | "politics"
  | "math"
  | "logic"
  | "general"
  | "paradox"
  | "cognitive"
  | "quantum";

export type Question = {
  id: number;
  question: string;
  a: string;
  b: string;
  answer: boolean;
  category: Category;
  difficulty: Difficulty;
};

export const QUESTIONS: Question[] = [
  /* ================= EASY ================= */

  { id: 1, question: "Is water H2O?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 2, question: "Is the Sun a star?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 3, question: "Is 2 + 2 = 4?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "easy" },
  { id: 4, question: "Is logic part of philosophy?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "easy" },

  /* ================= MEDIUM ================= */

  { id: 10, question: "Does light travel faster than sound?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "medium" },
  { id: 11, question: "Is Pi irrational?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "medium" },
  { id: 12, question: "Did Plato teach Aristotle?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },

  /* ================= HARD ================= */

  { id: 20, question: "Is Gödel's incompleteness theorem about limits of formal systems?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "hard" },
  { id: 21, question: "Did Einstein propose spacetime curvature causes gravity?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "hard" },

  /* ================= PARADOX QUESTIONS ================= */

  { id: 30, question: "If Pinocchio says 'My nose will grow now', is the statement paradoxical?", a: "Yes", b: "No", answer: true, category: "paradox", difficulty: "hard" },
  { id: 31, question: "Is the Liar Paradox logically consistent?", a: "Yes", b: "No", answer: false, category: "paradox", difficulty: "hard" },
  { id: 32, question: "Is 'This statement is false' a paradox?", a: "Yes", b: "No", answer: true, category: "paradox", difficulty: "medium" },
  { id: 33, question: "Does the Ship of Theseus question identity over time?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },

  /* ================= COGNITIVE BIAS TRAPS ================= */

  { id: 40, question: "Is confirmation bias the tendency to seek information that confirms beliefs?", a: "Yes", b: "No", answer: true, category: "cognitive", difficulty: "medium" },
  { id: 41, question: "Does the availability heuristic make rare events seem common?", a: "Yes", b: "No", answer: true, category: "cognitive", difficulty: "hard" },
  { id: 42, question: "Is the sunk cost fallacy rational?", a: "Yes", b: "No", answer: false, category: "cognitive", difficulty: "hard" },
  { id: 43, question: "Does the Dunning-Kruger effect describe overconfidence among low-skill individuals?", a: "Yes", b: "No", answer: true, category: "cognitive", difficulty: "medium" },

  /* ================= QUANTUM PHYSICS ================= */

  { id: 50, question: "Can particles exist in superposition?", a: "Yes", b: "No", answer: true, category: "quantum", difficulty: "medium" },
  { id: 51, question: "Does Schrödinger's cat represent quantum superposition?", a: "Yes", b: "No", answer: true, category: "quantum", difficulty: "medium" },
  { id: 52, question: "Does observation collapse the wave function?", a: "Yes", b: "No", answer: true, category: "quantum", difficulty: "hard" },
  { id: 53, question: "Is quantum entanglement faster than light communication?", a: "Yes", b: "No", answer: false, category: "quantum", difficulty: "hard" },

  /* ================= PHILOSOPHY THOUGHT EXPERIMENTS ================= */

  { id: 60, question: "Is the Trolley Problem about moral decision-making?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },
  { id: 61, question: "Does the Brain-in-a-Vat challenge knowledge of reality?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "hard" },
  { id: 62, question: "Is 'Cogito, ergo sum' Descartes’ proof of existence?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },
  { id: 63, question: "Does the Experience Machine question hedonism?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "hard" },

  /* ================= LOGIC PUZZLES DISGUISED AS YES/NO ================= */

  { id: 70, question: "If all humans are mortal and Socrates is human, is Socrates mortal?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "easy" },
  { id: 71, question: "If A implies B and A is true, must B be true?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "medium" },
  { id: 72, question: "If 'All ravens are black' logically equivalent to 'All non-black things are not ravens'?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "hard" },
  { id: 73, question: "If a statement and its negation are both true, is the system inconsistent?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "hard" },
];
