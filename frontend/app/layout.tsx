import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
      <body className={`${inter.className} bg-black text-white w-screen h-[100dvh] overflow-hidden`}>
        
        {/* Background glow */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/30 blur-3xl" />

        <main className="relative z-10 w-full h-full flex justify-center">
          <div className="w-full max-w-[420px] h-full">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}
