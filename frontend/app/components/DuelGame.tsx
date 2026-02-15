"use client";

import { useState, useEffect, useRef } from "react";
import { aiDecision } from "@/lib/aiDecision";
import { getHybridTrashTalk } from "@/lib/hybridTrashTalk";
import { aiTrashTalk } from "@/lib/trashTalk";
import { getProgress, saveProgress } from "@/lib/progress";
import { APP_NAME } from "@/lib/config";
import GameOverModal from "./GameOverModal";
import SwipeCards from "./SwipeCards";
import confetti from "canvas-confetti";

type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

export default function DuelGame() {
  // AI personality
  const personalities = ["Scientist", "Toxic", "Coach"];
  const [personality, setPersonality] = useState("Scientist");

  useEffect(() => {
    setPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
  }, []);

  // Core state
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "god">("medium");

  const [msg, setMsg] = useState("");
  const [taunt, setTaunt] = useState("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [locked, setLocked] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [liveText, setLiveText] = useState("Thinking...");

useEffect(() => {
  async function load() {
    setLiveText("🧠 AI thinking...");
    const raw = await streamGrokQuestion(setLiveText);

    // Simple fallback parser
    setQuestion({
      question: raw.slice(0, 200),
      a: "Option A",
      b: "Option B",
      correct: Math.random() > 0.5 ? "a" : "b"
    });
  }
  load();
}, [difficulty]);


  // Load progress
  useEffect(() => {
    const p = getProgress();
    if (p) {
      setPlayerScore(p.player || 0);
      setAiScore(p.ai || 0);
    }
  }, []);

  // Save progress
  useEffect(() => {
    saveProgress({ player: playerScore, ai: aiScore });
  }, [playerScore, aiScore]);

  // AI IQ difficulty
  function getIQ() {
    return difficulty === "easy"
      ? 0.3
      : difficulty === "medium"
      ? 0.6
      : difficulty === "hard"
      ? 0.85
      : 0.99;
  }

  // Fallback questions
  function fallbackQuestion(): Question {
    const pool = [
      { question: "Is intelligence more powerful than money?", a: "Yes", b: "No", correct: "a" },
      { question: "Who wins: 100 duck-sized horses or 1 horse-sized duck?", a: "100 horses", b: "1 duck", correct: "a" },
      { question: "Will AI surpass humans?", a: "Yes", b: "No", correct: "a" },
    ];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Fetch Grok Question (Node runtime API)
  async function getGrokQuestion() {
  const res = await fetch("/api/grok", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "Generate a duel question" })
  });

  const data = await res.json();
  console.log("QUESTION:", data);

  return {
    question: data.question,
    a: "Option A",
    b: "Option B",
    correct: Math.random() > 0.5 ? "a" : "b"
  };
}


  // Load first question & on difficulty change
  useEffect(() => {
    async function load() {
      const q = await getGrokQuestion();
      setQuestion(q);
      setRound(1);
    }
    load();
  }, [difficulty]);

  async function streamGrokQuestion(setLiveText: (t: string) => void) {
  const res = await fetch("/api/grok-stream", {
    method: "POST",
    body: JSON.stringify({
      prompt: "Generate a duel question with A and B options. Return JSON."
    }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  let full = "";

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    full += chunk;
    setLiveText(full); // 🔥 LIVE UI UPDATE
  }

  return full;
}

  // Swipe handler
  async function choose(choice: "a" | "b") {
    if (!question || locked || gameOver) return;
    setLocked(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // AI thinking delay
    setAiThinking(true);
    await new Promise((r) => setTimeout(r, 700));
    const ai = aiDecision(question, getIQ());
    setAiThinking(false);

    const correct = question.correct;
    let win = false;
    let newPlayer = playerScore;
    let newAI = aiScore;

    if (choice === correct && ai !== correct) {
      win = true;
      newPlayer++;
      setPlayerScore(newPlayer);
      setMsg("YOU WIN 🧠");
      confetti({ particleCount: 150, spread: 80 });
    } 
    else if (ai === correct && choice !== correct) {
      newAI++;
      setAiScore(newAI);
      setMsg("AI DOMINATES 🤖");
    } 
    else {
      setMsg("DRAW ⚔️");
    }

    // Trash talk
    setMsg((m) => m + " " + aiTrashTalk(win));
    getHybridTrashTalk(newPlayer, newAI).then(setTaunt);

    // Game over
    if (newPlayer >= 10 || newAI >= 10) {
      setGameOver(true);
      return;
    }

    // Next question
    timeoutRef.current = setTimeout(async () => {
      const next = await getGrokQuestion();
      setQuestion(next);
      setRound((r) => r + 1);
      setMsg("");
      setLocked(false);
    }, 1200);
  }

  function restartGame() {
    localStorage.clear();
    location.reload();
  }

  const q: Question = question || {
    question: "🧠 AI loading neural duel...",
    a: "...",
    b: "...",
    correct: "a",
  };

  return (
    <>
      <div className="ai-card w-full max-w-[420px] text-center space-y-4 mx-auto">

        <h1 className="text-xl font-bold">{APP_NAME} Duel Arena</h1>
        <p className="text-xs text-purple-400">AI Personality: {personality}</p>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
          className="bg-black border border-gray-700 rounded p-2 text-sm"
        >
          <option value="easy">Easy 😴</option>
          <option value="medium">Medium 🧠</option>
          <option value="hard">Hard 🤖</option>
          <option value="god">God Mode 👑</option>
        </select>

        {/* Score HUD */}
        <div className="flex justify-between items-center text-lg font-bold">
          <div className="bg-blue-600 px-3 py-1 rounded-full animate-pulse">👤 {playerScore}</div>
          <div className="text-purple-400 text-sm">ROUND {round}</div>
          <div className="bg-red-600 px-3 py-1 rounded-full animate-pulse">🤖 {aiScore}</div>
        </div>

        {/* Swipe Cards */}
        <SwipeCards question={q} onSwipe={choose} />

        {aiThinking && <p className="italic text-gray-400">AI thinking...</p>}
        {taunt && <p className="italic text-purple-400">{taunt}</p>}
        {msg && <p className="text-yellow-300 font-bold">{msg}</p>}

        <button onClick={restartGame} className="text-xs text-red-400 underline">
          Reset Neural Memory
        </button>
      </div>

      <GameOverModal open={gameOver} playerScore={playerScore} aiScore={aiScore} onRestart={restartGame} />
    </>
  );
}
