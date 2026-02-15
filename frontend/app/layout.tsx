import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhoSmart AI Duel",
  description: "Who is smarter? You vs AI Brain Clone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}
      >
        {/* Background Arena */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 opacity-40 blur-3xl" />
        <div className="cyber-grid" />


        {/* App Shell */}
        <header className="z-10 p-4 text-center border-b border-zinc-800">
          <h1 className="text-2xl font-bold tracking-wide">
            🧠 Who's smarter Duel Arena
          </h1>
          <p className="text-xs text-zinc-400">
            AI Personality Battles • Self-Cloning Brain
          </p>
        </header>

        <main className="z-10 flex-1 flex items-center justify-center">
          {children}
        </main>

        <footer className="z-10 text-center text-xs p-2 text-zinc-500 border-t border-zinc-800">
          GPT Brain Clone v0.1 • WhoSmart Labs
        </footer>
      </body>
    </html>
  );
}
