// app/api/grokQuestions/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { difficulty = "medium" } = await req.json().catch(() => ({}));

  const prompt = `
You are BrainWho Duel AI.
Generate 5 UNIQUE trivia duel questions.

STRICT JSON ONLY. NO TEXT. NO MARKDOWN. NO EXPLANATIONS.

Format EXACTLY:
[
 { "question": "string", "a": "string", "b": "string", "correct": "a" | "b" }
]

Rules:
- No repeated questions
- Make them ${difficulty} difficulty
- Keep answers short
`;

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          { role: "system", content: "You are a JSON generator." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const raw = await res.json();
    const text = raw.choices?.[0]?.message?.content || "[]";

    console.log("🧠 Grok raw:", text);

    // Force JSON extraction if Grok wraps text
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const clean = jsonMatch ? jsonMatch[0] : "[]";

    const parsed = JSON.parse(clean);

    // Validate output
    const safe = parsed
      .filter((q: any) => q.question && q.a && q.b)
      .map((q: any) => ({
        question: q.question,
        a: q.a,
        b: q.b,
        correct: q.correct === "b" ? "b" : "a",
      }));

    return NextResponse.json(safe);
  } catch (err) {
    console.error("❌ Grok API error:", err);
    return NextResponse.json([]);
  }
}
