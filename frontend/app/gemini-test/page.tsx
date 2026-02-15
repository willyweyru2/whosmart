"use client";

import { useEffect, useState } from "react";

export default function GeminiTest() {
  const [msg, setMsg] = useState("Testing Gemini...");

  useEffect(() => {
    fetch("/api/geminiTest")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setMsg("✅ " + d.text);
        } else {
          setMsg("❌ ERROR: " + d.error);
        }
      })
      .catch(() => setMsg("❌ Fetch failed"));
  }, []);

  return (
    <div style={{ padding: 40, fontSize: 24, fontFamily: "monospace" }}>
      {msg}
    </div>
  );
}
