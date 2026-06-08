import { useCallback, useEffect, useRef, useState } from 'react';

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
}

function playTone(context, frequency, startTime, duration, gainValue = 0.04) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.04);
}

export function useSuccessSound() {
  return useCallback(() => {
    const context = getAudioContext();
    if (!context) return;

    const now = context.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      playTone(context, frequency, now + index * 0.11, 0.28, 0.055);
    });
  }, []);
}

export function useRomanticMusic() {
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef(null);
  const timerRef = useRef(null);

  const stop = useCallback(() => {
    setPlaying(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }

    const context = contextRef.current || getAudioContext();
    if (!context) return;

    contextRef.current = context;
    const melody = [392, 440, 523.25, 659.25, 587.33, 523.25, 440, 392];
    let step = 0;

    const playLoop = () => {
      const now = context.currentTime;
      const root = melody[step % melody.length];
      playTone(context, root, now, 0.55, 0.032);
      playTone(context, root * 1.5, now + 0.16, 0.38, 0.018);
      step += 1;
    };

    playLoop();
    timerRef.current = window.setInterval(playLoop, 720);
    setPlaying(true);
  }, [playing, stop]);

  useEffect(() => stop, [stop]);

  return { playing, toggle };
}
