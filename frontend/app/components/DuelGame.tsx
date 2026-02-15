"use client";

import { useState, useEffect, useRef } from "react";
import { getQuestions } from "@/lib/questionEngine";
import { aiDecision } from "@/lib/aiDecision";
import { getHybridTrashTalk } from "@/lib/hybridTrashTalk";
import { aiTrashTalk } from "@/lib/trashTalk";
import { getProgress, saveProgress } from "@/lib/progress";
import { APP_NAME } from "@/lib/config";
import GameOverModal from "./GameOverModal";
import SwipeCards from "./SwipeCards";

export default function DuelGame() {
  // AI personality (client-only)
  const personalities = ["Scientist", "Toxic", "Coach"];
  const [personality, setPersonality] = useState("Scientist");

  useEffect(() => {
    setPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
  }, []);

  // Core state
  const [index, setIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "god">("medium");

  const [msg, setMsg] = useState("");
  const [taunt, setTaunt] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [locked, setLocked] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Load & shuffle questions ONCE
  useEffect(() => {
  async function load() {
    const q = await getQuestions(difficulty);
    setQuestions(q);
    setIndex(0);
    setRound(1);
  }
  load();
}, [difficulty]);


  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getAIQuestion = async () => {
  const res = await fetch("/api/grok", {
    method: "POST",
    body: JSON.stringify({
      prompt: "Generate a tricky intelligence duel question"
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
};

  // Current question fallback
  const q =
  questions[index] || {
    question: "Loading neural duel...",
    a: "...",
    b: "...",
    correct: "a",
  };


  // Difficulty → AI accuracy
  function getIQ() {
    return difficulty === "easy"
      ? 0.3
      : difficulty === "medium"
      ? 0.6
      : difficulty === "hard"
      ? 0.85
      : 0.99;
  }

  // Handle swipe
  async function choose(choice: "a" | "b") {
    if (locked || gameOver || !questions.length) return;
    setLocked(true);

    // Clear previous timeout (IMPORTANT)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // AI thinking
    setAiThinking(true);
    await new Promise((r) => setTimeout(r, 800));
    const ai = aiDecision(q, getIQ());
    setAiThinking(false);

    const correct = q.correct;
    let win = false;
    let newPlayer = playerScore;
    let newAI = aiScore;

    if (choice === correct && ai !== correct) {
      win = true;
      newPlayer++;
      setPlayerScore(newPlayer);
      setMsg("YOU WIN 🧠");
    } else if (ai === correct && choice !== correct) {
      newAI++;
      setAiScore(newAI);
      setMsg("AI DOMINATES 🤖");
    } else {
      setMsg("DRAW ⚔️");
    }

    // Local trash talk
    setMsg((m) => m + " " + aiTrashTalk(win));

    // GPT taunt (non-blocking)
    getHybridTrashTalk(newPlayer, newAI).then(setTaunt);

    // Game over score limit
    if (newPlayer >= 10 || newAI >= 10) {
      setGameOver(true);
      return;
    }

    // Next question (NO LOOP BUG)
    timeoutRef.current = setTimeout(() => {
      setMsg("");
      setIndex((i) => {
        if (i + 1 >= questions.length) {
          setGameOver(true);
          return i;
        }
        return i + 1;
      });
      setRound((r) => r + 1);
      setLocked(false);
    }, 1200);
  }

  function restartGame() {
    localStorage.clear();
    location.reload();
  }

  return (
    <>
      <div className="ai-card w-full max-w-[420px] text-center space-y-4 mx-auto">

        <h1 className="text-xl font-bold">{APP_NAME} Duel Arena</h1>

        <p className="text-xs text-gray-500">AI Personality: {personality}</p>

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

        {/* Score */}
        <div className="flex justify-center gap-3">
          <div className="px-3 py-1 bg-blue-900/40 rounded">👤 Player {playerScore}</div>
          <div className="px-3 py-1 bg-red-900/40 rounded">🤖 AI {aiScore}</div>
        </div>

        <p className="text-xs text-gray-400">Round {round}</p>

        {/* Swipe UI */}
        <SwipeCards question={q} onSwipe={choose} />

        {aiThinking && <p className="italic text-gray-400">AI processing...</p>}
        {taunt && <p className="italic text-purple-400">{taunt}</p>}
        {msg && <p className="text-yellow-300 font-bold">{msg}</p>}

        <button onClick={restartGame} className="text-xs text-red-400 underline">
          Reset Neural Memory
        </button>
      </div>

      <GameOverModal
        open={gameOver}
        playerScore={playerScore}
        aiScore={aiScore}
        onRestart={restartGame}
      />
    </>
  );
}
