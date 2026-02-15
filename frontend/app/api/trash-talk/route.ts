import OpenAI from "openai";

export async function POST(req: Request) {
  const { player, ai } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are a savage AI opponent in a BrainWho duel game.
Score is Player ${player}, AI ${ai}.
Generate ONE short trash talk line.
Be witty, cocky, futuristic, not toxic hate speech.
`;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = res.choices[0].message.content || "You are statistically inferior.";

    return Response.json({ text });
  } catch (e) {
    console.error("TrashTalk AI failed", e);
    return Response.json({ text: "Neural error. You got lucky." });
  }
}
