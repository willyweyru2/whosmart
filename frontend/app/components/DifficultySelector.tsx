"use client";

import { useState, useEffect } from "react";

type Difficulty = "easy" | "medium" | "hard" | "insane";

export default function DifficultySelector() {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  // ================= LOAD STORED DIFFICULTY =================
  useEffect(() => {
    const saved = localStorage.getItem("bw_difficulty") as Difficulty | null;
    if (saved && ["easy", "medium", "hard", "insane"].includes(saved)) {
      setDifficulty(saved);
    }
  }, []);

  // ================= APPLY DIFFICULTY =================
  function setDiff(d: Difficulty) {
    setDifficulty(d);

    // Save for engine
    localStorage.setItem("bw_difficulty", d);

    // Notify questionEngine.ts
    window.dispatchEvent(new Event("bw-difficulty-change"));

    setOpen(false);
  }

  return (
    <div className="absolute top-2 right-2 z-50">
      {/* MAIN BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-[11px] rounded-full bg-black/60 border border-purple-500/40 text-purple-300 backdrop-blur-lg"
      >
        ⚙ {difficulty.toUpperCase()}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="mt-2 bg-black/80 border border-purple-500/40 rounded-xl p-2 backdrop-blur-xl flex flex-col gap-1 text-white">
          
          <button
            onClick={() => setDiff("easy")}
            className="px-2 py-1 text-xs rounded bg-green-600/20 hover:bg-green-600/40"
          >
            Easy
          </button>

          <button
            onClick={() => setDiff("medium")}
            className="px-2 py-1 text-xs rounded bg-yellow-600/20 hover:bg-yellow-600/40"
          >
            Medium
          </button>

          <button
            onClick={() => setDiff("hard")}
            className="px-2 py-1 text-xs rounded bg-red-600/20 hover:bg-red-600/40"
          >
            Hard
          </button>

          {/* 🔥 SECRET MODE */}
          <button
            onClick={() => setDiff("insane")}
            className="px-2 py-1 text-xs rounded bg-purple-600/30 hover:bg-purple-600/60 font-bold"
          >
            INSANE (AI GOD MODE)
          </button>
        </div>
      )}
    </div>
  );
}
