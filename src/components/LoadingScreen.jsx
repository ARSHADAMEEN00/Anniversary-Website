import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-30 grid place-items-center px-6"
    >
      <div className="glass max-w-sm rounded-[2rem] p-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-white/70 text-3xl shadow-glow dark:bg-white/10"
        >
          💌
        </motion.div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-pink-500 dark:text-pink-200">
          Portal Booting
        </p>
        <h1 className="mt-3 text-2xl font-black">Loading 1000 beautiful memories...</h1>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/50 dark:bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300"
          />
        </div>
      </div>
    </motion.section>
  );
}
