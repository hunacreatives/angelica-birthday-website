/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          blush: {
            50: '#FFF5F5',
            100: '#F8D7DA',
            200: '#F4A6A3',
            300: '#E8A0A0',
            400: '#C9A0A0',
          },
          peach: {
            50: '#FFF9F5',
            100: '#FCEADE',
            200: '#F5D5C8',
          },
          cream: {
            DEFAULT: '#FAF6F1',
            light: '#FFFDF9',
          },
          sage: {
            DEFAULT: '#B8C5B0',
            light: '#D4DED0',
          },
          charcoal: {
            DEFAULT: '#3A3A3A',
            light: '#4A4A4A',
            medium: '#5A5A5A',
          },
        },
        fontFamily: {
          script: ['"Homemade Apple"', 'cursive'],
          handwritten: ['"Caveat"', 'cursive'],
          serif: ['"Playfair Display"', 'serif'],
          sans: ['Montserrat', 'sans-serif'],
        },
        borderRadius: {
          polaroid: '4px',
        },
        boxShadow: {
          polaroid: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          soft: '0 4px 24px rgba(0, 0, 0, 0.08)',
          card: '0 8px 40px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'float-slow': 'float 8s ease-in-out infinite',
          'float-slower': 'float 10s ease-in-out infinite',
          'float-very-slow': 'floatVerySlow 15s ease-in-out infinite',
          'float-very-slow-reverse': 'floatVerySlowReverse 18s ease-in-out infinite',
          'float-slow-drift': 'floatSlowDrift 12s ease-in-out infinite',
          'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
          'fade-in-slow': 'fadeInSlow 2s ease-out forwards',
          'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
          'glow-pulse': 'glowPulse 8s ease-in-out infinite',
          'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
          'spin-slow': 'spin 20s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(3deg)' },
          },
          floatVerySlow: {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(15px, -10px) scale(1.02)' },
            '66%': { transform: 'translate(-10px, 8px) scale(0.98)' },
          },
          floatVerySlowReverse: {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(-12px, 10px) scale(1.01)' },
            '66%': { transform: 'translate(8px, -6px) scale(0.99)' },
          },
          floatSlowDrift: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(20px, -15px)' },
          },
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(25px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeInSlow: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slowZoom: {
            '0%': { transform: 'scale(1.02)' },
            '100%': { transform: 'scale(1.08)' },
          },
          glowPulse: {
            '0%, 100%': { opacity: '0.6', transform: 'translate(-50%, -55%) scale(1)' },
            '50%': { opacity: '1', transform: 'translate(-50%, -55%) scale(1.1)' },
          },
          pulseSoft: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.03)' },
          },
        },
      },
    },
    plugins: [],
  }