"use client";

import { useEffect, useState } from "react";
import StaticCard from "./StaticCard";
import Explosion from "./Explosion";
import type { Question, Difficulty } from "@/lib/questions";
import { getTrashLine } from "@/lib/trashEngine";
import { speak, stopSpeak } from "@/lib/voiceEngine";
import DifficultySelector from "./DifficultySelector";
import VoiceSelector from "./VoiceSelector";
import {
  getNextQuestion,
  peekNextQuestion,
  resetQuestionPool,
} from "@/lib/questionEngine";

export default function DuelGame() {
  /* ================= GAME STATE ================= */
  const [current, setCurrent] = useState<Question | null>(null);
  const [nextQ, setNextQ] = useState<Question | null>(null);

  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [rage, setRage] = useState(0);

  const [trashYes, setTrashYes] = useState("");
  const [trashNo, setTrashNo] = useState("");

  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [explode, setExplode] = useState(false);

  /* ================= TRASH TALK ================= */
  function updateTrash() {
    const t1 = getTrashLine();
    let t2 = getTrashLine();
    if (t1 === t2) t2 = getTrashLine();

    setTrashYes(t1);
    setTrashNo(t2);

    if (voiceEnabled) speak(t1);
  }

  /* ================= INIT ================= */
  useEffect(() => {
    resetQuestionPool(difficulty);
    setCurrent(getNextQuestion());
    setNextQ(peekNextQuestion());
    updateTrash();
  }, [difficulty]);

  /* ================= ANSWER HANDLER ================= */
  function handleAnswer(choice: "a" | "b") {
    if (!current) return;

    const correct =
      typeof current.answer === "boolean"
        ? (current.answer ? "a" : "b") === choice
        : current.answer === choice;

    if (correct) {
      setScore(s => {
        const newScore = s + 1;

        // 💥 EXPLOSION every 5 correct answers
        if (newScore % 5 === 0) {
          setExplode(true);
          setTimeout(() => setExplode(false), 2500);
        }

        return newScore;
      });

      setRage(r => Math.max(0, r - 1));
    } else {
      setAiScore(s => s + 1);
      setRage(r => Math.min(10, r + 1));

      // screen shake
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 150);
    }

    updateTrash();
    setCurrent(nextQ ?? getNextQuestion());
    setNextQ(getNextQuestion());
  }

  /* ================= UI ================= */
  return (
    <div className="relative h-full w-full bg-black text-white cyber-bg overflow-hidden">

      {/* EXPLOSION */}
      <Explosion trigger={explode} />

      {/* SCANLINES */}
      <div className="scanlines" />

      {/* TITLE */}
      <div className="text-center pt-2 neon-title">
        <h1 className="text-lg font-extrabold tracking-widest glitch-text">
          WHO’S SMARTER
        </h1>
      </div>

      {/* DIFFICULTY */}
      <div className="flex justify-center mt-2">
        <DifficultySelector onDifficultyChange={setDifficulty} />
      </div>

      {/* VOICE PICKER */}
      <VoiceSelector />

      {/* VOICE TOGGLE */}
      <div className="flex justify-center mt-1">
        <button
          onClick={() => {
            setVoiceEnabled(v => !v);
            stopSpeak();
          }}
          className="px-3 py-1 text-xs border border-purple-500 rounded neon-btn"
        >
          {voiceEnabled ? "🔊 AI Voice ON" : "🔇 AI Voice OFF"}
        </button>
      </div>

      {/* HUD */}
      <div className="flex justify-between px-4 text-xs text-purple-300 mt-2 font-mono">
        <div>You: {score}</div>
        <div>AI: {aiScore}</div>
        <div className={`rage-${rage}`}>Rage: {rage}</div>
      </div>

      {/* GAME AREA */}
      <div className="flex items-center justify-center h-[85%] relative">

        {/* NEXT CARD HOLOGRAM */}
        {nextQ && (
          <div className="absolute scale-[0.94] translate-y-3 opacity-25 pointer-events-none hologram">
            <StaticCard question={nextQ} onAnswer={() => {}} />
          </div>
        )}

        {/* MAIN CARD */}
        {current && (
          <StaticCard
            question={current}
            onAnswer={handleAnswer}
            trashYes={trashYes}
            trashNo={trashNo}
          />
        )}
      </div>
    </div>
  );
}
