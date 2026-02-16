import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { mood = "neutral", score = 0, aiScore = 0 } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1.2,
        topP: 0.95,
        maxOutputTokens: 40,
      },
    });

    const prompt = `
You are a savage futuristic AI opponent in a brain duel game.

Player score: ${score}
AI score: ${aiScore}
Mood: ${mood}

Rules:
- Output ONE short taunt (max 12 words)
- No emojis
- No quotes
- No explanations
- Sound confident, arrogant, funny
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    return NextResponse.json({ text });
  } catch (err) {
    console.error("TrashTalk failed", err);

    return NextResponse.json({
      text: "Your neurons lag behind my silicon.",
    });
  }
}
