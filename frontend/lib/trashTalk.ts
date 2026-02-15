export function aiTrashTalk(win: boolean) {
  const winLines = ["Pathetic human.", "Easy.", "You are predictable."];
  const loseLines = ["Lucky guess.", "You got lucky.", "I was distracted."];

  const arr = win ? winLines : loseLines;
  return arr[Math.floor(Math.random() * arr.length)];
}
