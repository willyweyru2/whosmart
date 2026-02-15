import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { difficulty } = await req.json();

  // In real implementation, call OpenAI to generate question based on difficulty
  try {
    const res = await fetch("/api/grokQuestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("GrokQuestion API failed", e);
  }
  fetch("/api/grokQuestions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ difficulty }),
});


  // TEMP MOCK AI (so game always works)

  const pool = [
    {
      question: "What is 2 + 2?",
      a: "4",
      b: "5",
      correct: "a",
    },
    {
      question: "Who invented the Internet?",
      a: "Vint Cerf",
      b: "Bill Gates",
      correct: "a",
    },
    {
      question: "Is AI smarter than humans?",
      a: "Yes",
      b: "Not yet",
      correct: "b",
    },
  ];

  return NextResponse.json(pool);
}
