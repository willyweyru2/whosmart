export const playSound = (file: string) => {
  const audio = new Audio(`/sounds/${file}`);
  audio.volume = 0.6;
  audio.play();
};
