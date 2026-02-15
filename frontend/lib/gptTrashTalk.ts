export async function getAITrashTalk(playerScore: number, aiScore: number) {
  const res = await fetch("/api/trash-talk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerScore, aiScore }),
  });

  const data = await res.json();
  return data.trashTalk;
}
const insults = [
  "My neural net is laughing at your moves.",
  "You're basically an NPC with lag.",
  "Even a potato CPU would outperform you.",
  "Is that your strategy or a bug?",
  "I trained for 2 seconds and surpassed you.",
  "You’re buffering… mentally.",
  "Your brain runs on Internet Explorer.",
];

export function getLocalTrashTalk(playerScore: number, aiScore: number) {
  if (aiScore > playerScore) {
    return insults[Math.floor(Math.random() * insults.length)];
  }
  return "You're lucky. Enjoy it while it lasts.";
}
