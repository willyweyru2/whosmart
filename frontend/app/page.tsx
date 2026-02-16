"use client";

import dynamic from "next/dynamic";
import PhoneFrame from "./components/PhoneFrame";
import { APP_NAME } from "@/lib/config";

const TAGLINE = "AI vs You • Swipe to Battle";

// Client-only game loader
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
      <main
        className="relative h-full w-full flex flex-col text-white overflow-hidden"
        suppressHydrationWarning
      >
        {/* Backgrounds MUST ignore pointer events */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_60%)] pointer-events-none" />

        {/* HEADER */}
        <header className="relative z-20 text-center pt-2 pb-2">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
            🧠 {APP_NAME}
          </h1>
          <p className="text-[11px] text-purple-400">{TAGLINE}</p>
        </header>

        {/* GAME CENTER */}
        <section className="relative z-10 flex-1 flex items-center justify-center w-full">
          <DuelGame />
        </section>

        {/* FOOTER */}
        <footer className="relative z-20 text-center pb-2 text-xs text-neutral-500">
          Swipe left/right • AI learns your brain patterns
        </footer>
      </main>
    </PhoneFrame>
  );
}
