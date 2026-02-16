"use client";

let yesSound: HTMLAudioElement | null = null;
let noSound: HTMLAudioElement | null = null;

export function initSounds() {
  if (typeof window === "undefined") return;

  yesSound = new Audio("/sounds/yes.mp3");
  noSound = new Audio("/sounds/no.mp3");

  yesSound.volume = 0.6;
  noSound.volume = 0.6;
}

export function playYes() {
  yesSound?.currentTime && (yesSound.currentTime = 0);
  yesSound?.play();
}

export function playNo() {
  noSound?.currentTime && (noSound.currentTime = 0);
  noSound?.play();
}

export function vibrateYes() {
  if ("vibrate" in navigator) navigator.vibrate([20, 10, 20]);
}

export function vibrateNo() {
  if ("vibrate" in navigator) navigator.vibrate([40]);
}
