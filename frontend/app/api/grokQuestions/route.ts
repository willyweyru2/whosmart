// app/api/grokQuestions/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const pool = [
    {
      question: "What is 5 x 5?",
      a: "25",
      b: "20",
      correct: "a",
    },
    {
      question: "Who invented the World Wide Web?",
      a: "Tim Berners-Lee",
      b: "Mark Zuckerberg",
      correct: "a",
    },
    {
      question: "Is AI conscious?",
      a: "No",
      b: "Yes",
      correct: "a",
    },
  ];

  return NextResponse.json(pool[Math.floor(Math.random() * pool.length)]);
}
