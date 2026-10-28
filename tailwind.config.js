/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      colors: {
        clay: {
          50: '#FBF1ED',
          100: '#F5DDD4',
          200: '#E9B9A8',
          300: '#DB937B',
          400: '#CE7457',
          500: '#C2593F',
          600: '#A84630',
          700: '#8A3825',
          800: '#6E2D1F',
          900: '#52241A',
        },
        amber: {
          50: '#FDF6E3',
          100: '#FAE9C0',
          200: '#F4D17F',
          300: '#EDBA4A',
          400: '#E5A93B',
          500: '#D49426',
          600: '#B2781B',
          700: '#8E5E18',
          800: '#6E4716',
          900: '#523412',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F7F2E9',
          200: '#EDE5D6',
          300: '#E0D4BF',
          400: '#CDBBA0',
          500: '#B8A582',
        },
        slate2: {
          50: '#F4F5F6',
          100: '#E4E6E9',
          200: '#C9CDD3',
          300: '#A5ABB5',
          400: '#7C8492',
          500: '#5C6573',
          600: '#424A57',
          700: '#333A45',
          800: '#262C35',
          900: '#1C2128',
        },
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.25)', opacity: '0' },
          '100%': { transform: 'scale(1.25)', opacity: '0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bubbleIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scanline: {
          '0%': { top: '0%' },
          '50%': { top: 'calc(100% - 4px)' },
          '100%': { top: '0%' },
        },
        gaugeFill: {
          '0%': { strokeDashoffset: 'var(--gauge-c)' },
          '100%': { strokeDashoffset: 'var(--gauge-offset)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.215,0.61,0.355,1) infinite',
        floatUp: 'floatUp 0.4s ease-out both',
        bubbleIn: 'bubbleIn 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
