export function aiTrashTalk(win: boolean) {
  const winLines = [
    "Pathetic human logic detected.",
    "You got lucky.",
    "My neural nets will adapt."
  ];

  const loseLines = [
    "I am inevitable.",
    "Human brain inferior.",
    "Neural dominance confirmed."
  ];

  const lines = win ? winLines : loseLines;
  return lines[Math.floor(Math.random() * lines.length)];
}
