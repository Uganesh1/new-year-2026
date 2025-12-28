import { useState, useEffect, useRef } from 'react'
import Countdown from './components/Countdown'
import NewYearMessage from './components/NewYearMessage'
import FireworksCanvas from './components/FireworksCanvas'

function App() {
  const [isCounting, setIsCounting] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const handleCountdownComplete = () => {
    setIsCounting(false)
    setShowMessage(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Fireworks canvas */}
      <FireworksCanvas />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <main className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto">
          <div className="w-full max-w-2xl">
            {isCounting ? (
              <Countdown onComplete={handleCountdownComplete} />
            ) : showMessage && (
              <NewYearMessage />
            )}
          </div>
        </main>

        <footer className="py-8 text-center">
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Wishing you a prosperous and joyful 2026
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App