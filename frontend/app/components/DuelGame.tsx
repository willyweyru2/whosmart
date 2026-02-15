"use client";

import { useState, useEffect, useRef } from "react";
import { aiDecision } from "../../lib/aiDecision";
import { getHybridTrashTalk } from "../../lib/hybridTrashTalk";
import { aiTrashTalk } from "../../lib/trashTalk";
import { getProgress, saveProgress } from "../../lib/progress";
import { APP_NAME } from "../../lib/config";
import GameOverModal from "./GameOverModal";
import SwipeCards from "./SwipeCards";
import HealthBar from "./HealthBar";

type Question = {
  question: string;
  a: string;
  b: string;
  correct: "a" | "b";
};

const MAX_HP = 100;

export default function DuelGame() {
  // AI personality
  const personalities = ["Scientist", "Toxic", "Coach"];
  const [personality, setPersonality] = useState("Scientist");

  useEffect(() => {
    setPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
  }, []);

  useEffect(() => {
  async function loadFirstQuestion() {
    const q = await getGrokQuestion();
    setQuestion(q);
  }
  loadFirstQuestion();
}, []);


  // Health bars
  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [aiHP, setAiHP] = useState(MAX_HP);

  // Difficulty
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "god">("medium");

  const [msg, setMsg] = useState("");
  const [taunt, setTaunt] = useState("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [locked, setLocked] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [liveText, setLiveText] = useState("Thinking...");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save progress (HP)
  useEffect(() => {
    saveProgress({ player: playerHP, ai: aiHP });
  }, [playerHP, aiHP]);

  // AI IQ difficulty
  function getIQ() {
    return difficulty === "easy" ? 0.3 :
           difficulty === "medium" ? 0.6 :
           difficulty === "hard" ? 0.85 : 0.99;
  }

  // Fallback questions
  function fallbackQuestion(): Question {
  const pool: Question[] = [
    { question: "Is intelligence more powerful than money?", a: "Yes", b: "No", correct: "a" },
    { question: "Who wins: 100 duck-sized horses or 1 horse-sized duck?", a: "100 horses", b: "1 duck", correct: "a" },
    { question: "Will AI surpass humans?", a: "Yes", b: "No", correct: "a" },
  ];

  return pool[Math.floor(Math.random() * pool.length)];
}


  async function getGrokQuestion(): Promise<Question> {
    try {
      const res = await fetch("/api/grokQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Generate duel question JSON" }),
      });
      const data = await res.json();
      return {
        question: data.question,
        a: data.a || "Option A",
        b: data.b || "Option B",
        correct: data.correct === "b" ? "b" : "a",
      };
    } catch {
      return fallbackQuestion();
    }
  }

  // Confetti
  async function fireConfetti() {
    if (typeof window === "undefined") return;
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 80, spread: 60 });
  }

  // Damage calculator
  function getDamage() {
    return difficulty === "easy" ? 10 :
           difficulty === "medium" ? 15 :
           difficulty === "hard" ? 20 : 30;
  }

  // Swipe handler
  async function choose(choice: "a" | "b") {
    if (!question || locked || gameOver) return;
    setLocked(true);

    setAiThinking(true);
    await new Promise((r) => setTimeout(r, 500));

    const ai = aiDecision(question, getIQ());
    setAiThinking(false);

    const correct = question.correct;
    const dmg = getDamage();

    let win = false;
    let newPlayer = playerHP;
    let newAI = aiHP;

    if (choice === correct && ai !== correct) {
      win = true;
      newAI = Math.max(0, aiHP - dmg);
      setAiHP(newAI);
      setMsg(`YOU HIT 🤖 -${dmg}HP`);
      fireConfetti();
    } 
    else if (ai === correct && choice !== correct) {
      newPlayer = Math.max(0, playerHP - dmg);
      setPlayerHP(newPlayer);
      setMsg(`AI HIT YOU 👤 -${dmg}HP`);
    } 
    else {
      setMsg("CLASH ⚔️ No damage");
    }

    setMsg((m) => m + " " + aiTrashTalk(win));
    getHybridTrashTalk(newPlayer, newAI).then(setTaunt);

    // Game over
    if (newPlayer <= 0 || newAI <= 0) {
      setGameOver(true);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const next = await getGrokQuestion();
      setQuestion(next);
      setRound((r) => r + 1);
      setMsg("");
      setLocked(false);
    }, 1200);
  }

  function restartGame() {
  setPlayerHP(100);
  setAiHP(100);
  setGameOver(false);
}


  const q: Question = question || {
    question: liveText || "🧠 Loading neural duel...",
    a: "...",
    b: "...",
    correct: "a",
  };

  return (
    <>
      <div className="ai-card w-full max-w-[420px] mx-auto p-4 space-y-3">

        <h1 className="text-lg font-bold text-center">{APP_NAME} Duel</h1>
        <p className="text-xs text-purple-400 text-center">AI Mode: {personality}</p>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
          className="bg-black border border-gray-700 rounded p-2 text-sm w-full"
        >
          <option value="easy">Easy 😴</option>
          <option value="medium">Medium 🧠</option>
          <option value="hard">Hard 🤖</option>
          <option value="god">God Mode 👑</option>
        </select>

        {/* HEALTH BARS */}
        <div className="space-y-2">
          <div>
            <div className="text-xs">👤 Player</div>
            <div className="w-full bg-gray-800 h-3 rounded">
              <div className="bg-blue-500 h-3 rounded transition-all"
                   style={{ width: `${playerHP}%` }} />
            </div>
          </div>
        <div className="p-2 bg-black text-white rounded-xl">
  <HealthBar label="YOU" hp={playerHP} />
  <HealthBar label="AI" hp={aiHP} />
</div>

          <div>
            <div className="text-xs">🤖 AI</div>
            <div className="w-full bg-gray-800 h-3 rounded">
              <div className="bg-red-500 h-3 rounded transition-all"
                   style={{ width: `${aiHP}%` }} />
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-purple-400">ROUND {round}</p>

        <SwipeCards question={q} onSwipe={choose} />

        {aiThinking && <p className="italic text-gray-400 text-center">AI thinking...</p>}
        {taunt && <p className="italic text-purple-400 text-center">{taunt}</p>}
        {msg && <p className="text-yellow-300 font-bold text-center">{msg}</p>}

        <button onClick={restartGame} className="text-xs text-red-400 underline w-full">
          Reset Neural Memory
        </button>
      </div>

      <GameOverModal open={gameOver} playerScore={playerHP} aiScore={aiHP} onRestart={restartGame} />
    </>
  );
}
