export const runtime = "nodejs"; // IMPORTANT

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { difficulty } = await req.json();

  const prompt = `
Generate 8 multiple-choice duel questions.
Difficulty: ${difficulty}.
Return JSON ONLY:
[
 { "question":"", "a":"", "b":"", "correct":"a" }
]
`;

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "[]";

  console.log("GROK RAW:", raw); // DEBUG LOG

  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return NextResponse.json(JSON.parse(clean));
  } catch {
    return NextResponse.json([]);
  }
}
