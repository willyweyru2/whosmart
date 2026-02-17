export function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.05;
  msg.pitch = 0.2;
  msg.volume = 1;

  const voices = speechSynthesis.getVoices();
  msg.voice = voices.find(v => v.name.includes("Google")) || voices[0];

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

export function stopSpeak() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    speechSynthesis.cancel();
  }
}
