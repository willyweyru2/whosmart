import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>

      <body className={`${inter.className} bg-black text-white overflow-hidden`}>

        {/* Cyber Background (lightweight) */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40" />
        <div className="fixed inset-0 pointer-events-none cyber-grid opacity-20" />

        {/* App Render */}
        <div className="relative z-10 h-screen w-screen">
          {children}
        </div>

      </body>
    </html>
  );
}
