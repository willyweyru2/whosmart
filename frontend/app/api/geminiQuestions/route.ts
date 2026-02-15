import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Generate 5 BrainWho duel questions in JSON only.
Format:
[
 { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    console.error("Gemini JSON failed:", text);
    return NextResponse.json([]);
  }
}
