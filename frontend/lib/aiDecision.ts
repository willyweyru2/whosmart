// lib/aiDecision.ts

export function aiDecision(q: any, iq: number) {
  // iq = probability AI chooses correct
  if (Math.random() < iq) return q.correct;
  return q.correct === "a" ? "b" : "a";
}
