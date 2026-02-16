"use client";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">

      {/* Ambient Glow (desktop only) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="w-[420px] h-[860px] bg-purple-500/15 blur-[120px] rounded-full mx-auto" />
        <div className="w-[300px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full absolute inset-0 mx-auto" />
      </div>

      {/* PHONE SHELL (desktop preview only) */}
      <div
        className="
        relative bg-black rounded-[48px] border border-neutral-800
        shadow-[0_0_80px_rgba(139,92,246,0.25)]
        w-full max-w-[390px] h-full md:h-[844px]
        overflow-hidden flex flex-col
        "
      >
        {/* Dynamic Island (visual only) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-50 border border-neutral-800 pointer-events-none" />

        {/* REAL FULLSCREEN GAME SCREEN */}
        <div className="h-full w-full flex flex-col bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
