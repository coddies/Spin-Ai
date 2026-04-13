import confetti from 'canvas-confetti';

/**
 * Fires a burst of colorful confetti for winners
 */
export const fireWinnerConfetti = () => {
  const colors = ['#7c3aed', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#06b6d4'];

  // First burst from center
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
    colors,
    startVelocity: 45,
    gravity: 0.8,
    scalar: 1.2,
    shapes: ['circle', 'square'],
  });

  // Left burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    });
  }, 200);

  // Right burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    });
  }, 400);

  // Final shower
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      startVelocity: 20,
      gravity: 1.2,
      scalar: 0.9,
    });
  }, 700);
};
