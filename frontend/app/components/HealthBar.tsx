"use client";

export default function HealthBar({ label, hp }: { label: string; hp: number }) {
  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span>{label}</span>
        <span>{hp}/100</span>
      </div>

      <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${hp}%` }}
        />
      </div>
    </div>
  );
}
