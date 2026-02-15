import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.x.ai/v1/models", {
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
    },
  });

  const text = await res.text(); // use text to debug errors
  return NextResponse.json({ status: res.status, body: text });
}
