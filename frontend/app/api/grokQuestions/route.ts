import OpenAI from "openai";

export async function POST(req: Request) {
  const { difficulty } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Generate 5 duel questions with A and B options.
Difficulty: ${difficulty}
Return JSON array like:
[{question,a,b,correct}]
correct must be "a" or "b"
`;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = res.choices[0].message.content || "[]";

    // Extract JSON safely
    const json = JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || "[]");

    return Response.json(json);
  } catch (e) {
    console.error("AI FAILED:", e);
    return Response.json([], { status: 500 });
  }
}
