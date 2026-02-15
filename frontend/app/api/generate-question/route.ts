import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // REQUIRED

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function GET() {
  try {
    const prompt = `
Generate 3 brain duel questions in JSON.
Each question must have:
- question
- a
- b
- correct ("a" or "b")
Make them fun, tricky, IQ-style.
Return ONLY JSON array. No text.
`;

    const res = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const raw = res.choices[0].message.content!;
    const questions = JSON.parse(raw);

    return NextResponse.json({ questions });
  } catch (e) {
    console.error("Question API error", e);

    // fallback if GPT fails
    return NextResponse.json({
      questions: [
        {
          question: "Which is heavier?",
          a: "1kg iron",
          b: "1kg feathers",
          correct: "a",
        },
      ],
    });
  }
}
