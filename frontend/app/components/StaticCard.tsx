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
    <div className="relative bg-black/90 backdrop-blur-md border border-purple-500/40 rounded-3xl p-6 text-white w-[92%] max-w-[380px] h-[75%] flex flex-col justify-center text-center shadow-[0_0_40px_rgba(168,85,247,0.2)] hologram">

      {/* GLOW BORDER */}
      <div className="absolute inset-0 rounded-3xl border border-purple-500/30 pointer-events-none glow-border" />

      {/* QUESTION */}
      <h2 className="text-xl font-bold mb-8 tracking-wide text-purple-100">
        {question.question}
      </h2>

      {/* YES BUTTON */}
      <button
        onClick={() => onAnswer("a")}
        className="relative bg-blue-600/90 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-150 shadow-lg neon-btn"
      >
        {question.a}
      </button>

      {/* YES TRASH TALK */}
      {trashYes && (
        <div className="text-xs mt-1 mb-4 text-blue-300">
          <GlitchText text={trashYes} />
        </div>
      )}

      {/* NO BUTTON */}
      <button
        onClick={() => onAnswer("b")}
        className="relative bg-red-600/90 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-150 shadow-lg neon-btn"
      >
        {question.b}
      </button>

      {/* NO TRASH TALK */}
      {trashNo && (
        <div className="text-xs mt-1 text-red-300">
          <GlitchText text={trashNo} />
        </div>
      )}
    </div>
  );
}
