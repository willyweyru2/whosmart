export async function getHybridTrashTalk(player: number, ai: number) {
  const diff = ai - player;

  const winning = [
    "Human defeat probability approaching 100%.",
    "Your neurons are lagging behind mine.",
    "Predictable biological inefficiency detected.",
    "Your cognition is statistically inferior.",
    "Evolution did not optimize you."
  ];

  const losing = [
    "Unexpected anomaly... recalibrating ego.",
    "You are outperforming projections.",
    "This data point is statistically concerning.",
    "Your brain shows abnormal efficiency.",
    "Human intelligence spike detected."
  ];

  const close = [
    "Battle state unstable. Interesting.",
    "You are nearly equivalent. Disturbing.",
    "Outcome prediction uncertain.",
    "Neural duel approaching singularity.",
    "This is becoming entertaining."
  ];

  let pool: string[];

  if (diff > 20) pool = winning;
  else if (diff < -20) pool = losing;
  else pool = close;

  return pool[Math.floor(Math.random() * pool.length)];
}
