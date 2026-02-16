import { QUESTIONS, Question, Difficulty } from "./questions";

/* ================= GLOBAL STATE ================= */

let cache: Question[] = [];
let pointer = 0;
let difficulty: Difficulty = "medium";

/* ================= SHUFFLE ================= */

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ================= NORMALIZER ================= */

function normalizeQuestion(raw: any): Question {
  return {
    question: raw.question ?? raw.text ?? "MISSING QUESTION",
    a: raw.a ?? "True",
    b: raw.b ?? "False",
    correct: raw.correct ?? raw.answer ?? true,
    category: raw.category ?? "logic",
    difficulty: raw.difficulty ?? "medium",
    id: raw.id ?? Math.random(),
  };
}

/* ================= LOAD QUESTIONS ================= */

function loadAllQuestions(): Question[] {
  const raw = Array.isArray(QUESTIONS)
    ? QUESTIONS
    : [...(QUESTIONS.easy ?? []), ...(QUESTIONS.medium ?? []), ...(QUESTIONS.hard ?? [])];

  return shuffle(raw.map(normalizeQuestion));
}

/* ================= DIFFICULTY STORAGE ================= */

function loadDifficulty() {
  if (typeof window === "undefined") return;
  const d = localStorage.getItem("bw_difficulty") as Difficulty;
  if (d) difficulty = d;
}

if (typeof window !== "undefined") {
  loadDifficulty();
  window.addEventListener("bw-difficulty-change", loadDifficulty);
}

/* ================= PUBLIC API ================= */

export async function getQuestions() {
  if (!cache.length) cache = loadAllQuestions();
  return cache;
}

/* ================= ADAPTIVE DIFFICULTY ================= */

export function updateDifficultyFromStreak(streak: number) {
  if (streak >= 10) difficulty = "hard";
  else if (streak >= 4) difficulty = "medium";
  else difficulty = "easy";

  if (typeof window !== "undefined") {
    localStorage.setItem("bw_difficulty", difficulty);
    window.dispatchEvent(new Event("bw-difficulty-change"));
  }
}

/* ================= MAIN QUESTION LOOP ================= */

export async function getNextQuestion(): Promise<Question> {
  if (!cache.length) cache = loadAllQuestions();

  // FILTER POOL
  let pool = cache.filter(q => q.difficulty === difficulty);
  if (!pool.length) pool = cache; // fallback

  // LOOP SAFELY
  if (pointer >= pool.length) {
    pointer = 0;
    pool = shuffle(pool); // reshuffle ONLY the pool
  }

  return pool[pointer++];
}

/* ================= DEBUG ================= */

export function getCurrentDifficulty() {
  return difficulty;
}

export function resetQuestionEngine() {
  cache = [];
  pointer = 0;
}
