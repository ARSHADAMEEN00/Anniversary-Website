import { motion } from 'framer-motion';
import { relationshipMoments } from '../data/couple.js';
import MemoryImage from './MemoryImage.jsx';

export default function MemoryGallery() {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/50 bg-white/30 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        className="flex w-max gap-3"
      >
        {[...relationshipMoments, ...relationshipMoments].map((moment, index) => (
          <div
            key={`${moment.id}-${index}`}
            className="w-36 shrink-0 overflow-hidden rounded-3xl bg-white/60 p-2 shadow-lg dark:bg-white/10 sm:w-44"
          >
            <MemoryImage moment={moment} className="aspect-[4/5] w-full" />
            <p className="mt-2 truncate px-1 text-xs font-bold text-rose-700 dark:text-pink-100">
              {moment.title}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
