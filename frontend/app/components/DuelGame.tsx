"use client";

import { useState, useEffect, useRef } from "react";
import { aiDecision } from "../../lib/aiDecision";
import { getHybridTrashTalk } from "../../lib/hybridTrashTalk";
import { aiTrashTalk } from "../../lib/trashTalk";
import { saveProgress } from "../../lib/progress";
import { APP_NAME } from "../../lib/config";
import GameOverModal from "./GameOverModal";
import SwipeCards from "./SwipeCards";
import HealthBar from "./HealthBar";
import { getQuestions, getNextQuestion } from "../../lib/questionEngine";

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

  // Health
  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [aiHP, setAiHP] = useState(MAX_HP);

  // Difficulty
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "god">("medium");

  // Game state
  const [question, setQuestion] = useState<Question | null>(null);
  const [msg, setMsg] = useState("");
  const [taunt, setTaunt] = useState("");
  const [locked, setLocked] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save HP progress
  useEffect(() => {
    saveProgress({ player: playerHP, ai: aiHP });
  }, [playerHP, aiHP]);

  // Load questions when difficulty changes OR restart
  async function loadNewQuestions() {
    await getQuestions(difficulty);
    const first = getNextQuestion();
    setQuestion(first);
  }

  useEffect(() => {
    loadNewQuestions();
  }, [difficulty]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // AI IQ
  function getIQ() {
    return difficulty === "easy" ? 0.3 :
           difficulty === "medium" ? 0.6 :
           difficulty === "hard" ? 0.85 : 0.99;
  }

  // Damage scaling
  function getDamage() {
    return difficulty === "easy" ? 10 :
           difficulty === "medium" ? 15 :
           difficulty === "hard" ? 20 : 30;
  }

  // Confetti
  async function fireConfetti() {
    if (typeof window === "undefined") return;
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 80, spread: 60 });
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

    setPlayerHP((p) => {
      let newPlayer = p;
      let newAI = aiHP;

      if (choice === correct && ai !== correct) {
        win = true;
        newAI = Math.max(0, aiHP - dmg);
        setAiHP(newAI);
        setMsg(`YOU HIT 🤖 -${dmg}HP`);
        fireConfetti();
      } 
      else if (ai === correct && choice !== correct) {
        newPlayer = Math.max(0, p - dmg);
        setMsg(`AI HIT YOU 👤 -${dmg}HP`);
      } 
      else {
        setMsg("CLASH ⚔️ No damage");
      }

      setMsg((m) => m + " " + aiTrashTalk(win));
      getHybridTrashTalk(newPlayer, newAI).then(setTaunt);

      if (newPlayer <= 0 || newAI <= 0) {
        setGameOver(true);
      }

      return newPlayer;
    });

    // Next question
    timeoutRef.current = setTimeout(() => {
      const next = getNextQuestion();
      setQuestion(next);
      setRound((r) => r + 1);
      setMsg("");
      setLocked(false);
    }, 1200);
  }

  function restartGame() {
    setPlayerHP(MAX_HP);
    setAiHP(MAX_HP);
    setRound(1);
    setGameOver(false);
    setMsg("");
    setTaunt("");
    setLocked(false);
    loadNewQuestions(); // 🔥 reload AI questions
  }

  const q: Question = question || {
    question: "🧠 Loading neural duel...",
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
        <div className="p-2 bg-black text-white rounded-xl space-y-2">
          <HealthBar label="YOU" hp={playerHP} />
          <HealthBar label="AI" hp={aiHP} />
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

      <GameOverModal 
        open={gameOver} 
        playerScore={playerHP} 
        aiScore={aiHP} 
        onRestart={restartGame} 
      />
    </>
  );
}
