import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background: 'linear-gradient(165deg, #F5EDE0 0%, #FDF8F2 55%, #F2D9CE 100%)',
      }}
    >
      {/* Decorative corner border */}
      <div
        style={{
          position: 'absolute',
          top: 24, left: 24, right: 24, bottom: 24,
          border: '1px solid rgba(201,150,58,0.2)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 340,
          width: '100%',
          textAlign: 'center',
          background: 'rgba(253,248,242,0.88)',
          border: '1px solid rgba(201,150,58,0.3)',
          borderRadius: 4,
          padding: '40px 32px',
          boxShadow: '0 24px 70px rgba(44,26,14,0.12)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Animated heart icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            margin: '0 auto 24px',
            width: 64,
            height: 64,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #E8C5B5, #C4917A)',
            boxShadow: '0 12px 32px rgba(196,145,122,0.38)',
            fontSize: '1.8rem',
          }}
        >
          💌
        </motion.div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '0.9rem',
            color: '#C4917A',
            letterSpacing: '0.04em',
            marginBottom: 8,
            opacity: 0.9,
          }}
        >
          ✦ Our Anniversary Journal ✦
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#2C1A0E',
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          Loading 1000 beautiful memories...
        </h1>

        {/* Gold divider */}
        <div
          style={{
            width: 48,
            height: 1,
            background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
            margin: '16px auto',
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            height: 3,
            overflow: 'hidden',
            borderRadius: 999,
            background: 'rgba(196,145,122,0.15)',
          }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              height: '100%',
              width: '60%',
              borderRadius: 999,
              background: 'linear-gradient(to right, #E8C5B5, #C9963A, #C4917A)',
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9963A',
            marginTop: 16,
            opacity: 0.75,
          }}
        >
          Est. 2019
        </p>
      </div>
    </motion.section>
  );
}
