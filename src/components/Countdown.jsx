import { useState, useEffect } from 'react'

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3)
  const [isVisible, setIsVisible] = useState(true)
  const [previousCount, setPreviousCount] = useState(null)

  useEffect(() => {
    if (count === 0) {
      setIsVisible(false)
      setTimeout(() => {
        onComplete()
      }, 600)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        setPreviousCount(count)
        setCount(prev => prev - 1)
        setIsVisible(true)
      }, 300)
    }, 1200)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  return (
    <div className="text-center space-y-8">
      <div className="mb-12">
        <h2 className="text-gray-400 text-lg font-light uppercase tracking-widest mb-2">
          Countdown to 2026
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        {/* Previous number fading out */}
        {previousCount && !isVisible && (
          <div className="absolute text-8xl md:text-9xl font-bold text-gray-800 animate-fade-out">
            {previousCount}
          </div>
        )}
        
        {/* Current number */}
        {isVisible && (
          <div className={`text-8xl md:text-9xl font-bold text-white animate-fade-in`}>
            {count}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-3">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                num <= count 
                  ? 'bg-white scale-100' 
                  : 'bg-gray-700 scale-75'
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-500 text-sm font-light">
          {count > 0 ? `Get ready... ${count}` : 'Happy New Year!'}
        </p>
      </div>
    </div>
  )
}

export default Countdown