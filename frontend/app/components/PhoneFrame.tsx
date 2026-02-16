"use client";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">

      {/* Ambient Cyber Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[420px] h-[860px] bg-purple-500/20 blur-[120px] rounded-full" />
        <div className="w-[300px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full absolute" />
      </div>

      {/* iPhone Shell */}
      <div
        className="
        relative bg-black rounded-[52px] border border-neutral-700
        shadow-[0_0_120px_rgba(139,92,246,0.25)]
        w-full max-w-[390px] h-[844px]
        overflow-hidden flex flex-col
        "
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[140px] h-[34px] bg-black rounded-full z-40 border border-neutral-700 shadow-md" />

        {/* Screen Content */}
        <div
          className="
          h-full w-full
          pt-12 pb-6 px-3
          flex flex-col
          bg-gradient-to-b from-black via-black to-purple-950/40
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
