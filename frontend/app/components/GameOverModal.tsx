"use client";

type GameOverModalProps = {
  open: boolean;
  playerScore: number;
  aiScore: number;
  onRestart: () => void;
};

export default function GameOverModal({
  open,
  playerScore,
  aiScore,
  onRestart,
}: GameOverModalProps) {
  if (!open) return null;

  const winner =
    playerScore > aiScore ? "You Win 🧠🔥" : "AI Wins 🤖💀";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-2">{winner}</h2>

        <p className="text-lg">You: {playerScore}</p>
        <p className="text-lg">AI: {aiScore}</p>

        <button
          onClick={onRestart}
          className="mt-4 bg-black text-white px-6 py-2 rounded-xl w-full"
        >
          Restart Duel
        </button>
      </div>
    </div>
  );
}
