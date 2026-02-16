"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Question = {
  question: string;
  a: string;
  b: string;
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
  const opacity = useTransform(x, [-250, 0, 250], [0.25, 1, 0.25]);

  const rightGlow = useTransform(x, [0, 120], [0, 1]);
  const leftGlow = useTransform(x, [-120, 0], [1, 0]);

  const rightLabel = useTransform(x, [60, 140], [0, 1]);
  const leftLabel = useTransform(x, [-140, -60], [1, 0]);

  const SWIPE_THRESHOLD = 110;
  const swipeLocked = useRef(false);

  const [aiGuess, setAiGuess] = useState<"a" | "b">("a");

  // Reset per question
  useEffect(() => {
    swipeLocked.current = false;
    x.stop();
    x.set(0);
    setAiGuess(Math.random() > 0.5 ? "a" : "b");
  }, [question]);

  function vibrate(ms: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }

  function throwCard(choice: "a" | "b") {
    if (swipeLocked.current) return;
    swipeLocked.current = true;

    const target = choice === "a" ? 700 : -700;
    vibrate(20);

    animate(x, target, { duration: 0.25, ease: "easeOut" });

    setTimeout(() => onSwipe(choice), 180);
  }

  function handleDragEnd(_: any, info: any) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // RIGHT SWIPE
    if (offset > SWIPE_THRESHOLD || velocity > 700) {
      throwCard("a");
      return;
    }

    // LEFT SWIPE
    if (offset < -SWIPE_THRESHOLD || velocity < -700) {
      throwCard("b");
      return;
    }

    // SNAP BACK
    animate(x, 0, { type: "spring", stiffness: 520, damping: 28 });
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center">

      {/* BACK CARDS */}
      <div className="absolute w-[96%] h-[78%] bg-purple-900/25 rounded-3xl blur-sm scale-[0.97]" />
      <div className="absolute w-[92%] h-[76%] bg-purple-900/10 rounded-3xl blur-sm scale-[0.94]" />

      {/* GLOWS */}
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
        dragMomentum={false}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 480, damping: 30 }}
        className="
          bg-gradient-to-br from-[#0b0016] via-black to-[#120024]
          border border-purple-500/40 text-white
          rounded-3xl p-6 w-full max-w-[380px] h-[78%]
          shadow-[0_0_120px_rgba(139,92,246,0.35)]
          text-center select-none flex flex-col justify-center
          backdrop-blur-2xl relative will-change-transform
        "
      >
        {/* LABELS */}
        <motion.div style={{ opacity: rightLabel }} className="absolute top-6 left-6 text-blue-400 font-black text-lg">
          RIGHT
        </motion.div>
        <motion.div style={{ opacity: leftLabel }} className="absolute top-6 right-6 text-red-400 font-black text-lg">
          LEFT
        </motion.div>

        {/* AI GUESS */}
        <div className="absolute top-3 right-3 text-[10px] text-purple-400 bg-black/60 px-2 py-1 rounded-full border border-purple-500/30 backdrop-blur-lg">
          🤖 AI predicts: {aiGuess === "a" ? "Right" : "Left"}
        </div>

        {/* QUESTION */}
        <h2 className="text-xl font-bold mb-10 leading-snug">
          {question.question}
        </h2>

        {/* ANSWERS */}
        <div className="bg-blue-600/90 rounded-xl py-4 mb-4 text-sm font-semibold shadow-xl">
          👉 Swipe Right — {question.a}
        </div>

        <div className="bg-red-600/90 rounded-xl py-4 text-sm font-semibold shadow-xl">
          👈 Swipe Left — {question.b}
        </div>
      </motion.div>

      {/* BUTTONS */}
      <div className="absolute right-3 bottom-1/3 flex flex-col gap-4 z-40">
        <button
          onClick={() => throwCard("b")}
          className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-xl border border-white/20 text-white text-xl font-bold flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.4)] active:scale-90 transition"
        >
          ❌
        </button>

        <button
          onClick={() => throwCard("a")}
          className="w-14 h-14 rounded-full bg-blue-600/90 backdrop-blur-xl border border-white/20 text-white text-xl font-bold flex items-center justify-center shadow-[0_0_20px_rgba(0,200,255,0.5)] active:scale-90 transition"
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
