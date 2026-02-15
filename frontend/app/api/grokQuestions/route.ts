import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages: [
        {
          role: "system",
          content: `
You generate BrainWho duel questions.
Return JSON ARRAY only.
Format:
[
 { "question": "...", "a": "...", "b": "...", "correct": "a" }
]
`
        },
        {
          role: "user",
          content: "Generate 5 random brain duel questions with answers A and B."
        }
      ],
      temperature: 0.9,
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "[]";

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    console.error("Grok JSON parse failed:", text);
    return NextResponse.json([]);
  }
}
