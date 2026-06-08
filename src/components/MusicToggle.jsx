import { Music, Volume2, VolumeX } from 'lucide-react';
import { useRomanticMusic } from '../hooks/useAudio.js';

export default function MusicToggle() {
  const { playing, toggle } = useRomanticMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/45 px-4 py-2 text-sm font-extrabold text-rose-700 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/10 dark:text-pink-50"
    >
      <Music size={17} />
      {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      {playing ? 'Romance On' : 'Music Toggle'}
    </button>
  );
}
