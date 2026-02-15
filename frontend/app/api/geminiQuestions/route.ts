import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { difficulty, seed } = await req.json().catch(() => ({ difficulty: "medium", seed: Date.now() }));

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // 🔥 STRONG anti-repeat + diversity prompt
  const prompt = `
You are a trivia question generator for a game called BrainWho.

RULES:
- Generate EXACTLY 5 unique questions.
- Questions MUST be different every request.
- Mix topics: science, tech, history, geography, pop culture, logic.
- Difficulty level: ${difficulty}.
- DO NOT repeat previous questions.
- Use randomness seed: ${seed}

Output STRICT JSON ONLY. No markdown. No explanation.

FORMAT:
[
  { "question": "Question text", "a": "Option A", "b": "Option B", "correct": "a" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Gemini sometimes wraps JSON in ``` or text → strip it
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("❌ Gemini failed:", err);

    return NextResponse.json([
      { question: "What is the capital of Japan?", a: "Tokyo", b: "Osaka", correct: "a" },
      { question: "Who invented electricity?", a: "Benjamin Franklin", b: "Isaac Newton", correct: "a" },
      { question: "Which planet has rings?", a: "Saturn", b: "Mars", correct: "a" },
      { question: "What is 2+2?", a: "4", b: "22", correct: "a" },
      { question: "What does CPU stand for?", a: "Central Processing Unit", b: "Computer Personal Unit", correct: "a" },
    ]);
  }
}
