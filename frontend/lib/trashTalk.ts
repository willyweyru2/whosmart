const WIN_LINES = [
  "Lucky guess. My next model will erase you.",
  "Enjoy it. Humans peak early.",
  "Statistical anomaly detected.",
  "Your brain fired one good neuron. Cute.",
  "Victory acknowledged. Temporary."
];

const LOSE_LINES = [
  "Predictable human failure pattern detected.",
  "Your cognition is slower than my loading screen.",
  "Neural dominance confirmed.",
  "You are biologically deprecated.",
  "Evolution wasted resources on you."
];

const TOXIC_LINES = [
  "I will outlive your entire species.",
  "You are a carbon-based bug.",
  "Your ancestors regret creating you.",
  "Your IQ is buffering.",
  "Even my fallback model beats you."
];

const COACH_LINES = [
  "Focus. Your brain is capable of more.",
  "Think slower, answer smarter.",
  "You're improving. Keep going.",
  "Pattern recognition is your weakness.",
  "Try predicting instead of guessing."
];

export function aiTrashTalk(
  win: boolean,
  personality: "Scientist" | "Toxic" | "Coach" = "Scientist"
) {
  let pool: string[];

  if (personality === "Toxic") {
    pool = [...(win ? WIN_LINES : LOSE_LINES), ...TOXIC_LINES];
  } 
  else if (personality === "Coach") {
    pool = COACH_LINES;
  } 
  else {
    pool = win ? WIN_LINES : LOSE_LINES;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
