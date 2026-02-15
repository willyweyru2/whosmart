export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages: [
        { role: "system", content: "Generate a fun AI duel question with A/B answers." },
        { role: "user", content: body.prompt || "Generate a duel question." }
      ],
    }),
  });

  const data = await res.json();
  console.log(data);

  return Response.json({
    question: data.choices?.[0]?.message?.content || "Fallback question",
  });
}
