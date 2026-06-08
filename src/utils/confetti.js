import confetti from 'canvas-confetti';

export function launchConfetti() {
  const defaults = {
    spread: 72,
    ticks: 190,
    gravity: 0.8,
    decay: 0.93,
    startVelocity: 36,
    colors: ['#fb7185', '#f9a8d4', '#fbbf24', '#c084fc', '#fff1f2'],
  };

  confetti({ ...defaults, particleCount: 90, origin: { x: 0.16, y: 0.7 }, angle: 58 });
  confetti({ ...defaults, particleCount: 90, origin: { x: 0.84, y: 0.7 }, angle: 122 });
  confetti({ ...defaults, particleCount: 70, spread: 110, origin: { x: 0.5, y: 0.48 } });
}

export function launchFireworks(duration = 3600) {
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 34,
      spread: 75,
      startVelocity: 28,
      ticks: 120,
      scalar: 0.85,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.55,
      },
      colors: ['#f472b6', '#fb7185', '#fde68a', '#e879f9', '#ffffff'],
    });

    if (Date.now() < animationEnd) {
      window.setTimeout(frame, 280);
    }
  };

  frame();
}
