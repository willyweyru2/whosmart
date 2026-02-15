export async function getHybridTrashTalk(player: number, ai: number) {
  // Offline fallback
  const lines = [
    `Score ${player}:${ai}. You cannot escape logic.`,
    `Neural dominance increasing.`,
    `Your biological brain is outdated.`,
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}
