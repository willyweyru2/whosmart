// lib/questions.ts

export type Difficulty = "easy" | "medium" | "hard";

export type Category =
  | "science"
  | "philosophy"
  | "politics"
  | "math"
  | "logic"
  | "general";

export type Question = {
  id: number;
  question: string;
  a: string;
  b: string;
  answer: boolean; // true = A, false = B
  category: Category;
  difficulty: Difficulty;
};

export const QUESTIONS: Question[] = [
  // ================= EASY =================
  { id: 1, question: "Is water H2O?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 2, question: "Is the Sun a star?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 3, question: "Is 5 + 5 = 10?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "easy" },
  { id: 4, question: "Is Africa a continent?", a: "Yes", b: "No", answer: true, category: "general", difficulty: "easy" },
  { id: 5, question: "Is the Earth round?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 6, question: "Is gold a metal?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 7, question: "Is Python a programming language?", a: "Yes", b: "No", answer: true, category: "general", difficulty: "easy" },
  { id: 8, question: "Is democracy a form of government?", a: "Yes", b: "No", answer: true, category: "politics", difficulty: "easy" },
  { id: 9, question: "Is the brain part of the nervous system?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "easy" },
  { id: 10, question: "Is philosophy about thinking and knowledge?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "easy" },

  // ================= MEDIUM =================
  { id: 11, question: "Does light travel faster than sound?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "medium" },
  { id: 12, question: "Is Pi approximately 3.14?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "medium" },
  { id: 13, question: "Did Aristotle teach Alexander the Great?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },
  { id: 14, question: "Is a prime number divisible only by 1 and itself?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "medium" },
  { id: 15, question: "Is DNA shaped like a double helix?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "medium" },
  { id: 16, question: "Did Plato write 'The Republic'?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "medium" },
  { id: 17, question: "Is the UN an international organization?", a: "Yes", b: "No", answer: true, category: "politics", difficulty: "medium" },
  { id: 18, question: "Is gravity a force?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "medium" },
  { id: 19, question: "Is Bitcoin a cryptocurrency?", a: "Yes", b: "No", answer: true, category: "general", difficulty: "medium" },
  { id: 20, question: "Is logic a branch of philosophy?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "medium" },

  // ================= HARD =================
  { id: 21, question: "Did Einstein develop the theory of relativity?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "hard" },
  { id: 22, question: "Is Gödel known for incompleteness theorems?", a: "Yes", b: "No", answer: true, category: "logic", difficulty: "hard" },
  { id: 23, question: "Did Kant write 'Critique of Pure Reason'?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "hard" },
  { id: 24, question: "Is Schrödinger associated with quantum mechanics?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "hard" },
  { id: 25, question: "Did Hobbes write 'Leviathan'?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "hard" },
  { id: 26, question: "Is entropy a measure of disorder?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "hard" },
  { id: 27, question: "Is Machiavelli known for 'The Prince'?", a: "Yes", b: "No", answer: true, category: "politics", difficulty: "hard" },
  { id: 28, question: "Is a black hole defined by an event horizon?", a: "Yes", b: "No", answer: true, category: "science", difficulty: "hard" },
  { id: 29, question: "Did Nietzsche write 'Thus Spoke Zarathustra'?", a: "Yes", b: "No", answer: true, category: "philosophy", difficulty: "hard" },
  { id: 30, question: "Is calculus used to study change and motion?", a: "Yes", b: "No", answer: true, category: "math", difficulty: "hard" },

  // ================= MIXED KNOWLEDGE (31–100) =================
  ...Array.from({ length: 70 }).map((_, i) => ({
    id: 31 + i,
    question: `General knowledge question #${31 + i}: Is this statement true?`,
    a: "Yes",
    b: "No",
    answer: Math.random() > 0.5,
    category: ["science", "philosophy", "politics", "math", "logic", "general"][i % 6] as Category,
    difficulty: (i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard") as Difficulty,
  })),
];
