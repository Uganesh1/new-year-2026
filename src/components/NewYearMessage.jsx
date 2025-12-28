import { useEffect, useState } from 'react'
import CircularSparkles from './CircularSparkles'

const NewYearMessage = () => {
  const [animate, setAnimate] = useState(false)
  const [digitsAnimated, setDigitsAnimated] = useState([false, false, false, false])

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300)
    
    // Animate each digit sequentially
    digitsAnimated.forEach((_, index) => {
      setTimeout(() => {
        setDigitsAnimated(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, 300 + (index * 150))
    })
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Message at the top */}
      <div className={`text-center transition-all duration-700 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Happy New Year!
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
          Welcome to 2026 - A year of new beginnings
        </p>
      </div>

      {/* Circular fireworks container */}
      <div className="relative h-[500px] flex items-center justify-center">
        <CircularSparkles />
        
        {/* 2026 numbers in center */}
        <div className="relative z-20">
          <div className="flex justify-center items-center space-x-4 md:space-x-8">
            {['2', '0', '2', '6'].map((digit, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-500 ${
                  digitsAnimated[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: digitsAnimated[index] 
                    ? `perspective(1000px) rotateY(${index % 2 === 0 ? '-5deg' : '5deg'})`
                    : 'perspective(1000px) rotateY(90deg) scale(0)',
                }}
              >
                {/* Main digit */}
                <div className="text-8xl md:text-9xl font-bold">
                  <span className={`
                    ${index === 0 ? 'text-blue-500' : 
                      index === 1 ? 'text-red-500' : 
                      index === 2 ? 'text-emerald-500' : 
                      'text-amber-500'}
                  `}>
                    {digit}
                  </span>
                </div>
                
                {/* Sharp shadow for 3D effect */}
                <div 
                  className="absolute inset-0 text-8xl md:text-9xl font-bold"
                  style={{
                    transform: 'translate(4px, 4px)',
                    opacity: 0.3,
                    zIndex: -1,
                  }}
                >
                  <span className={`
                    ${index === 0 ? 'text-blue-800' : 
                      index === 1 ? 'text-red-800' : 
                      index === 2 ? 'text-emerald-800' : 
                      'text-amber-800'}
                  `}>
                    {digit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional message below */}
      <div className={`text-center space-y-8  transition-all duration-500 delay-1000 ${
        digitsAnimated[3] ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            May this year bring you joy, success, and unforgettable moments
          </p>
          
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Prosperity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-300">Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-300">Joy</span>
            </div>
          </div>
        </div>

        {/* Celebration emojis */}
        <div className="flex justify-center space-x-6 pt-8">
          {['🎉', '✨', '🎊', '🌟', '🥂'].map((emoji, index) => (
            <div
              key={index}
              className="text-3xl"
              style={{
                animation: `bounce 2s infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Final message */}
        <div className="pt-8 border-t border-gray-700">
          <p className="text-gray-500">
            Welcome to an amazing 2026
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewYearMessage