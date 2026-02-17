"use client";

import { useEffect, useState } from "react";

export default function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const chars = "!@#$%^&*()_+=-{}[]<>?";
    let i = 0;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, idx) =>
            idx < i ? c : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );

      i++;
      if (i > text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono text-purple-300">{display}</span>;
}
