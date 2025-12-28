/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s ease-in-out infinite',
        'pulse-delay': 'pulse 2s ease-in-out infinite 1s',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-slow-reverse': 'spin-slow-reverse 25s linear infinite',
        'shoot': 'shoot 1.5s linear infinite',
      },
      keyframes: {
        'pulse': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' }
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '70%, 100%': { transform: 'scale(3)', opacity: '0' }
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        'spin-slow-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' }
        },
        'shoot': {
          '0%': { transform: 'translate(-50%, -50%) rotate(var(--start-angle)) translateX(0)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) rotate(var(--end-angle)) translateX(200px)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}