"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

type Props = {
  question: {
    question: string;
    a: string;
    b: string;
  };
  onSwipe: (choice: "a" | "b") => void;
};

export default function SwipeCards({ question, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);

  const [locked, setLocked] = useState(false);

  function handleDragEnd(_: any, info: any) {
    if (locked) return;

    if (info.offset.x > 120) {
      setLocked(true);
      onSwipe("a");
    } else if (info.offset.x < -120) {
      setLocked(true);
      onSwipe("b");
    }
  }

  return (
    <div className="relative w-full h-[180px] flex items-center justify-center select-none">

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x, rotate, opacity }}
        className="bg-black/70 border border-white/20 rounded-2xl p-5 w-full text-center shadow-xl backdrop-blur-xl"
      >
        <p className="text-lg font-bold text-white">{question.question}</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onSwipe("a")}
            className="bg-blue-600 px-4 py-2 rounded-lg w-full active:scale-95 transition"
          >
            {question.a}
          </button>

          <button
            onClick={() => onSwipe("b")}
            className="bg-red-600 px-4 py-2 rounded-lg w-full active:scale-95 transition"
          >
            {question.b}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2">Swipe ➡️ for A | ⬅️ for B</p>
      </motion.div>
    </div>
  );
}
