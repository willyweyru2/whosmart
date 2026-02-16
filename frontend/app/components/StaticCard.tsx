// app/components/StaticCard.tsx
"use client";

import type { Question } from "@/lib/questions"; // ✅ FIXED SOURCE

export default function StaticCard({ question }: { question: Question }) {
  return (
    <div
      className="
      bg-gradient-to-br from-[#0b0016] via-black to-[#120024]
      border border-purple-500/20
      text-white rounded-3xl p-6
      w-full max-w-[380px] h-[78%]
      shadow-xl text-center select-none
      flex flex-col justify-center opacity-60
    "
    >
      <h2 className="text-lg font-bold mb-8">{question.question}</h2>

      <div className="bg-blue-600/60 rounded-xl py-3 mb-3 text-sm">
        {question.a}
      </div>

      <div className="bg-red-600/60 rounded-xl py-3 text-sm">
        {question.b}
      </div>
    </div>
  );
}
