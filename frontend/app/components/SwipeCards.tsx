"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/questions";

/* CATEGORY COLORS (SAFE FALLBACK) */
const CATEGORY_COLORS: Record<string, string> = {
  science: "bg-green-600",
  logic: "bg-purple-600",
  math: "bg-blue-600",
  trick: "bg-red-600",
  philosophy: "bg-yellow-600",
  politics: "bg-pink-600",
  general: "bg-gray-600",
};

export default function SwipeCards({
  question,
  onSwipe,
}: {
  question: Question;
  onSwipe: (choice: "a" | "b") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-15, 15]);
  const opacity = useTransform(x, [-250, 0, 250], [0.2, 1, 0.2]);

  const rightGlow = useTransform(x, [0, 150], [0, 1]);
  const leftGlow = useTransform(x, [-150, 0], [1, 0]);

  const SWIPE_THRESHOLD = 120;

  const [aiGuess, setAiGuess] = useState<"a" | "b">("a");
  const hasSwiped = useRef(false);

  /* RESET CARD ON NEW QUESTION */
  useEffect(() => {
    x.stop();
    x.set(0);
    hasSwiped.current = false;

    const bias = Math.random() < 0.5 ? "a" : "b";
    setAiGuess(bias);
  }, [question.id, x]);

  function vibrate(ms: number) {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  }

  async function throwCard(choice: "a" | "b") {
    if (hasSwiped.current) return;
    hasSwiped.current = true;

    vibrate(10);
    const target = choice === "a" ? 1000 : -1000;

    await new Promise(resolve => {
      animate(x, target, { duration: 0.25, ease: "easeOut" }).then(resolve);

  function handleDragEnd(_: any, info: any) {
    if (hasSwiped.current) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > SWIPE_THRESHOLD || velocity > 700) return throwCard("a");
    if (offset < -SWIPE_THRESHOLD || velocity < -700) return throwCard("b");

    animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      {/* Glow Effects */}
      <motion.div
        style={{ opacity: rightGlow }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500/40 to-transparent pointer-events-none"
      />
      <motion.div
        style={{ opacity: leftGlow }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-red-500/40 to-transparent pointer-events-none"
      />

      {/* CARD */}
      <motion.div
        key={question.id} // ✅ CRITICAL FIX
        drag="x"
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, rotate, opacity }}
        whileDrag={{ scale: 1.03 }}
        className="w-[92%] max-w-[380px] h-[75%] bg-black border border-purple-500/40 rounded-3xl p-6 text-white flex flex-col justify-center text-center shadow-2xl select-none"
      >
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full ${CATEGORY_COLORS[question.category] || "bg-gray-700"}`}>
          {question.category}
        </div>

        {/* AI Guess */}
        <div className="absolute top-3 right-3 text-xs text-purple-400">
          🤖 AI: {aiGuess === "a" ? "Right" : "Left"}
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold mb-10">{question.question}</h2>

        {/* Answers */}
        <div className="bg-blue-600 py-3 rounded-lg mb-4 font-semibold">
          👉 {question.a}
        </div>

        <div className="bg-red-600 py-3 rounded-lg font-semibold">
          👈 {question.b}
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="absolute right-4 bottom-1/3 flex flex-col gap-4">
        <button onClick={() => throwCard("b")} className="w-14 h-14 bg-red-600 rounded-full text-xl">❌</button>
        <button onClick={() => throwCard("a")} className="w-14 h-14 bg-blue-600 rounded-full text-xl">✅</button>
      </div>
    </div>
  );
}
