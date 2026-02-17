"use client";

import { Difficulty } from "@/lib/questions";

export default function DifficultySelector({
  onDifficultyChange,
}: {
  onDifficultyChange: (d: Difficulty) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-2 z-50">
      <button
        onClick={() => onDifficultyChange("easy")}
        className="px-3 py-1 rounded bg-green-600 text-xs font-bold"
      >
        Easy
      </button>

      <button
        onClick={() => onDifficultyChange("medium")}
        className="px-3 py-1 rounded bg-yellow-600 text-xs font-bold"
      >
        Medium
      </button>

      <button
        onClick={() => onDifficultyChange("hard")}
        className="px-3 py-1 rounded bg-red-600 text-xs font-bold"
      >
        Hard
      </button>
    </div>
  );
}
