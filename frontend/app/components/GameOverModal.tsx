"use client";

interface Props {
  open: boolean;
  playerScore: number;
  aiScore: number;
  onRestart: () => void;
}

export default function GameOverModal({
  open,
  playerScore,
  aiScore,
  onRestart,
}: Props) {
  if (!open) return null;

  const winner = playerScore > aiScore ? "YOU WIN 🧠" : "AI WINS 🤖";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center w-72">
        <h2 className="text-2xl font-bold mb-2">{winner}</h2>

        <p className="text-sm">You: {playerScore} HP</p>
        <p className="text-sm mb-4">AI: {aiScore} HP</p>

        <button
          onClick={onRestart}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          Restart Duel
        </button>
      </div>
    </div>
  );
}
