"use client";

import { Question } from "@/lib/questions";
import GlitchText from "./GlitchText";

export default function StaticCard({
  question,
  onAnswer,
  trashYes,
  trashNo,
}: {
  question: Question;
  onAnswer: (c: "a" | "b") => void;
  trashYes?: string;
  trashNo?: string;
}) {
  return (
    <div className="bg-black border border-purple-500/40 rounded-3xl p-6 text-white w-[92%] max-w-[380px] h-[75%] flex flex-col justify-center text-center shadow-2xl">

      <h2 className="text-xl font-bold mb-8">{question.question}</h2>

      {/* YES */}
      <button
        onClick={() => onAnswer("a")}
        className="bg-blue-600 py-3 rounded-lg font-semibold hover:scale-105 transition"
      >
        {question.a}
      </button>

      {trashYes && (
        <div className="text-xs mt-1 mb-4">
          <GlitchText text={trashYes} />
        </div>
      )}

      {/* NO */}
      <button
        onClick={() => onAnswer("b")}
        className="bg-red-600 py-3 rounded-lg font-semibold hover:scale-105 transition"
      >
        {question.b}
      </button>

      {trashNo && (
        <div className="text-xs mt-1">
          <GlitchText text={trashNo} />
        </div>
      )}
    </div>
  );
}
