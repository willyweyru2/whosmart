import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function GET() {
  try {
    const prompt = `
Generate 50 brain duel questions in JSON.
Each must have:
question, a, b, correct ("a" or "b")
Make IQ style, tricky, fun.
Return ONLY JSON array.
`;

    const res = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const raw = res.choices[0].message.content!;
    const questions = JSON.parse(raw);

    return NextResponse.json({ questions });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "AI failed" });
  }
}
