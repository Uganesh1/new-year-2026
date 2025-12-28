import { useState, useEffect } from 'react'

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3)
  const [animate, setAnimate] = useState('enter')
  const [previousNumbers, setPreviousNumbers] = useState([])

  useEffect(() => {
    if (count === 0) {
      setAnimate('exit')
      setTimeout(() => {
        onComplete()
      }, 600)
      return
    }

    const timer = setTimeout(() => {
      setAnimate('exit')
      setTimeout(() => {
        setPreviousNumbers(prev => [...prev.slice(-2), count])
        setCount(prev => prev - 1)
        setAnimate('enter')
      }, 400)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  const getNumberStyle = () => {
    switch(animate) {
      case 'enter':
        return 'animate-zoom-in'
      case 'exit':
        return 'animate-zoom-out'
      default:
        return ''
    }
  }

  return (
    <div className="text-center space-y-12">
      {/* Countdown heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-300 uppercase tracking-widest mb-3">
          Countdown to 2026
        </h2>
        <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Main countdown number */}
      <div className="relative h-64 flex items-center justify-center">
        <div className={`text-9xl font-bold ${getNumberStyle()}`}>
          <span className={`
            ${count === 3 ? 'text-blue-400' : 
              count === 2 ? 'text-purple-400' : 
              'text-pink-400'}
            drop-shadow-lg
          `}>
            {count}
          </span>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                num <= count 
                  ? (count === 3 ? 'bg-blue-500' : 
                     count === 2 ? 'bg-purple-500' : 
                     'bg-pink-500')
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-400 text-lg font-light">
          {count > 0 ? `Get ready... ${count}` : 'Happy New Year 2026!'}
        </p>
      </div>

      {/* Previous numbers trail */}
      <div className="flex justify-center space-x-4 opacity-50">
        {previousNumbers.map((num, index) => (
          <div 
            key={index}
            className="text-4xl font-bold text-gray-600"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Countdown