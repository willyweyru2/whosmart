// app/api/grok/route.ts

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
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
          { role: "system", content: "Generate a fun AI duel question with A/B options." },
          { role: "user", content: body.prompt || "Generate a duel question." }
        ],
      }),
    });

    const data = await res.json();

    return Response.json({
      question: data.choices?.[0]?.message?.content || "Fallback AI question"
    });

  } catch (e: any) {
    console.error("GROK ERROR:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
