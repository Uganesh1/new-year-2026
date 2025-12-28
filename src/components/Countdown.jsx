import { useState, useEffect } from 'react'

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3)
  const [animate, setAnimate] = useState('enter')
  const [previousNumbers, setPreviousNumbers] = useState([])
  const [pulseGlow, setPulseGlow] = useState(0)

  useEffect(() => {
    if (count === 0) {
      setAnimate('final-exit')
      setTimeout(() => {
        onComplete()
      }, 800)
      return
    }

    const timer = setTimeout(() => {
      setAnimate('exit')
      setTimeout(() => {
        setPreviousNumbers(prev => [...prev.slice(-1), count])
        setCount(prev => prev - 1)
        setAnimate('enter')
        setPulseGlow(0)
      }, 400)
    }, 1200)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  // Pulse glow animation
  useEffect(() => {
    if (animate === 'enter') {
      const interval = setInterval(() => {
        setPulseGlow(prev => (prev + 0.1) % 1)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [animate])

  const getNumberStyle = () => {
    switch(animate) {
      case 'enter':
        return 'animate-countdown-enter'
      case 'exit':
        return 'animate-countdown-exit'
      case 'final-exit':
        return 'animate-countdown-final'
      default:
        return ''
    }
  }

  const getGlowStyle = () => {
    const intensity = Math.sin(pulseGlow * Math.PI * 2) * 0.3 + 0.7
    
    if (count === 3) {
      return {
        boxShadow: `0 0 ${30 + intensity * 50}px ${10 + intensity * 20}px rgba(59, 130, 246, 0.4)`,
        textShadow: `0 0 ${10 + intensity * 20}px rgba(59, 130, 246, 0.8)`
      }
    } else if (count === 2) {
      return {
        boxShadow: `0 0 ${30 + intensity * 50}px ${10 + intensity * 20}px rgba(139, 92, 246, 0.4)`,
        textShadow: `0 0 ${10 + intensity * 20}px rgba(139, 92, 246, 0.8)`
      }
    } else {
      return {
        boxShadow: `0 0 ${30 + intensity * 50}px ${10 + intensity * 20}px rgba(236, 72, 153, 0.4)`,
        textShadow: `0 0 ${10 + intensity * 20}px rgba(236, 72, 153, 0.8)`
      }
    }
  }

  return (
    <div className="text-center space-y-12">
      {/* Animated countdown heading */}
      <div className="mb-12 animate-slide-in-down">
        <h2 className="text-3xl font-light text-gray-300 uppercase tracking-widest mb-4">
          Get Ready For 2026
        </h2>
        <div className="relative w-48 h-1 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-expand-delay"></div>
        </div>
      </div>

      {/* Main countdown number with enhanced effects */}
      <div className="relative h-80 flex items-center justify-center">
        {/* Background rings */}
        <div className="absolute w-64 h-64 border-2 border-white/10 rounded-full animate-spin-slow"></div>
        <div className="absolute w-72 h-72 border border-blue-500/20 rounded-full animate-spin-slow-reverse"></div>
        
        {/* Previous numbers trail with exit animation */}
        {previousNumbers.map((num, index) => (
          <div 
            key={index}
            className="absolute text-7xl font-bold text-gray-700 animate-trail-exit"
            style={{animationDelay: `${index * 100}ms`}}
          >
            {num}
          </div>
        ))}

        {/* Main countdown number */}
        <div className={`relative z-10 text-9xl font-bold ${getNumberStyle()}`}>
          <div 
            className="relative inline-block p-8 rounded-2xl"
            // style={getGlowStyle()}
          >
            <span className={`
              ${count === 3 ? 'text-blue-400' : 
                count === 2 ? 'text-purple-400' : 
                'text-pink-400'}
            `}>
              {count}
            </span>
            
            {/* Floating particles around the number */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180)
              const radius = 120
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-float-around"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    backgroundColor: count === 3 ? '#3b82f6' : 
                                  count === 2 ? '#8b5cf6' : 
                                  '#ec4899',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced progress indicators */}
      <div className="space-y-8">
        <div className="flex justify-center space-x-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="relative">
              <div
                className={`w-6 h-6 rounded-full transition-all duration-500 transform ${
                  num <= count 
                    ? (count === 3 ? 'bg-blue-500 scale-100' : 
                       count === 2 ? 'bg-purple-500 scale-100' : 
                       'bg-pink-500 scale-100')
                    : 'bg-gray-800 scale-75'
                }`}
              >
                {num <= count && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30"></div>
                )}
              </div>
              
              {/* Connecting lines */}
              {num < 3 && (
                <div className={`absolute top-1/2 left-full w-12 h-1 transform -translate-y-1/2 transition-all duration-500 ${
                  num < count ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-800'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Countdown text with typing effect */}
        <div className="h-8">
          <p className="text-xl text-gray-300 font-light animate-typing-countdown">
            {count === 3 ? 'Three... Get Ready!' : 
             count === 2 ? 'Two... Almost There!' : 
             count === 1 ? 'One... Here We Go!' : 
             'Happy New Year 2026!'}
          </p>
        </div>

        {/* Visual progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
            style={{ width: `${(3 - count) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow-delay"></div>
    </div>
  )
}

export default Countdown