import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // or OPENAI_API_KEY
  baseURL: "https://api.groq.com/openai/v1", // REQUIRED for Groq
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const res = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    return NextResponse.json({ text: res.choices[0].message.content });
  } catch (err: any) {
    console.error("AI ERROR:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
