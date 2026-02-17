"use client";

import { useEffect, useState } from "react";
import { getVoices, saveVoice, loadSavedVoice, speak } from "@/lib/voiceEngine";

export default function VoiceSelector() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    loadSavedVoice();

    const load = () => {
      const v = getVoices().filter(v =>
        v.name.includes("Google") ||
        v.name.includes("Microsoft") ||
        v.name.includes("Neural") ||
        v.lang.startsWith("en")
      );
      setVoices(v);

      const saved = localStorage.getItem("ai-voice");
      if (saved) setSelected(saved);
    };

    load();
    speechSynthesis.onvoiceschanged = load;
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 text-xs text-purple-300 mt-1">

      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          saveVoice(e.target.value);
        }}
        className="bg-black border border-purple-500 px-2 py-1 rounded text-xs"
      >
        <option value="">Auto AI Voice</option>
        {voices.map(v => (
          <option key={v.name} value={v.name}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>

      <button
        onClick={() => speak("Human intelligence detected. Voice calibration complete.")}
        className="text-[10px] text-cyan-400 hover:text-cyan-200"
      >
        ▶ Test Voice
      </button>
    </div>
  );
}
