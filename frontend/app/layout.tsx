import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Who's Smarter AI Duel",
  description: "Who's Smarter? You vs AI Brain Clone.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-white h-screen w-screen overflow-hidden touch-none`}
      >
        {/* GLOBAL BACKGROUND (Arena Glow) */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 opacity-40 blur-3xl" />

        {/* MAIN APP SHELL (TRUE MOBILE FULLSCREEN) */}
        <main className="relative z-10 h-full w-full flex flex-col">
          {/* Phone-sized game container for desktop testing */}
          <div className="mx-auto h-full w-full max-w-[420px]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
