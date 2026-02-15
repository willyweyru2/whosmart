import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateQuestions(used: string[]) {
  const prompt = `
Generate 5 UNIQUE duel IQ questions.

Rules:
- NEVER repeat any of these questions:
${used.join("\n")}

- Only TWO options: a and b
- ONLY one correct answer
- No trick questions
- No opinions
- No riddles like feathers vs iron
- Use math, logic, science, facts
- Output STRICT JSON ONLY

Format:
[
 { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`;

  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    messages: [
      { role: "system", content: "Output ONLY valid JSON." },
      { role: "user", content: prompt },
    ],
    max_tokens: 600,
  });

  let raw = res.choices[0].message.content || "";
  raw = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch {
    console.error("AI JSON failed:", raw);
    return fallback();
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const used = body.used || [];

  const questions = await generateQuestions(used);
  return NextResponse.json({ questions });
}

function fallback() {
  return [
    { question: "5+7?", a: "12", b: "10", correct: "a" },
    { question: "H2O is?", a: "Water", b: "Oxygen", correct: "a" },
    { question: "10×10?", a: "100", b: "20", correct: "a" },
  ];
}
