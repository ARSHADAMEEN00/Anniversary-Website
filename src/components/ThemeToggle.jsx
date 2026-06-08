import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/45 text-rosewood shadow-lg backdrop-blur-xl transition hover:scale-105 dark:border-white/15 dark:bg-white/10 dark:text-pink-50 sm:right-6 sm:top-6"
      aria-label="Toggle romantic theme"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
