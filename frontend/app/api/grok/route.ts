export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages: [
        { role: "system", content: "You generate smart duel questions." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();
  return Response.json(data);
}
