import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent("Say ONLY: Gemini connected");
    const text = result.response.text().trim();

    return NextResponse.json({ success: true, text });
  } catch (err: any) {
    console.error("Gemini test failed:", err);

    return NextResponse.json({
      success: false,
      error: err?.message || "Unknown Gemini error",
    });
  }
}
