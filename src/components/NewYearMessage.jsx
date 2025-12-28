import { useEffect, useState } from 'react'

const NewYearMessage = () => {
  const [animate, setAnimate] = useState(false)
  const [digitsAnimated, setDigitsAnimated] = useState([false, false, false, false])
  const [digitsPositioned, setDigitsPositioned] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300)
    
    // Animate each digit from different directions
    digitsAnimated.forEach((_, index) => {
      setTimeout(() => {
        setDigitsAnimated(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, 400 + (index * 300))
    })

    // Once all digits are animated, bring them to center position
    setTimeout(() => {
      setDigitsPositioned(true)
    }, 2000)

    // Subtle float animation after positioning
    const floatAnimation = () => {
      // We'll use CSS animations instead of JavaScript for better performance
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Get direction animation for each digit
  const getDigitStyle = (index) => {
    if (!digitsAnimated[index]) {
      // Starting positions outside view
      switch(index) {
        case 0: return { // Top digit (2)
          transform: 'translateY(-200px) scale(0.5)',
          opacity: 0
        }
        case 1: return { // Right digit (0)
          transform: 'translateX(200px) scale(0.5)',
          opacity: 0
        }
        case 2: return { // Bottom digit (2)
          transform: 'translateY(200px) scale(0.5)',
          opacity: 0
        }
        case 3: return { // Left digit (6)
          transform: 'translateX(-200px) scale(0.5)',
          opacity: 0
        }
        default: return {}
      }
    }
    
    if (!digitsPositioned) {
      // Moving to assembly position
      switch(index) {
        case 0: return { // Top to center
          transform: 'translateY(0) scale(1)',
          opacity: 1
        }
        case 1: return { // Right to center
          transform: 'translateX(0) scale(1)',
          opacity: 1
        }
        case 2: return { // Bottom to center
          transform: 'translateY(0) scale(1)',
          opacity: 1
        }
        case 3: return { // Left to center
          transform: 'translateX(0) scale(1)',
          opacity: 1
        }
        default: return {}
      }
    }
    
    // Final positioned state with subtle float
    return {
      transform: `translateY(${Math.sin(Date.now() * 0.001 + index) * 3}px)`,
      opacity: 1
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Message at the top */}
      <div className={`text-center transition-all duration-800 ease-out ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-smooth-fade">
          Happy New Year!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto font-light animate-smooth-fade delay-150">
          Welcome to 2026
        </p>
      </div>

      {/* Main 2026 container */}
      <div className="relative h-[350px] w-full flex items-center justify-center overflow-hidden">
        {/* Assembly lines animation */}
 

        {/* 2026 numbers assembly animation */}
        <div className="relative z-20">
          <div className="flex justify-center items-center space-x-2 md:space-x-4">
            {['2', '0', '2', '6'].map((digit, index) => {
             const colors = [
  'text-blue-500',
  'text-purple-500',
  'text-emerald-500',
  'text-orange-500',
]
              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    ...getDigitStyle(index),
                    transition: digitsPositioned 
                      ? 'transform 0.3s ease-out' 
                      : 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.3}s`
                  }}
                >
                  {/* Main digit with impact effect */}
                  <div className="relative">
                    {/* Impact shadow */}
                    <div 
                      className={`absolute inset-0 text-7xl md:text-8xl font-bold ${
                        digitsAnimated[index] ? 'animate-impact-glow' : ''
                      }`}
                      style={{
                        opacity: 0,
                        animationDelay: `${400 + index * 300}ms`
                      }}  
                    >
                     <span className={colors[index] || 'text-amber-500'}>{digit}</span>
                    </div>
                    
                    {/* Main digit */}
                    <div 
                      className="text-7xl md:text-8xl font-bold relative transition-all duration-300"
                      style={{
                        textShadow: digitsPositioned 
                          ? `0 0 20px ${index === 0 ? 'rgba(59, 130, 246, 0.6)' : 
                            index === 1 ? 'rgba(139, 92, 246, 0.6)' : 
                            index === 2 ? 'rgba(16, 185, 129, 0.6)' : 
                            'rgba(245, 158, 11, 0.6)'}`
                          : 'none',
                        transform: digitsPositioned ? 'scale(1)' : 'scale(0.9)',
                      }}
                    >
                      <span className={colors[index] || 'text-amber-500'}>
                        {digit}
                      </span>
                    </div>

                    {/* Direction indicator */}
                    {!digitsPositioned && digitsAnimated[index] && (
                      <div className={`absolute w-6 h-6 border-t-2 border-l-2 border-${colors[index]} transform ${
                        index === 0 ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-full rotate-45' :
                        index === 1 ? 'right-0 top-1/2 translate-x-full -translate-y-1/2 -rotate-45' :
                        index === 2 ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full -rotate-135' :
                        'left-0 top-1/2 -translate-x-full -translate-y-1/2 rotate-135'
                      } animate-direction-arrow`} />
                    )}
                  </div>
                  
                  {/* Assembly trail effect */}
                  {!digitsPositioned && digitsAnimated[index] && (
                    <div 
                      className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-current to-transparent"
                      style={{
                        ...(index === 0 ? { top: '-100px', left: '50%', transform: 'translateX(-50%)' } :
                          index === 1 ? { right: '-100px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' } :
                          index === 2 ? { bottom: '-100px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' } :
                          { left: '-100px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' }),
                        animation: 'trail-fade 1s ease-out'
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Center assembly effect */}
          {digitsPositioned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-48 h-48 rounded-full animate-assembly-pulse"></div>
              <div className="absolute w-32 h-32 rounded-full animate-assembly-pulse-delay"></div>
            </div>
          )}
        </div>

        {/* Assembly completion particles */}
        {digitsPositioned && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180)
              const distance = 120
              
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-completion-particle"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * distance}px)`,
                    top: `calc(50% + ${Math.sin(angle) * distance}px)`,
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i % 4],
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Bottom message - appears after assembly */}
      <div className={`text-center transition-all duration-700 delay-2000 ${
        digitsPositioned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light animate-final-text-reveal">
            May this year bring you endless joy and remarkable success
          </p>
          
          {/* Assembly complete indicator */}
          <div className="relative mx-auto w-48 h-1 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full animate-final-line-expand"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewYearMessage