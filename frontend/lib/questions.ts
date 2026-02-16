// lib/questions.ts

export type Category = "science" | "logic" | "math" | "trick";
export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: number;
  text: string;
  answer: boolean;
  category: Category;
  difficulty: Difficulty;
};

/* ================= CORE SEED QUESTIONS ================= */

const SEED_QUESTIONS: Question[] = [

/* ================= EASY (1–30) ================= */

{ id: 1, text: "2 + 2 = 4", answer: true, category: "math", difficulty: "easy" },
{ id: 2, text: "The sun is a star", answer: true, category: "science", difficulty: "easy" },
{ id: 3, text: "A triangle has 3 sides", answer: true, category: "logic", difficulty: "easy" },
{ id: 4, text: "5 + 5 = 11", answer: false, category: "math", difficulty: "easy" },
{ id: 5, text: "Water freezes at 0°C", answer: true, category: "science", difficulty: "easy" },
{ id: 6, text: "Cats are mammals", answer: true, category: "science", difficulty: "easy" },
{ id: 7, text: "7 is an even number", answer: false, category: "math", difficulty: "easy" },
{ id: 8, text: "Earth has one moon", answer: true, category: "science", difficulty: "easy" },
{ id: 9, text: "A square has 4 equal sides", answer: true, category: "logic", difficulty: "easy" },
{ id: 10, text: "10 is greater than 5", answer: true, category: "math", difficulty: "easy" },
{ id: 11, text: "Birds can breathe underwater", answer: false, category: "science", difficulty: "easy" },
{ id: 12, text: "1 + 1 = 3", answer: false, category: "math", difficulty: "easy" },
{ id: 13, text: "The sky is blue on a clear day", answer: true, category: "science", difficulty: "easy" },
{ id: 14, text: "Dogs are reptiles", answer: false, category: "science", difficulty: "easy" },
{ id: 15, text: "A week has 7 days", answer: true, category: "logic", difficulty: "easy" },
{ id: 16, text: "0 is a number", answer: true, category: "math", difficulty: "easy" },
{ id: 17, text: "Humans need oxygen to live", answer: true, category: "science", difficulty: "easy" },
{ id: 18, text: "Fish live on land", answer: false, category: "science", difficulty: "easy" },
{ id: 19, text: "5 is less than 9", answer: true, category: "math", difficulty: "easy" },
{ id: 20, text: "The moon produces its own light", answer: false, category: "science", difficulty: "easy" },
{ id: 21, text: "Ice is solid water", answer: true, category: "science", difficulty: "easy" },
{ id: 22, text: "10 - 3 = 7", answer: true, category: "math", difficulty: "easy" },
{ id: 23, text: "The Earth is flat", answer: false, category: "science", difficulty: "easy" },
{ id: 24, text: "2 is greater than 3", answer: false, category: "math", difficulty: "easy" },
{ id: 25, text: "A circle has corners", answer: false, category: "logic", difficulty: "easy" },
{ id: 26, text: "Fire is hot", answer: true, category: "science", difficulty: "easy" },
{ id: 27, text: "Rain is dry", answer: false, category: "logic", difficulty: "easy" },
{ id: 28, text: "A year has 365 days", answer: true, category: "logic", difficulty: "easy" },
{ id: 29, text: "3 + 3 = 6", answer: true, category: "math", difficulty: "easy" },
{ id: 30, text: "Grass is usually green", answer: true, category: "science", difficulty: "easy" },

/* ================= MEDIUM (101–130) ================= */

{ id: 101, text: "5² = 30", answer: false, category: "math", difficulty: "medium" },
{ id: 102, text: "Sound travels faster than light", answer: false, category: "science", difficulty: "medium" },
{ id: 103, text: "All mammals lay eggs", answer: false, category: "logic", difficulty: "medium" },
{ id: 104, text: "A prime number has exactly two factors", answer: true, category: "math", difficulty: "medium" },
{ id: 105, text: "The brain uses more energy than muscles at rest", answer: true, category: "science", difficulty: "medium" },
{ id: 106, text: "Water boils at 100°C at sea level", answer: true, category: "science", difficulty: "medium" },
{ id: 107, text: "The square root of 16 is 3", answer: false, category: "math", difficulty: "medium" },
{ id: 108, text: "Humans have 206 bones", answer: true, category: "science", difficulty: "medium" },
{ id: 109, text: "All birds can fly", answer: false, category: "logic", difficulty: "medium" },
{ id: 110, text: "Pi is approximately 3.14", answer: true, category: "math", difficulty: "medium" },
{ id: 111, text: "Lightning is hotter than the sun’s surface", answer: true, category: "science", difficulty: "medium" },
{ id: 112, text: "A kilometer is longer than a mile", answer: false, category: "logic", difficulty: "medium" },
{ id: 113, text: "DNA carries genetic information", answer: true, category: "science", difficulty: "medium" },
{ id: 114, text: "0 is a positive number", answer: false, category: "math", difficulty: "medium" },
{ id: 115, text: "The Pacific Ocean is the largest ocean", answer: true, category: "science", difficulty: "medium" },
{ id: 116, text: "A hexagon has 8 sides", answer: false, category: "logic", difficulty: "medium" },
{ id: 117, text: "Electrons are negatively charged", answer: true, category: "science", difficulty: "medium" },
{ id: 118, text: "Every even number is divisible by 2", answer: true, category: "math", difficulty: "medium" },
{ id: 119, text: "Mars is closer to the sun than Earth", answer: false, category: "science", difficulty: "medium" },
{ id: 120, text: "Sharks are mammals", answer: false, category: "science", difficulty: "medium" },
{ id: 121, text: "A leap year has 366 days", answer: true, category: "logic", difficulty: "medium" },
{ id: 122, text: "Light travels in a straight line", answer: true, category: "science", difficulty: "medium" },
{ id: 123, text: "The sum of angles in a triangle is 180°", answer: true, category: "math", difficulty: "medium" },
{ id: 124, text: "Bats are blind", answer: false, category: "science", difficulty: "medium" },
{ id: 125, text: "Zero divided by any number is zero", answer: true, category: "math", difficulty: "medium" },
{ id: 126, text: "Venus is the hottest planet", answer: true, category: "science", difficulty: "medium" },
{ id: 127, text: "All reptiles are cold-blooded", answer: true, category: "science", difficulty: "medium" },
{ id: 128, text: "A cube has 6 faces", answer: true, category: "logic", difficulty: "medium" },
{ id: 129, text: "The speed of light is about 300,000 km/s", answer: true, category: "science", difficulty: "medium" },
{ id: 130, text: "2 is the only even prime number", answer: true, category: "math", difficulty: "medium" },

/* ================= HARD (201–230) ================= */

{ id: 201, text: "√2 is irrational", answer: true, category: "math", difficulty: "hard" },
{ id: 202, text: "Time dilation is predicted by relativity", answer: true, category: "science", difficulty: "hard" },
{ id: 203, text: "Every prime > 2 is odd", answer: true, category: "logic", difficulty: "hard" },
{ id: 204, text: "The speed of light changes in a vacuum", answer: false, category: "science", difficulty: "hard" },
{ id: 205, text: "Gödel proved all truths are provable", answer: false, category: "logic", difficulty: "hard" },
{ id: 206, text: "e is approximately 2.718", answer: true, category: "math", difficulty: "hard" },
{ id: 207, text: "Quantum entanglement allows instant communication", answer: false, category: "science", difficulty: "hard" },
{ id: 208, text: "The Monty Hall problem increases winning odds by switching", answer: true, category: "logic", difficulty: "hard" },
{ id: 209, text: "Black holes evaporate via Hawking radiation", answer: true, category: "science", difficulty: "hard" },
{ id: 210, text: "All irrational numbers are transcendental", answer: false, category: "math", difficulty: "hard" },
{ id: 211, text: "Neutrinos have mass", answer: true, category: "science", difficulty: "hard" },
{ id: 212, text: "The P vs NP problem is solved", answer: false, category: "logic", difficulty: "hard" },
{ id: 213, text: "The golden ratio is irrational", answer: true, category: "math", difficulty: "hard" },
{ id: 214, text: "Dark matter interacts via gravity", answer: true, category: "science", difficulty: "hard" },
{ id: 215, text: "Zeno’s paradoxes imply motion is impossible", answer: false, category: "logic", difficulty: "hard" },
{ id: 216, text: "Planck time is the smallest measurable time unit", answer: true, category: "science", difficulty: "hard" },
{ id: 217, text: "A Turing machine can solve every problem", answer: false, category: "logic", difficulty: "hard" },
{ id: 218, text: "Entropy always increases in an isolated system", answer: true, category: "science", difficulty: "hard" },
{ id: 219, text: "All continuous functions are differentiable", answer: false, category: "math", difficulty: "hard" },
{ id: 220, text: "The Higgs field gives particles mass", answer: true, category: "science", difficulty: "hard" },
{ id: 221, text: "There are infinitely many prime numbers", answer: true, category: "math", difficulty: "hard" },
{ id: 222, text: "Quantum computers use qubits", answer: true, category: "science", difficulty: "hard" },
{ id: 223, text: "Banach–Tarski paradox duplicates spheres", answer: true, category: "math", difficulty: "hard" },
{ id: 224, text: "The universe is static", answer: false, category: "science", difficulty: "hard" },
{ id: 225, text: "Axiom of choice is provable in ZF", answer: false, category: "logic", difficulty: "hard" },
{ id: 226, text: "The Riemann Hypothesis is proven", answer: false, category: "math", difficulty: "hard" },
{ id: 227, text: "General relativity predicts gravitational waves", answer: true, category: "science", difficulty: "hard" },
{ id: 228, text: "A Möbius strip has two sides", answer: false, category: "math", difficulty: "hard" },
{ id: 229, text: "Neural networks are universal function approximators", answer: true, category: "logic", difficulty: "hard" },
{ id: 230, text: "Schrödinger’s cat is alive and dead simultaneously", answer: true, category: "science", difficulty: "hard" },

];

/* ================= AUTO EXPAND TO 100 EACH ================= */

// BrainWho filler generator (deterministic)
function expandQuestions(seed: Question[], perDifficulty = 100): Question[] {
  const out = [...seed];
  const counters = { easy: 1, medium: 101, hard: 201 };

  const templates = {
    easy: (i: number) => ({
      text: `Easy logic test #${i}: 1 + 1 = 2`,
      answer: true,
      category: "logic" as Category,
    }),
    medium: (i: number) => ({
      text: `Medium math test #${i}: ${i} is divisible by 2`,
      answer: i % 2 === 0,
      category: "math" as Category,
    }),
    hard: (i: number) => ({
      text: `Hard science test #${i}: The speed of light is constant in vacuum`,
      answer: true,
      category: "science" as Category,
    }),
  };

  (["easy", "medium", "hard"] as Difficulty[]).forEach(diff => {
    const existing = out.filter(q => q.difficulty === diff).length;
    for (let i = existing + 1; i <= perDifficulty; i++) {
      const id = counters[diff] + i;
      out.push({
        id,
        difficulty: diff,
        ...templates[diff](i),
      });
    }
  });

  return out;
}

export const QUESTIONS: Question[] = expandQuestions(SEED_QUESTIONS);
