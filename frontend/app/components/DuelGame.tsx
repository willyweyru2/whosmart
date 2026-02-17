"use client";

import { useEffect, useState } from "react";
import StaticCard from "./StaticCard";
import type { Question, Difficulty } from "@/lib/questions";
import { getTrashLine } from "@/lib/trashEngine";
import DifficultySelector from "./DifficultySelector";
import {
  getNextQuestion,
  peekNextQuestion,
  resetQuestionPool,
} from "@/lib/questionEngine";

export default function DuelGame() {
  const [current, setCurrent] = useState<Question | null>(null);
  const [nextQ, setNextQ] = useState<Question | null>(null);

  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [trashTalk, setTrashTalk] = useState("Booting neural duel...");
  const [flash, setFlash] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  /* ================= AI TRASH ================= */
  function updateTrash() {
    getTrashLine().then(setTrashTalk).catch(() => {});
  }

  /* ================= INIT ================= */
  useEffect(() => {
    resetQuestionPool(difficulty);

    const q1 = getNextQuestion();
    const q2 = peekNextQuestion();

    setCurrent(q1 ?? null);
    setNextQ(q2 ?? null);
    updateTrash();
  }, [difficulty]);

  /* ================= DEVICE FX ================= */
  function vibrate(ms: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }

  /* ================= ANSWER HANDLER ================= */
  function handleAnswer(choice: "a" | "b") {
    if (!current) return;

    const correctAnswer =
      typeof (current as any).answer === "boolean"
        ? ((current as any).answer ? "a" : "b")
        : ((current as any).answer as "a" | "b");

    const correct = choice === correctAnswer;

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      vibrate(15);
      setFlash(true);
      setTimeout(() => setFlash(false), 120);
    } else {
      setAiScore(s => s + 1);
      setStreak(0);
      vibrate([15, 40, 15]);
    }

    updateTrash();

    /* SHIFT STACK */
    const newCurrent = nextQ ?? getNextQuestion();
    const newNext = getNextQuestion();

    setCurrent(newCurrent ?? null);
    setNextQ(newNext ?? null);
  }

  /* ================= RESET ================= */
  function restartGame() {
    setScore(0);
    setAiScore(0);
    setStreak(0);

    resetQuestionPool(difficulty);
    const q1 = getNextQuestion();
    const q2 = peekNextQuestion();

    setCurrent(q1 ?? null);
    setNextQ(q2 ?? null);
    updateTrash();
  }

  /* ================= PROGRESS ================= */
  const total = score + aiScore || 1;
  const humanPct = (score / total) * 100;

  /* ================= RENDER ================= */
  return (
    <div className={`relative h-full w-full overflow-hidden ${flash ? "streak-flash" : ""}`}>

      <DifficultySelector onDifficultyChange={setDifficulty} />

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_65%)]" />

      {/* HEADER */}
      <div className="absolute top-2 left-0 right-0 flex justify-center z-40">
        <h1 className="text-lg font-extrabold text-purple-300">Who’s Smarter</h1>
      </div>

      {/* SCORE */}
      <div className="absolute top-9 left-0 right-0 flex justify-between px-4 text-[11px] text-purple-300 z-30">
        <div className="hud-panel">You {score}</div>
        <div className="hud-panel">AI {aiScore}</div>
      </div>

      {/* PROGRESS BAR */}
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

        {/* NEXT CARD */}
        {nextQ && (
          <div className="absolute scale-[0.94] translate-y-2">
            <StaticCard key={nextQ.id} question={nextQ} />
          </div>
        )}

        {/* CURRENT CARD (BUTTON MODE) */}
        {current && (
          <div className="bg-black border border-purple-500/40 rounded-3xl p-6 text-white w-[92%] max-w-[380px] h-[75%] flex flex-col justify-center text-center shadow-2xl z-20">
            <h2 className="text-xl font-bold mb-10">{current.question}</h2>

            <button
              onClick={() => handleAnswer("a")}
              className="bg-blue-600 py-3 rounded-lg mb-4 font-semibold hover:scale-105 transition"
            >
              {current.a}
            </button>

            <button
              onClick={() => handleAnswer("b")}
              className="bg-red-600 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              {current.b}
            </button>
          </div>
        )}
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
