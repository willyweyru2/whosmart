import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Server memory dedupe (best effort)
const seen = new Set<string>();

function cleanJSON(text: string) {
  return text.replace(/```json|```/g, "").trim();
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    console.error("❌ JSON parse failed, raw Gemini output:", text);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { difficulty = "medium", count = 20 } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", // 🔥 MUCH better than flash for structured output
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    const seed = crypto.randomUUID();

    const systemPrompt = `
You are BrainWho Duel AI engine.

Generate ${count} EXTREMELY UNIQUE binary-choice questions.

Difficulty: ${difficulty}
Style: viral, fast, fun, unpredictable.

RULES:
- Ultra short questions (max 12 words)
- Only 2 answers
- a and b must be short
- correct must be "a" or "b"
- NO explanations
- NO markdown
- STRICT JSON ARRAY ONLY
- NEVER repeat any question topic or wording

Output EXACT JSON:

[
 {"question":"...","a":"...","b":"...","correct":"a"}
]

Seed: ${seed}
`;

    const result = await model.generateContent(systemPrompt);
    const raw = result.response.text();
    const parsed = safeParse(cleanJSON(raw));

    if (!Array.isArray(parsed)) throw new Error("Gemini returned invalid JSON");

    // Normalize + dedupe
    let cleaned = parsed
      .filter((q: any) => q?.question)
      .map((q: any) => ({
        question: q.question.trim(),
        a: (q.a || "A").trim(),
        b: (q.b || "B").trim(),
        correct: q.correct === "b" ? "b" : "a",
      }))
      .filter(q => {
        const key = q.question.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    console.log(`🧠 Gemini batch returned ${cleaned.length}/${count}`);

    return NextResponse.json(cleaned, {
      headers: { "Cache-Control": "no-store" },
    });

  } catch (err) {
    console.error("❌ Gemini API FAILED:", err);

    // HARD FALLBACK (never crash game)
    return NextResponse.json([
      { question: "Speed of light?", a: "299,792 km/s", b: "150,000 km/s", correct: "a" },
      { question: "Red Planet?", a: "Mars", b: "Venus", correct: "a" },
      { question: "2+2×2=?", a: "6", b: "8", correct: "a" },
      { question: "Largest ocean?", a: "Pacific", b: "Atlantic", correct: "a" },
      { question: "WWW inventor?", a: "Tim Berners-Lee", b: "Bill Gates", correct: "a" },
    ]);
  }
}
