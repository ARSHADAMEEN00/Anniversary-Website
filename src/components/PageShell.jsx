import { motion } from 'framer-motion';

export default function PageShell({ children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(165deg, #F5EDE0 0%, #FDF8F2 55%, #F2D9CE 100%)',
        minHeight: '100vh',
        fontFamily: "'Cormorant Garamond', serif",
        color: '#2C1A0E',
      }}
      className={`mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:flex md:h-screen md:items-center md:overflow-hidden md:py-0 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}
