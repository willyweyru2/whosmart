import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Soft dedupe (best effort only)
const seen = new Set<string>();

function clean(text: string) {
  return text.replace(/```json|```/g, "").trim();
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ JSON parse failed:", text);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { difficulty = "medium", count = 20 } = await req.json().catch(() => ({}));

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ⚡ fast + stable
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        responseMimeType: "application/json", // 🔥 FORCE JSON
        maxOutputTokens: 2048,
      },
    });

    const seed = Math.random().toString(36).slice(2);

    const prompt = `
Generate ${count} EXTREMELY UNIQUE binary trivia questions.

Rules:
- Difficulty: ${difficulty}
- Max 12 words per question
- Only 2 answers: a and b
- correct must be "a" or "b"
- No markdown, no explanations
- STRICT JSON ARRAY ONLY
- No repeated topics

Format:
[
 { "question":"...", "a":"...", "b":"...", "correct":"a" }
]

Random seed: ${seed}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const parsed = safeParse(clean(raw));

    if (!Array.isArray(parsed)) throw new Error("Gemini returned invalid JSON");

    const cleaned = parsed
      .filter((q: any) => q?.question)
      .map((q: any) => ({
        question: String(q.question).trim(),
        a: String(q.a || "A").trim(),
        b: String(q.b || "B").trim(),
        correct: q.correct === "b" ? "b" : "a",
      }))
      .filter(q => {
        const key = q.question.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    console.log(`🧠 Gemini returned ${cleaned.length}/${count}`);

    return NextResponse.json(cleaned, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (err) {
    console.error("❌ GEMINI FAILED:", err);

    // Hard fallback
    return NextResponse.json([
      { question: "Speed of light?", a: "299,792 km/s", b: "150,000 km/s", correct: "a" },
      { question: "Red Planet?", a: "Mars", b: "Venus", correct: "a" },
      { question: "2+2×2=?", a: "6", b: "8", correct: "a" },
      { question: "Largest ocean?", a: "Pacific", b: "Atlantic", correct: "a" },
      { question: "WWW inventor?", a: "Tim Berners-Lee", b: "Bill Gates", correct: "a" },
    ]);
  }
}
