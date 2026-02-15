declare module "canvas-confetti";
export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  zIndex?: number;
  colors?: string[];
  shapes?: ("square" | "circle")[];
  origin?: { x: number; y: number };
}

export default function confetti(options?: ConfettiOptions): void;