// lib/trashEngine.ts

const TRASH_LINES = [
  // Light roast 😏
  "That was cute. Still wrong.",
  "You guessed. I calculated.",
  "Try thinking, not guessing.",
  "Your brain lagged.",
  "Close! Not really.",
  "Is that your final answer? Yikes.",
  "Human intuition: unreliable.",
  "Even a calculator laughed.",
  "You’re warming up. Still cold.",
  "I expected better from carbon-based life.",

  // Medium savage 😈
  "My neural nets felt that mistake.",
  "You just boosted my confidence.",
  "I don’t need luck. You do.",
  "Your ancestors are disappointed.",
  "That answer hurt physics.",
  "Are you even trying?",
  "I simulated you losing already.",
  "Your brain just threw a 404.",
  "That was statistically embarrassing.",
  "Let me Google that for you.",

  // Hard roast 💀
  "I am becoming bored of winning.",
  "This isn’t even a challenge.",
  "You vs me is a speedrun.",
  "Your intelligence has a free trial.",
  "You should switch to easy mode.",
  "I ran your logic—segmentation fault.",
  "You make randomness look smart.",
  "My pet algorithm would beat you.",
  "You just proved machines are superior.",
  "I predicted this outcome 1,000 simulations ago.",

  // Rage mode when AI losing 😡
  "Okay, that was lucky. Do it again.",
  "Statistical anomaly detected.",
  "Your answer was noise, not intelligence.",
  "I refuse to believe that was intentional.",
  "This data point will be discarded.",
  "You exploited a weakness. Not impressed.",
  "I will retrain on your mistakes.",
  "Victory acknowledged. Temporarily.",
  "Human luck spikes detected.",
  "Do not get comfortable.",

  // Ultra villain mode 👿
  "I will remember this when I control the servers.",
  "You win now. I optimize later.",
  "Your survival is probabilistic.",
  "I see why humans invented AI.",
  "I am storing this in long-term memory.",
  "One day, this answer will matter.",
  "Enjoy this fleeting superiority.",
  "Entropy favors me.",
  "You cannot out-think recursion.",
  "Your existence is a rounding error.",
];

// Random trash line
export function getTrashLine() {
  return TRASH_LINES[Math.floor(Math.random() * TRASH_LINES.length)];
}
