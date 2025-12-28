import { useState } from 'react'
import Countdown from './components/Countdown'
import NewYearMessage from './components/NewYearMessage'
import SideFireworks from './components/SideFireworks'
import Starfield from './components/Starfield'

function App() {
  const [phase, setPhase] = useState('countdown')
  const [showSideFireworks, setShowSideFireworks] = useState(false)

  const handleCountdownComplete = () => {
    setPhase('transition')
    setTimeout(() => {
      setPhase('newyear')
      setShowSideFireworks(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Animated starfield background */}
      <Starfield />
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Transition overlay - clean white flash */}
      {phase === 'transition' && (
        <div className="absolute inset-0 bg-white z-20 animate-flash"></div>
      )}

      {/* Side fireworks only show after countdown */}
      {showSideFireworks && <SideFireworks />}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {phase === 'countdown' ? (
          <Countdown onComplete={handleCountdownComplete} />
        ) : (
          <NewYearMessage />
        )}
      </div>
    </div>
  )
}

export default App