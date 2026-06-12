import { Music, Volume2, VolumeX } from 'lucide-react';
import { useRomanticMusic } from '../hooks/useAudio.js';

export default function MusicToggle() {
  const { playing, toggle } = useRomanticMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-2 text-sm font-extrabold text-lightBlue-900 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/75 dark:border-lightBlue-200/20 dark:bg-lightBlue-900/20 dark:text-lightBlue-50"
    >
      <Music size={17} />
      {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      {playing ? 'Romance On' : 'Music Toggle'}
    </button>
  );
}
