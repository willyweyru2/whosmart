"use client";

import dynamic from "next/dynamic";
import PhoneFrame from "./components/PhoneFrame";
import { APP_NAME } from "@/lib/config";

const TAGLINE = "AI vs You • Swipe to Battle";

// Prevent hydration mismatch
const DuelGame = dynamic(() => import("./components/DuelGame"), {
  ssr: false,
  loading: () => (
    <div className="text-purple-400 text-sm animate-pulse">
      Initializing Neural Arena...
    </div>
  ),
});

export default function Page() {
  return (
    <PhoneFrame>
      <main className="relative h-full w-full text-white flex flex-col overflow-hidden">

        {/* Neon Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_60%)]" />

        {/* HEADER */}
        <div className="relative text-center pt-2 pb-2 z-20">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
            🧠 {APP_NAME}
          </h1>
          <p className="text-[11px] text-purple-400">{TAGLINE}</p>
        </div>

        {/* GAME CENTER */}
        <div className="relative flex-1 flex items-center justify-center w-full z-10">
          <DuelGame />
        </div>

        {/* FOOTER CTA */}
        <div className="relative text-center pb-2 text-xs text-neutral-500 z-20">
          Swipe left/right • AI learns your brain patterns
        </div>

      </main>
    </PhoneFrame>
  );
}
