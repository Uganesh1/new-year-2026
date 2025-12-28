import { useState, useEffect } from 'react'

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3)
  const [animate, setAnimate] = useState('enter')
  const [previousNumbers, setPreviousNumbers] = useState([])

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => {
        onComplete()
      }, 800)
      return
    }

    const timer = setTimeout(() => {
      setAnimate('exit')
      setTimeout(() => {
        setPreviousNumbers(prev => [...prev, count])
        setCount(prev => prev - 1)
        setAnimate('enter')
      }, 400)
    }, 1200)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  // Visual pulse effect
  useEffect(() => {
    if (animate === 'enter') {
      const interval = setInterval(() => {
        setAnimate('pulse')
        setTimeout(() => setAnimate('enter'), 200)
      }, 400)
      return () => clearInterval(interval)
    }
  }, [animate])

  const getNumberStyle = () => {
    switch(animate) {
      case 'enter':
        return 'animate-zoom-in'
      case 'exit':
        return 'animate-zoom-out'
      case 'pulse':
        return 'animate-pulse-strong'
      default:
        return ''
    }
  }

  return (
    <div className="text-center space-y-12">
      {/* Animated rings around countdown */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-48 h-48 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute w-64 h-64 border border-purple-500/20 rounded-full animate-spin-slow-reverse"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-gray-300 text-xl font-light tracking-widest uppercase mb-3 animate-fade-in-up">
              Countdown Begins
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          </div>

          {/* Main countdown number with dramatic animation */}
          <div className="relative h-48 flex items-center justify-center">
            <div className={`text-9xl font-bold ${getNumberStyle()}`}>
              <span className={`
                bg-gradient-to-r 
                ${count === 3 ? 'from-blue-400 to-cyan-400' : 
                  count === 2 ? 'from-purple-400 to-pink-400' : 
                  'from-orange-400 to-yellow-400'}
                bg-clip-text text-transparent
                drop-shadow-lg
              `}>
                {count}
              </span>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl rounded-full"></div>
          </div>

          {/* Countdown text */}
          <div className="mt-8 space-y-3">
            <p className="text-gray-400 text-lg animate-pulse">
              {count === 3 ? 'Three...' : count === 2 ? 'Two...' : 'One...'}
            </p>
            
            {/* Progress dots with animation */}
            <div className="flex justify-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`relative w-4 h-4 rounded-full transition-all duration-500 transform ${
                    num <= count 
                      ? 'scale-100 animate-pulse-dot' 
                      : 'scale-75'
                  } ${
                    num <= count 
                      ? (count === 3 ? 'bg-blue-500' : 
                         count === 2 ? 'bg-purple-500' : 
                         'bg-orange-500')
                      : 'bg-gray-700'
                  }`}
                >
                  {num <= count && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{animationDelay: `${num * 100}ms`}}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Previous numbers trail */}
      <div className="flex justify-center space-x-4 opacity-50">
        {previousNumbers.map((num, index) => (
          <div 
            key={index}
            className="text-4xl font-bold text-gray-600 animate-fade-out-trail"
            style={{animationDelay: `${index * 100}ms`}}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Countdown