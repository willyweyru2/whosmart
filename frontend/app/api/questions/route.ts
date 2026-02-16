import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // Gemini SDK works best in node runtime

// Validate API key early
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ================= QUESTION GENERATOR =================

async function generateQuestions(used: string[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a duel IQ trivia engine.

Generate 5 UNIQUE questions.

Rules:
- NEVER repeat these:
${used.join("\n")}

- Exactly TWO options: a and b
- Only ONE correct answer
- No opinions
- No riddles
- No trick paradoxes
- Use math, science, logic, facts
- Output STRICT JSON ONLY (no markdown, no explanation)

Return format:
[
 { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let raw = result.response.text();

    console.log("🧠 GEMINI RAW:", raw);

    // Remove markdown junk
    raw = raw.replace(/```json|```/g, "").trim();

    // Extract JSON array safely
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]") + 1;
    const json = raw.slice(start, end);

    return JSON.parse(json);
  } catch (err) {
    console.error("🔥 GEMINI JSON ERROR:", err);
    return fallback();
  }
}

// ================= API ROUTE =================

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const used = body.used || [];

    const questions = await generateQuestions(used);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return NextResponse.json({ questions: fallback() }, { status: 500 });
  }
}

// ================= FALLBACK QUESTIONS =================

function fallback() {
  return [
    { question: "5 + 7 = ?", a: "12", b: "10", correct: "a" },
    { question: "H2O is called?", a: "Water", b: "Oxygen", correct: "a" },
    { question: "10 × 10 = ?", a: "100", b: "20", correct: "a" },
    { question: "Earth is the ___ planet from Sun?", a: "3rd", b: "4th", correct: "a" },
    { question: "Speed of light is ~?", a: "300,000 km/s", b: "30,000 km/s", correct: "a" },
  ];
}
