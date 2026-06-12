import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppRoutes from './routes/AppRoutes.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import BackgroundAura from './components/BackgroundAura.jsx';
import FloatingHearts from './components/FloatingHearts.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useLocalStorage('renewal-theme', 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-ice text-lightBlue-950 transition-colors duration-500 dark:bg-midnight dark:text-lightBlue-50">
      <BackgroundAura />
      <FloatingHearts />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <AppRoutes />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
