"use client";

import ConfettiExplosion from "react-confetti-explosion";

export default function Explosion({ trigger }: { trigger: boolean }) {
  if (!trigger) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      <ConfettiExplosion
        force={0.8}
        duration={2200}
        particleCount={120}
        width={1600}
      />
    </div>
  );
}
