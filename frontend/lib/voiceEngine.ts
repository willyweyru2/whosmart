// lib/voiceEngine.ts

let selectedVoiceName: string | null = null;

/* Load saved voice */
export function loadSavedVoice() {
  if (typeof window === "undefined") return;
  selectedVoiceName = localStorage.getItem("ai-voice");
}

/* Save voice */
export function saveVoice(name: string) {
  selectedVoiceName = name;
  if (typeof window !== "undefined") {
    localStorage.setItem("ai-voice", name);
  }
}

/* Get voices */
export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined") return [];
  return speechSynthesis.getVoices();
}

/* Speak */
export function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.0;
  msg.pitch = 0.3;
  msg.volume = 1;

  const voices = speechSynthesis.getVoices();
  let voice =
    voices.find(v => v.name === selectedVoiceName) ||
    voices.find(v => v.name.includes("Google")) ||
    voices.find(v => v.name.includes("Microsoft")) ||
    voices[0];

  if (voice) msg.voice = voice;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/* Stop speaking */
export function stopSpeak() {
  if (typeof window !== "undefined") {
    speechSynthesis.cancel();
  }
}
