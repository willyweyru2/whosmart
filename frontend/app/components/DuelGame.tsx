"use client";

import { useEffect, useState } from "react";
import SwipeCards from "./SwipeCards";
import StaticCard from "./StaticCard";
import type { Question } from "@/lib/questions"; // ✅ CORRECT
import { getTrashLine } from "@/lib/trashEngine";
import DifficultySelector from "./DifficultySelector";


export default function DuelGame() {
  const [current, setCurrent] = useState<Question | null>(null);
  const [nextQ, setNextQ] = useState<Question | null>(null);

  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [trashTalk, setTrashTalk] = useState("Booting neural duel...");
  const [flash, setFlash] = useState(false);

  // ================= AI TRASH TALK =================
  async function updateTrash() {
    const line = await getTrashLine();
    setTrashTalk(line);
  }

  // ================= LOAD FIRST QUESTIONS =================
  async function loadFirst() {
    setLoading(true);

       const q2 = await getNextQuestion();

    setCurrent(q1);
    setNextQ(q2);

    await updateTrash();
    setLoading(false);
  }

  useEffect(() => {
    loadFirst();
  }, []);

  // ================= DEVICE FX =================
  function vibrate(ms: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }

  // ================= SWIPE HANDLER =================
  async function handleSwipe(choice: "a" | "b") {
    if (!current) return;

    // Map A/B to boolean
    const userAnswer = choice === "a"; // A = TRUE, B = FALSE
    const correct = userAnswer === current.answer; // ✅ FIXED FIELD

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      updateTrash();
      vibrate(20);
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    } else {
      setAiScore(s => s + 1);
      setStreak(0);
      updateTrash();
      vibrate([20, 40, 20]);
    }

    // SHIFT STACK
    setCurrent(nextQ);

    // PREFETCH NEXT
    const newNext = await getNextQuestion();
    setNextQ(newNext);
  }

  // ================= RESET =================
  async function restartGame() {
    setScore(0);
    setAiScore(0);
    setStreak(0);
    await loadFirst();
  }

  // ================= LOADING =================
  if (loading || !current) {
    return (
      <div className="h-full flex items-center justify-center text-purple-400 text-sm animate-pulse">
        🧠 Training Neural Clone...
      </div>
    );
  }

  const total = score + aiScore || 1;
  const humanPct = (score / total) * 100;

  return (
    <div className={`relative h-full w-full overflow-hidden ${flash ? "streak-flash" : ""}`}>

      <DifficultySelector />

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_65%)]" />

      {/* HEADER */}
      <div className="absolute top-2 left-0 right-0 flex justify-center z-40">
        <h1 className="text-lg font-extrabold text-purple-300">Who’s Smarter</h1>
      </div>

      {/* SCORE */}
      <div className="absolute top-9 left-0 right-0 flex justify-between px-4 text-[11px] text-purple-300 z-30">
        <div className="hud-panel">Score {score}</div>
        <div className="hud-panel">AI {aiScore}</div>
      </div>

      {/* PROGRESS */}
      <div className="absolute top-16 left-4 right-4 z-30">
        <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${humanPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>You</span>
          <span>AI</span>
        </div>
      </div>

      {/* AI AVATAR */}
      <div className="absolute left-2 bottom-[28%] z-40 flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          AI
        </div>
        <div className="bg-black/70 border border-purple-500/30 backdrop-blur-xl px-3 py-2 rounded-xl text-xs max-w-[160px] shadow-xl">
          {trashTalk}
        </div>
      </div>

      {/* STREAK */}
      {streak >= 3 && (
        <div className="absolute right-4 top-[35%] text-xs font-bold text-yellow-400 animate-pulse z-50">
          🔥 {streak} STREAK
        </div>
      )}

      {/* CARD STACK */}
      <div className="relative h-full flex items-center justify-center pt-16 pb-8 px-2">

        {/* NEXT STATIC CARD */}
        {nextQ && (
          <div className="absolute scale-[0.94] translate-y-2">
            <StaticCard question={nextQ} />
          </div>
        )}

        {/* CURRENT SWIPE CARD */}
        <SwipeCards question={current} onSwipe={handleSwipe} />
      </div>

      {/* RESET */}
      <button
        onClick={restartGame}
        className="absolute bottom-2 right-2 text-[10px] text-purple-500 opacity-50"
      >
        Reset AI
      </button>
    </div>
  );
}
