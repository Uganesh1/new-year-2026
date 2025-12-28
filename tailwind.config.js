/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'pulse-glow': 'pulseGlow 3s infinite',
        'sparkle-float': 'sparkleFloat 3s infinite',
        'float-random': 'floatRandom 6s ease-in-out infinite',
        'shooting-star': 'shootingStar 2s ease-out infinite',
        'expand-line': 'expandLine 1.5s ease-out',
        'expand-line-delay': 'expandLineDelay 2s ease-out',
        'pulse-text': 'pulseText 3s ease-in-out infinite',
        'typing': 'typing 3s steps(40, end) forwards',
        'bounce-rotate': 'bounceRotate 3s ease-in-out infinite',
        'float-border': 'floatBorder 2s ease-in-out infinite',
        'ping-slow': 'pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulseGlow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.9', filter: 'brightness(1.3)' }
        },
        'sparkleFloat': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.5' },
          '50%': { 
            transform: 'translate(-50%, -50%) scale(1.5)', 
            opacity: '1',
            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)'
          }
        },
        'floatRandom': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(10deg)' },
          '66%': { transform: 'translateY(10px) rotate(-5deg)' }
        },
        'shootingStar': {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: '0', width: '1px' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100px) translateY(100px)', opacity: '0', width: '50px' }
        },
        'expandLine': {
          '0%': { width: '0', opacity: '0', transform: 'scaleX(0)' },
          '100%': { width: '100%', opacity: '1', transform: 'scaleX(1)' }
        },
        'expandLineDelay': {
          '0%, 50%': { width: '0', opacity: '0', transform: 'scaleX(0)' },
          '100%': { width: '100%', opacity: '1', transform: 'scaleX(1)' }
        },
        'pulseText': {
          '0%, 100%': { opacity: '1', letterSpacing: 'normal' },
          '50%': { opacity: '0.8', letterSpacing: '2px' }
        },
        'typing': {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'bounceRotate': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(15deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-10deg)' }
        },
        'floatBorder': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { transform: 'translateY(-20px)', opacity: '1' }
        },
        'pingSlow': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(3)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}