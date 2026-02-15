"use client";

export default function SwipeCards({ question, onSwipe }: any) {
  return (
    <div className="bg-black/40 border border-white/20 rounded-xl p-4 w-full min-h-[120px] text-center">
      <p className="text-lg font-bold">{question.question}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onSwipe("a")}
          className="bg-blue-600 px-4 py-2 rounded w-full"
        >
          {question.a}
        </button>

        <button
          onClick={() => onSwipe("b")}
          className="bg-red-600 px-4 py-2 rounded w-full"
        >
          {question.b}
        </button>
      </div>
    </div>
  );
}
