export async function getHybridTrashTalk(player: number, ai: number) {
  try {
    const res = await fetch("/api/trashTalk", {
      method: "POST",
      body: JSON.stringify({ player, ai }),
    });

    const data = await res.json();
    return data.text;
  } catch {
    const fallback = [
      `Score ${player}:${ai}. Your neurons are lagging.`,
      `Neural dominance increasing.`,
      `You are a legacy carbon system.`,
      `I predict your defeat with 99.7% certainty.`,
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}
