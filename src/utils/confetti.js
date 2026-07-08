import confetti from 'canvas-confetti';

export function launchConfetti() {
  const defaults = {
    spread: 72,
    ticks: 190,
    gravity: 0.8,
    decay: 0.93,
    startVelocity: 36,
    colors: ['#01579b', '#0288d1', '#29b6f6', '#81d4fa', '#e1f5fe'],
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
      colors: ['#0277bd', '#03a9f4', '#4fc3f7', '#b3e5fc', '#ffffff'],
    });

    if (Date.now() < animationEnd) {
      window.setTimeout(frame, 280);
    }
  };

  frame();
}
