import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    grokKeyLoaded: !!process.env.GROK_API_KEY,
    time: new Date().toISOString(),
  });
}
