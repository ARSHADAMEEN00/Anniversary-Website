/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cormorant Garamond', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Dancing Script', 'cursive'],
        garamond: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        // Legacy blue colors (kept for any remaining references)
        lightBlue: {
          50: '#e1f5fe',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fc3f7',
          400: '#29b6f6',
          500: '#03a9f4',
          600: '#039be5',
          700: '#0288d1',
          800: '#0277bd',
          900: '#01579b',
          950: '#06324a',
        },
        // Journal palette
        ivory: '#FDF8F2',
        cream: '#F5EDE0',
        parchment: '#EDE0CC',
        espresso: '#2C1A0E',
        'warm-dark': '#3D2314',
        rose: {
          DEFAULT: '#C4917A',
          light: '#E8C5B5',
        },
        sage: {
          DEFAULT: '#8FAE8B',
          light: '#C5D9C3',
        },
        gold: {
          DEFAULT: '#C9963A',
          light: '#E8C97A',
        },
        blush: '#F2D9CE',
        // Legacy
        ice: '#f4fbfe',
        ocean: '#075985',
        midnight: '#031c2b',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(196, 145, 122, 0.32)',
        'soft-rose': '0 18px 60px rgba(196, 145, 122, 0.24)',
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
