"use client";

import { Question } from "@/lib/questions";

export default function QuestionCard({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (ans: boolean) => void;
}) {
  return (
    <div className="bg-black text-white border border-purple-500/40 rounded-3xl p-6 w-full max-w-md shadow-xl">
      <h2 className="text-xl font-bold mb-6">{question.question}</h2>

      <button
        onClick={() => onAnswer(true)}
        className="w-full bg-green-600 py-3 rounded-xl mb-3 font-bold"
      >
        {question.a}
      </button>

      <button
        onClick={() => onAnswer(false)}
        className="w-full bg-red-600 py-3 rounded-xl font-bold"
      >
        {question.b}
      </button>
    </div>
  );
}
