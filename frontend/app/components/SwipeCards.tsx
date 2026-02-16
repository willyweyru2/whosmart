"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/questionEngine";

/* ================= CATEGORY COLORS ================= */

const CATEGORY_COLORS: Record<Question["category"], string> = {
  science: "bg-green-600",
  logic: "bg-purple-600",
  math: "bg-blue-600",
  trick: "bg-red-600",
};

/* ================= COMPONENT ================= */

export default function SwipeCards({
  question,
  onSwipe,
}: {
  question: Question;
  onSwipe: (choice: "a" | "b") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0.15, 1, 0.15]);

  const rightGlow = useTransform(x, [0, 140], [0, 1]);
  const leftGlow = useTransform(x, [-140, 0], [1, 0]);

  const SWIPE_THRESHOLD = 130;

  /* AI Prediction */
  const [aiGuess, setAiGuess] = useState<"a" | "b">("a");

  /* Prevent double swipe */
  const hasSwiped = useRef(false);

  /* Reset on new question */
  useEffect(() => {
    x.stop();
    x.set(0);
    hasSwiped.current = false;

    const biasMap = {
      math: 0.6,
      science: 0.55,
      logic: 0.5,
      trick: 0.5,
    };

    const bias = biasMap[question.category] ?? 0.5;
    setAiGuess(Math.random() < bias ? "a" : "b");
  }, [question.id]);

  function vibrate(ms: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }

  /* Programmatic throw */
  async function throwCard(choice: "a" | "b") {
    if (hasSwiped.current) return;
    hasSwiped.current = true;

    const target = choice === "a" ? 900 : -900;
    vibrate(12);

    try {
      await animate(x, target, { duration: 0.2, ease: "easeOut" }).finished;
    } catch {}

    onSwipe(choice);
  }

  function handleDragEnd(_: any, info: any) {
    if (hasSwiped.current) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > SWIPE_THRESHOLD || velocity > 700) {
      throwCard("a");
      return;
    }

    if (offset < -SWIPE_THRESHOLD || velocity < -700) {
      throwCard("b");
      return;
    }

    animate(x, 0, { type: "spring", stiffness: 600, damping: 30 });
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center">

      {/* BACK STACK */}
      <div className="absolute w-[96%] h-[78%] bg-purple-900/25 rounded-3xl blur-sm scale-[0.97]" />
      <div className="absolute w-[92%] h-[76%] bg-purple-900/10 rounded-3xl blur-sm scale-[0.94]" />

      {/* SWIPE GLOWS */}
      <motion.div
        style={{ opacity: rightGlow }}
        className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-600/40 to-transparent rounded-3xl pointer-events-none"
      />
      <motion.div
        style={{ opacity: leftGlow }}
        className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-600/40 to-transparent rounded-3xl pointer-events-none"
      />

      {/* MAIN CARD */}
      <motion.div
        drag="x"
        dragElastic={0.15}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="
          bg-gradient-to-br from-[#0b0016] via-black to-[#120024]
          border border-purple-500/40
          text-white rounded-3xl p-6
          w-full max-w-[380px] h-[78%]
          shadow-[0_0_120px_rgba(139,92,246,0.35)]
          text-center select-none flex flex-col justify-center
          backdrop-blur-2xl relative will-change-transform
        "
      >
        {/* CATEGORY TAG */}
        <div className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase rounded-full text-white border border-white/20 ${CATEGORY_COLORS[question.category]}`}>
          {question.category}
        </div>

        {/* AI PREDICTION */}
        <div className="absolute top-3 right-3 text-[10px] text-purple-400 bg-black/60 px-2 py-1 rounded-full border border-purple-500/30">
          🤖 AI predicts: {aiGuess === "a" ? "Right" : "Left"}
        </div>

        {/* QUESTION TEXT */}
        <h2 className="text-xl font-bold mb-10 leading-snug mt-6">
          {question.question}
        </h2>

        {/* ANSWERS */}
        <div className="bg-blue-600/90 rounded-xl py-4 mb-4 text-sm font-semibold">
          👉 Swipe Right — {question.a}
        </div>

        <div className="bg-red-600/90 rounded-xl py-4 text-sm font-semibold">
          👈 Swipe Left — {question.b}
        </div>
      </motion.div>

      {/* BUTTONS */}
      <div className="absolute right-3 bottom-1/3 flex flex-col gap-4 z-40">
        <button
          onClick={() => throwCard("b")}
          className="w-14 h-14 rounded-full bg-red-600/90 text-white text-xl font-bold flex items-center justify-center active:scale-90"
        >
          ❌
        </button>

        <button
          onClick={() => throwCard("a")}
          className="w-14 h-14 rounded-full bg-blue-600/90 text-white text-xl font-bold flex items-center justify-center active:scale-90"
        >
          ✅
        </button>
      </div>

      <p className="absolute bottom-3 text-[10px] text-purple-400/60">
        Swipe fast to throw the card
      </p>
    </div>
  );
}
