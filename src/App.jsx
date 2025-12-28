import { useState } from 'react'
import Countdown from './components/Countdown'
import NewYearMessage from './components/NewYearMessage'
import SideFireworks from './components/SideFireworks'
import Starfield from './components/Starfield'

function App() {
  const [phase, setPhase] = useState('countdown')
  const [showSideFireworks, setShowSideFireworks] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const handleCountdownComplete = () => {
    setTransitioning(true)
    setTimeout(() => {
      setPhase('newyear')
      setShowSideFireworks(true)
      setTransitioning(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative transition-colors duration-1000">
      {/* Smooth background transition */}
            <Starfield />
      <div className={`absolute inset-0 transition-all duration-1000 ${
        phase === 'newyear' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Transition overlay */}
      <div className={`absolute inset-0 z-30 bg-black transition-opacity duration-1000 ${
        transitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}></div>

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