import { Music, Volume2, VolumeX } from 'lucide-react';
import { useRomanticMusic } from '../hooks/useAudio.js';

export default function MusicToggle() {
  const { playing, toggle } = useRomanticMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-none px-4 py-2 text-sm font-extrabold shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5"
      style={{
        border: '1px solid rgba(201,150,58,0.35)',
        background: 'rgba(253,248,242,0.88)',
        color: '#2C1A0E',
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: '0.04em',
      }}
    >
      <Music size={17} />
      {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      {playing ? 'Romance On' : 'Music Toggle'}
    </button>
  );
}
