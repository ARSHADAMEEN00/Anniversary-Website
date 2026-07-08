import { useCallback, useEffect, useState } from 'react';
import ceremonyMusicUrl from '../assets/song/ceremony_music.mp3';

let romanticAudio = null;
const romanticMusicListeners = new Set();

function getRomanticAudio() {
  if (!romanticAudio) {
    romanticAudio = new Audio(ceremonyMusicUrl);
    romanticAudio.loop = true;
    romanticAudio.volume = 0.55;
    romanticAudio.preload = 'auto';
  }

  return romanticAudio;
}

function isRomanticMusicPlaying() {
  return Boolean(romanticAudio && !romanticAudio.paused);
}

function notifyRomanticMusicListeners() {
  const playing = isRomanticMusicPlaying();
  romanticMusicListeners.forEach((listener) => listener(playing));
}

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

export async function startRomanticMusic() {
  const audio = getRomanticAudio();
  audio.muted = false;

  try {
    await audio.play();
    notifyRomanticMusicListeners();
    return true;
  } catch {
    notifyRomanticMusicListeners();
    return false;
  }
}

export function stopRomanticMusic(reset = false) {
  if (romanticAudio) {
    romanticAudio.pause();
    if (reset) romanticAudio.currentTime = 0;
  }
  notifyRomanticMusicListeners();
}

export function useRomanticMusic() {
  const [playing, setPlaying] = useState(isRomanticMusicPlaying);

  const toggle = useCallback(async () => {
    if (isRomanticMusicPlaying()) {
      stopRomanticMusic();
      return;
    }

    await startRomanticMusic();
  }, []);

  useEffect(() => {
    romanticMusicListeners.add(setPlaying);
    setPlaying(isRomanticMusicPlaying());
    return () => romanticMusicListeners.delete(setPlaying);
  }, []);

  return { playing, toggle };
}
