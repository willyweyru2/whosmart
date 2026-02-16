import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// ✅ Force Node runtime (Gemini SDK fails on Edge)
export const runtime = "nodejs";

// ✅ Disable Next.js caching (CRITICAL for fresh questions)
export const dynamic = "force-dynamic";
export const revalidate = 0;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const difficulty = body?.difficulty ?? "medium";
  const seed = body?.seed ?? Date.now();

  console.log("⚡ BrainWho Gemini request:", { difficulty, seed });

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.9, // more randomness
      topP: 0.95,
      responseMimeType: "application/json",
    },
  });

  const prompt = `
You are BrainWho AI duel engine.

Generate EXACTLY 5 trivia duel questions.

STRICT RULES:
- MUST be different every call (use seed ${seed})
- Topics: science, tech, history, geography, logic, pop culture
- Difficulty: ${difficulty}
- Only 2 options: "a" and "b"
- Exactly ONE correct answer
- No jokes, riddles, opinions
- No markdown, no explanations, no comments
- Output VALID JSON ARRAY ONLY

FORMAT:
[
  { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log("🧠 RAW GEMINI OUTPUT:\n", text);

    // Cleanup Gemini junk
    text = text.replace(/```json|```/g, "").trim();

    // Hard validation
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) || parsed.length !== 5) {
      throw new Error("Invalid Gemini format");
    }

    console.log("✅ Gemini questions OK");

    return NextResponse.json(parsed, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    console.error("❌ GEMINI FAILURE:", err?.message || err);

    // 🚨 NEVER BREAK GAME – HARD FALLBACK
    return NextResponse.json(
      [
        { question: "5 + 7?", a: "12", b: "10", correct: "a" },
        { question: "H2O is?", a: "Water", b: "Hydrogen", correct: "a" },
        { question: "Earth is the ___ planet from the sun?", a: "3rd", b: "2nd", correct: "a" },
        { question: "Capital of Germany?", a: "Berlin", b: "Munich", correct: "a" },
        { question: "Binary for 2 is?", a: "10", b: "11", correct: "a" },
      ],
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
