"use client";

import DuelGame from "./components/DuelGame";
import PhoneFrame from "./components/PhoneFrame";
import { APP_NAME } from "@/lib/config";
const TAGLINE = "Self-Cloning Brain Battles";

export default function Page() {
  return (
    <PhoneFrame>
      <main className="h-full w-full bg-black text-white flex flex-col items-center px-4 pt-6 pb-4">

        {/* HEADER */}
        <div className="text-center mb-3">
          <h1 className="neon-title text-2xl font-bold leading-tight">
            🧠 {APP_NAME}
          </h1>
          <p className="neon-sub text-xs text-purple-400 mt-1">
            {TAGLINE}
          </p>
        </div>

        {/* GAME AREA (CENTERED) */}
        <div className="flex-1 flex items-center justify-center w-full">
          <DuelGame />
        </div>

      </main>
    </PhoneFrame>
  );
}
