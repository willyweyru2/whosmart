import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// ===== AI QUESTION ENGINE =====
async function generateQuestions() {
  const prompt = `
Generate 5 duel IQ questions with EXACTLY one correct answer.

Rules:
- Only TWO options: a and b
- ONLY one correct answer
- No trick or equal answers
- No opinions, only facts, logic, math, science
- Output STRICT JSON ONLY (no text, no markdown)

Format:
[
  { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`;

  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You are a strict JSON API. Output ONLY valid JSON. No explanations.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 600,
  });

  let raw = res.choices[0].message.content || "";

  // 🧠 CLEAN AI OUTPUT (GROQ OFTEN ADDS TEXT)
  raw = raw.replace(/```json|```/g, "").trim();

  let questions: any[] = [];
  try {
    questions = JSON.parse(raw);
  } catch {
    console.error("AI returned invalid JSON:", raw);
    return fallbackArray();
  }

  // ✅ FILTER BAD QUESTIONS
  questions = questions.filter(
    (q) => q?.question && q?.a && q?.b && (q.correct === "a" || q.correct === "b")
  );

  // ✅ FORCE SAFETY
  questions.forEach((q) => {
    if (q.correct !== "a" && q.correct !== "b") q.correct = "a";
  });

  // ❗ If AI failed, force fallback
  if (questions.length < 2) return fallbackArray();

  return questions;
}

// ===== API ROUTES =====
export async function GET() {
  try {
    const questions = await generateQuestions();
    return NextResponse.json({ questions });
  } catch (e) {
    console.error("Question API error", e);
    return NextResponse.json({ questions: fallbackArray() });
  }
}

export async function POST() {
  try {
    const questions = await generateQuestions();
    return NextResponse.json({ questions });
  } catch (e) {
    console.error("Question API error", e);
    return NextResponse.json({ questions: fallbackArray() });
  }
}

// ===== HARD FALLBACK (GAME NEVER BREAKS) =====
function fallbackArray() {
  return [
    {
      question: "Which planet is closest to the Sun?",
      a: "Mercury",
      b: "Mars",
      correct: "a",
    },
    {
      question: "What is 5 × 6?",
      a: "30",
      b: "20",
      correct: "a",
    },
    {
      question: "Water freezes at?",
      a: "0°C",
      b: "100°C",
      correct: "a",
    },
    {
      question: "Which is larger?",
      a: "1 meter",
      b: "1 centimeter",
      correct: "a",
    },
    {
      question: "Earth is a?",
      a: "Planet",
      b: "Star",
      correct: "a",
    },
  ];
}
