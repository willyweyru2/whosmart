export function aiChoose() {
  // AI guesses randomly (later we make it smarter)
  return Math.random() > 0.5 ? "a" : "b";
}

export function aiTrashTalk(win: boolean) {
  const winLines = [
    "Too easy 🤖",
    "Human logic detected. Weak.",
    "I calculated your loss in advance.",
  ];

  const loseLines = [
    "Lucky guess, human.",
    "My GPU was distracted.",
    "Rematch. Immediately.",
  ];

  return win
    ? winLines[Math.floor(Math.random() * winLines.length)]
    : loseLines[Math.floor(Math.random() * loseLines.length)];
}
