/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#96291c',
          hover: '#7d2218',
          darker: '#5c1912',
          light: '#b83d2e',
          '50': '#fdf4f3',
          '100': '#fce8e6',
          '200': '#f9d4d0',
          '300': '#f4b4ad',
          '400': '#ec887c',
          '500': '#e06455',
          '600': '#cc4536',
          '700': '#96291c',
          '800': '#7d2419',
          '900': '#69231a',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BD5A',
          dark: '#128C7E',
          light: '#DCF8C6',
        },
        neutral: {
          bg: '#FFFFFF',
          text: '#111827',
          muted: '#6B7280',
          border: '#E5E7EB',
          soft: '#F3F4F6',
          'soft-dark': '#E5E7EB',
        },
        dark: {
          DEFAULT: '#1a1a1d',
          section: '#161619',
          muted: '#9ca3af',
          border: '#374151',
        },
        // Editorial premium: fondos cálidos y terracota refinado
        warm: {
          50: '#faf8f6',
          100: '#f5f1ed',
          200: '#ebe4dc',
          300: '#ddd2c4',
          400: '#c4b5a0',
        },
        terracotta: {
          DEFAULT: '#96291c',
          light: '#b83d2e',
          muted: '#c45c4f',
          soft: '#fdf4f3',
          dark: '#7d2218',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        'nav': ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-montserrat)', 'sans-serif'],
        script: ['var(--font-script)', 'Georgia', 'cursive'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.875rem, 4vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 0 1px rgba(150, 41, 28, 0.08), 0 8px 24px -4px rgba(150, 41, 28, 0.12)',
        'glow-dark': '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px -4px rgba(0,0,0,0.4)',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
