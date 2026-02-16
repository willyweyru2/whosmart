"use client";

import { useEffect, useState } from "react";
import SwipeCards from "./SwipeCards";

type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

export default function DuelGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // AI Trash Talk
  const [trashTalk, setTrashTalk] = useState("Booting neural duel...");
  const [streak, setStreak] = useState(0);
  const [flash, setFlash] = useState(false);

  const TRASH_LINES = {
    start: ["Human brain detected.", "Simulating your defeat.", "Neural duel initiated."],
    correct: ["Interesting.", "Unexpected neuron spike.", "Adaptive response detected."],
    wrong: ["Predicted failure.", "Human latency error.", "AI dominance confirmed."],
    streak: ["Impossible probability.", "Human brain mutation detected.", "You are evolving."],
  };

  const randomLine = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // ================= LOAD QUESTIONS =================

  async function loadQuestions() {
    setLoading(true);
    setGameOver(false);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ used: [] }),
      });

      const data = await res.json();
      const aiQuestions: Question[] = data.questions;

      if (!Array.isArray(aiQuestions) || aiQuestions.length === 0) {
        throw new Error("Invalid AI data");
      }

      setQuestions(aiQuestions);
      startNewRound(aiQuestions);
    } catch (err) {
      console.error("❌ AI FAILED, using fallback", err);

      const fallback: Question[] = [
        { question: "Which planet has rings?", a: "Saturn", b: "Mars", correct: "a" },
        { question: "2 + 2 = ?", a: "4", b: "5", correct: "a" },
        { question: "Capital of France?", a: "Paris", b: "London", correct: "a" },
        { question: "Largest ocean?", a: "Pacific", b: "Atlantic", correct: "a" },
        { question: "Fastest land animal?", a: "Cheetah", b: "Lion", correct: "a" },
      ];

      setQuestions(fallback);
      startNewRound(fallback);
    }

    setLoading(false);
  }

  // ================= ROUND RESET =================

  function startNewRound(all: Question[]) {
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    setRoundQuestions(shuffled.slice(0, 5));
    setIndex(0);
    setScore(0);
    setAiScore(0);
    setStreak(0);
    setTrashTalk(randomLine(TRASH_LINES.start));
  }

  // ================= DEVICE FX =================

  function vibrate(ms: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }

  // ================= SWIPE LOGIC =================

  function handleSwipe(choice: "a" | "b") {
    const current = roundQuestions[index];
    if (!current) return;

    const correct = choice === current.correct;

    if (correct) {
      setScore((s) => s + 1);

      setStreak((s) => {
        const newStreak = s + 1;
        setTrashTalk(
          newStreak >= 3 ? randomLine(TRASH_LINES.streak) : randomLine(TRASH_LINES.correct)
        );
        return newStreak;
      });

      setFlash(true);
      vibrate(30);
      setTimeout(() => setFlash(false), 200);
    } else {
      setAiScore((s) => s + 1);
      setStreak(0);
      setTrashTalk(randomLine(TRASH_LINES.wrong));
      vibrate([20, 40, 20]);
    }

    if (index >= roundQuestions.length - 1) {
      setGameOver(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function restartGame() {
    startNewRound(questions);
    setGameOver(false);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  // ================= LOADING SCREEN =================

  if (loading || !roundQuestions[index]) {
    return (
      <div className="h-full flex items-center justify-center text-purple-400 text-sm animate-pulse">
        🧠 Training Neural Clone...
      </div>
    );
  }

  // ================= GAME OVER =================

  if (gameOver) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-4 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-purple-300">Neural Battle Complete</h2>
        <p className="text-lg">You: {score} — AI: {aiScore}</p>

        <button
          onClick={restartGame}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-bold shadow-lg active:scale-95 transition"
        >
          Rematch AI
        </button>
      </div>
    );
  }

  // ================= UI =================

  const total = score + aiScore || 1;
  const humanPct = (score / total) * 100;

  return (
    <div className={`relative h-full w-full overflow-hidden ${flash ? "streak-flash" : ""}`}>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_65%)]" />

      <div className="absolute top-2 left-0 right-0 flex justify-center z-40">
        <h1 className="text-lg font-extrabold tracking-tight text-purple-300 drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
          Who’s Smarter
        </h1>
      </div>

      <div className="absolute top-9 left-0 right-0 flex justify-between px-4 text-[11px] text-purple-300 z-30">
        <div className="hud-panel">Q {index + 1}/5</div>
        <div className="hud-panel">Score {score}</div>
      </div>

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

      <div className="absolute left-2 bottom-[28%] z-40 flex flex-col items-center gap-2">
        <div className="ai-avatar w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          AI
        </div>

        <div className="bg-black/70 border border-purple-500/30 backdrop-blur-xl px-3 py-2 rounded-xl text-xs max-w-[160px] shadow-xl">
          {trashTalk}
        </div>
      </div>

      {streak >= 3 && (
        <div className="absolute right-4 top-[35%] text-xs font-bold text-yellow-400 animate-pulse z-50">
          🔥 {streak} STREAK
        </div>
      )}

      <div className="relative h-full flex items-center justify-center pt-16 pb-8 px-2">
        <SwipeCards question={roundQuestions[index]} onSwipe={handleSwipe} />
      </div>

    </div>
  );
}
