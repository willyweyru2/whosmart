import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// FORCE Node runtime (Gemini SDK breaks on Edge)
export const runtime = "nodejs";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const difficulty = body.difficulty || "medium";
  const seed = body.seed || Date.now();

  console.log("⚡ Gemini request", { difficulty, seed });

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json", // 🔥 FORCE JSON
    },
  });

  const prompt = `
Generate EXACTLY 5 BrainWho duel questions.

Rules:
- Unique every call (use seed ${seed})
- Topics: math, science, tech, history, geography, logic
- Difficulty: ${difficulty}
- 2 options only (a, b)
- One correct answer
- NO jokes, riddles, opinions
- STRICT JSON ARRAY ONLY

Format:
[
 { "question":"...", "a":"...", "b":"...", "correct":"a" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log("🧠 RAW GEMINI OUTPUT:", text);

    // Clean any wrappers just in case
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    console.log("✅ Gemini parsed OK");

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("❌ GEMINI ERROR:", err?.message || err);

    // Hard fallback (game must never break)
    return NextResponse.json([
      { question: "5 + 7?", a: "12", b: "10", correct: "a" },
      { question: "H2O is?", a: "Water", b: "Hydrogen", correct: "a" },
      { question: "Earth is the ___ planet from the sun?", a: "3rd", b: "2nd", correct: "a" },
      { question: "Capital of Germany?", a: "Berlin", b: "Munich", correct: "a" },
      { question: "Binary 2 means?", a: "10", b: "11", correct: "a" },
    ]);
  }
}
