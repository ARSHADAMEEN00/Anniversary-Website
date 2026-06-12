import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/55 text-lightBlue-950 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/75 dark:border-lightBlue-200/20 dark:bg-lightBlue-900/20 dark:text-lightBlue-50 sm:right-6 sm:top-6"
      aria-label="Toggle romantic theme"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
