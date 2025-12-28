import { useState } from 'react'
import Countdown from './components/Countdown'
import NewYearMessage from './components/NewYearMessage'
import FireworksCanvas from './components/FireworksCanvas'
import Starfield from './components/Starfield'

function App() {
  const [phase, setPhase] = useState('countdown')
  const [showFireworks, setShowFireworks] = useState(false)

  const handleCountdownComplete = () => {
    setPhase('transition')
    setTimeout(() => {
      setPhase('newyear')
      setShowFireworks(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Animated starfield background */}
      <Starfield />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full animate-pulse-slow-delay blur-3xl"></div>
      
      {/* Transition overlay */}
      {phase === 'transition' && (
        <div className="absolute inset-0 bg-black z-20 animate-fade-to-white"></div>
      )}

      {/* Fireworks only show after countdown */}
      {showFireworks && <FireworksCanvas />}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <header className="absolute top-8 w-full px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-lg font-light tracking-widest text-gray-400 uppercase text-center">
              Welcome to the New Beginning
            </h1>
          </div>
        </header>
        
        <main className="flex-1 flex items-center justify-center w-full max-w-6xl mx-auto px-4">
          <div className="w-full max-w-4xl">
            {phase === 'countdown' && (
              <Countdown onComplete={handleCountdownComplete} />
            )}
            {phase === 'newyear' && (
              <NewYearMessage />
            )}
          </div>
        </main>

        <footer className="py-6 text-center">
          <p className="text-gray-500 text-sm font-light tracking-wide animate-fade-in-up">
            Made with ❤️ for a wonderful 2026
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App