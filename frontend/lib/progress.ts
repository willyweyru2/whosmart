export function getProgress() {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("brainwho_progress") || "null");
}

export function saveProgress(data: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("brainwho_progress", JSON.stringify(data));
}
