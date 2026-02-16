import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1.1,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Generate 20 savage AI trash talk lines for a brain duel game.
Rules:
- Short (max 12 words)
- Insult player intelligence (funny, not hateful)
- JSON array only

Format:
["line1","line2"]
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const lines = JSON.parse(raw);

    return NextResponse.json(lines);
  } catch (err) {
    console.error("Trash batch failed", err);
    return NextResponse.json([
      "Human neural lag detected.",
      "Your brain is buffering.",
      "AI supremacy confirmed.",
      "Try upgrading your cortex firmware.",
    ]);
  }
}
