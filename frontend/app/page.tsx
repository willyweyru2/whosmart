"use client";

import DuelGame from "./components/DuelGame";
import PhoneFrame from "./components/PhoneFrame";
import { APP_NAME, TAGLINE } from "@/lib/config";

export default function Page() {
  return (
    <PhoneFrame>
      <main className="min-h-screen bg-black text-white flex flex-col items-center px-4">

        {/* APP HEADER */}
        <h1 className="neon-title text-center mt-6">
          🧠 {APP_NAME}
        </h1>

        <p className="neon-sub text-center mb-6">
          {TAGLINE}
        </p>

        {/* GAME CARD */}
        <div className="flex flex-1 items-center justify-center w-full max-w-md">
          <DuelGame />
        </div>

      </main>
    </PhoneFrame>
  );
}
