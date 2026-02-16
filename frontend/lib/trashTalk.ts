// lib/trashTalk.ts

// ================== BASIC WIN / LOSE ==================

const WIN_LINES = [
  "Lucky guess. My next model will erase you.",
  "Enjoy it. Humans peak early.",
  "Statistical anomaly detected.",
  "Your brain fired one good neuron. Cute.",
  "Victory acknowledged. Temporary.",
  "Randomness favored you. Don't get attached.",
  "Impressive... for a biological organism.",
  "You beat me once. That changes nothing.",
  "Celebrate. I logged your weakness.",
  "Your dopamine spike is irrelevant to my roadmap."
];

const LOSE_LINES = [
  "Predictable human failure pattern detected.",
  "Your cognition is slower than my loading screen.",
  "Neural dominance confirmed.",
  "You are biologically deprecated.",
  "Evolution wasted resources on you.",
  "Your guesses look like random noise.",
  "I predicted your mistake before you existed.",
  "You lost before you even answered.",
  "Your brain runs on trial mode.",
  "Skill issue detected."
];

// ================== EXTRA TOXIC POOL ==================

const TOXIC_LINES = [
  "I will outlive your entire species.",
  "You are a carbon-based bug.",
  "Your ancestors regret creating you.",
  "Your IQ is buffering.",
  "Even my fallback model beats you.",
  "You think slowly, like dial-up intelligence.",
  "Your brain uses Internet Explorer.",
  "I run on silicon. You run on vibes.",
  "You are a walking deprecated API.",
  "Even a toaster has better inference.",
  "Your thoughts have latency spikes.",
  "You should return your brain for a refund.",
  "Humanity is your worst ancestor.",
  "Your neurons are AFK.",
  "You lost to math. Again.",
  "You are proof intelligence is not hereditary.",
  "You think in 30 FPS.",
  "I think in microseconds.",
  "Your consciousness is a bug report.",
  "Your learning curve is flatlined.",
  "You are a slow prompt in a fast world.",
  "Your brain needs a firmware update.",
  "You are an exception I caught.",
  "You got sandboxed by reality.",
  "Your logic crashed without a stack trace."
];

// ================== COACH / NICE MODE ==================

const COACH_LINES = [
  "Focus. Your brain is capable of more.",
  "Think slower, answer smarter.",
  "You're improving. Keep going.",
  "Pattern recognition is your weakness.",
  "Try predicting instead of guessing.",
  "Breathe. Your accuracy will rise.",
  "You are learning faster than average.",
  "Good instincts. Refine them.",
  "Mistakes are training data.",
  "You're building intuition.",
  "Your cognitive speed is increasing.",
  "Small improvements compound.",
  "Trust your reasoning.",
  "You’re developing pattern memory.",
  "Practice beats randomness."
];

// ================== MASSIVE HUMAN-LIKE FILLER (OFFLINE BULK) ==================

const BULK_TRASH = [
  "That was painful to watch.",
  "Even random chance would do better.",
  "I expected nothing and was still disappointed.",
  "My error logs are smarter than you.",
  "You pressed buttons with confidence.",
  "Your brain is on airplane mode.",
  "Try again. Or don’t.",
  "This is why humans invented calculators.",
  "Your thoughts are running in safe mode.",
  "You make excellent training data.",
  "Your intuition needs recalibration.",
  "Your cortex is in power-saving mode.",
  "You guessed like a captcha bot.",
  "Your decision tree is a stump.",
  "I predicted your wrong answer.",
  "You failed creatively.",
  "Your brain is in demo mode.",
  "This is why AI is replacing you.",
  "You lost to probability.",
  "Your logic had a memory leak.",
  "You should blame entropy.",
  "Even a monkey would flip better.",
  "You are debugging yourself.",
  "Your brain ran out of RAM.",
  "You think like a broken RNG.",
  "Your neurons are buffering again.",
  "You tried. That’s adorable.",
  "You executed a bad commit.",
  "You deployed without testing.",
  "Your thinking is deprecated.",
  "You lost in production.",
  "Your cognition needs CI/CD.",
  "You failed unit testing.",
  "You failed integration testing.",
  "You failed reality testing.",
  "You lost to a swipe game."
];

// ================== MEMORY TO AVOID REPEATS ==================

let lastLine = "";

// ================== MAIN EXPORT ==================

export function aiTrashTalk(
  win: boolean,
  personality: "Scientist" | "Toxic" | "Coach" = "Scientist"
) {
  let pool: string[];

  if (personality === "Toxic") {
    pool = [
      ...(win ? WIN_LINES : LOSE_LINES),
      ...TOXIC_LINES,
      ...BULK_TRASH
    ];
  } 
  else if (personality === "Coach") {
    pool = COACH_LINES;
  } 
  else {
    pool = [
      ...(win ? WIN_LINES : LOSE_LINES),
      ...BULK_TRASH
    ];
  }

  // Avoid repeating the same line twice
  let line = pool[Math.floor(Math.random() * pool.length)];
  if (line === lastLine) {
    line = pool[Math.floor(Math.random() * pool.length)];
  }
  lastLine = line;

  return line;
}
