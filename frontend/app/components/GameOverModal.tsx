"use client";

import { motion } from "framer-motion";

export default function GameOverModal({
  open,
  score,
  onRestart,
}: {
  open: boolean;
  score: number;
  onRestart: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2">Game Over</h2>

        <p className="text-gray-400 mb-4">
          Your Score: <span className="text-white font-bold">{score}</span>
        </p>

        <button
          onClick={onRestart}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Restart Duel
        </button>
      </motion.div>
    </div>
  );
}
