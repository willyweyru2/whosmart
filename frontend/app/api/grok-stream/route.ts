import { NextResponse } from "next/server";

export const runtime = "nodejs"; // REQUIRED for streaming

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      stream: true, // 🔥 ENABLE STREAMING
      messages: [
        { role: "system", content: "You generate duel questions in JSON." },
        { role: "user", content: prompt }
      ],
    }),
  });

  const stream = new ReadableStream({
    async start(controller) {
      const reader = grokRes.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(decoder.decode(value));
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
