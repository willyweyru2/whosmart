export function saveProgress(data: { player: number; ai: number }) {
  if (typeof window === "undefined") return;
  localStorage.setItem("brainwho-progress", JSON.stringify(data));
}

export function getProgress() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("brainwho-progress");
  return raw ? JSON.parse(raw) : null;
}
