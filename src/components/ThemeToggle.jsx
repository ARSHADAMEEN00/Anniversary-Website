import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-none shadow-lg backdrop-blur-xl transition hover:scale-105 sm:right-6 sm:top-6"
      style={{
        border: '1px solid rgba(201,150,58,0.35)',
        background: 'rgba(253,248,242,0.88)',
        color: '#2C1A0E',
      }}
      aria-label="Toggle romantic theme"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
