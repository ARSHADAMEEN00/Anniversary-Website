/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      colors: {
        rosewood: '#7f1d45',
        blush: '#fff1f7',
        champagne: '#f9e6c9',
        lavenderGlow: '#e9d5ff',
        gold: '#d6a852',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(244, 114, 182, 0.32)',
        gold: '0 18px 60px rgba(214, 168, 82, 0.28)',
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        sparkle: 'sparkle 2.8s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotate(5deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(28px, -34px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 28px) scale(0.96)' },
        },
      },
    },
  },
  plugins: [],
};
