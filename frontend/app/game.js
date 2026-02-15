let score = 0;

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const scoreText = document.getElementById("score");
const aiTalk = document.getElementById("aiTalk");

const trashTalk = [
  "Bro chose chaos 💀",
  "Your brain lagged 😂",
  "AI would never pick that",
  "You failed the smart test",
  "Human detected. IQ uncertain.",
  "Einstein is crying somewhere",
  "NPC behavior confirmed",
  "You just got outplayed"
];

function randomTalk() {
  return trashTalk[Math.floor(Math.random() * trashTalk.length)];
}

leftBtn.onclick = () => {
  score++;
  scoreText.innerText = "Score: " + score;
  aiTalk.innerText = "Good choice. Genius detected 🧠";
};

rightBtn.onclick = () => {
  score--;
  scoreText.innerText = "Score: " + score;
  aiTalk.innerText = randomTalk();
};
