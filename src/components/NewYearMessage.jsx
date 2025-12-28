import { useEffect, useState } from 'react'

const NewYearMessage = () => {
  const [animate, setAnimate] = useState(false)
  const [textRevealed, setTextRevealed] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300)
    setTimeout(() => setTextRevealed(true), 800)
  }, [])

  // Confetti particles
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['blue', 'purple', 'pink', 'orange', 'cyan'][Math.floor(Math.random() * 5)]
  }))

  return (
    <div className="relative">
      {/* Confetti effect */}
      <div className="absolute inset-0 overflow-hidden">
        {confetti.map((item) => (
          <div
            key={item.id}
            className={`absolute w-2 h-2 rounded-full bg-${item.color}-500 animate-confetti`}
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              top: '-20px'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center space-y-12 transition-all duration-1000 ${
        animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Year display with dramatic entrance */}
        <div className="relative">
          {/* Glow rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-ping-slow blur-xl"></div>
          </div>
          
          {/* Year number */}
          <div className="relative">
            <h1 className={`text-8xl md:text-9xl font-bold tracking-tight transition-all duration-1000 ${
              textRevealed ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                2026
              </span>
            </h1>
            
            {/* Subtle underline */}
            <div className="w-48 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-4 animate-expand"></div>
          </div>
        </div>

        {/* Welcome message */}
        <div className={`space-y-8 transition-all duration-1000 delay-300 ${
          textRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 animate-typing">
              Happy New Year!
            </h2>
            
            {/* Animated text reveal */}
            <div className="max-w-xl mx-auto space-y-4">
              <p className="text-xl text-gray-300 font-light leading-relaxed animate-fade-in-up delay-500">
                A fresh beginning, a new chapter
              </p>
              <p className="text-lg text-gray-400 font-light leading-relaxed animate-fade-in-up delay-700">
                May this year bring you endless joy, success in all endeavors, and beautiful memories to cherish
              </p>
            </div>
          </div>

         

          {/* Animated border decoration */}
          <div className="relative pt-8 border-t border-gray-800/30">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              <span className="flex items-center space-x-2 animate-fade-in delay-1000">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span>New Opportunities</span>
              </span>
              <span className="flex items-center space-x-2 animate-fade-in delay-1200">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Growth & Success</span>
              </span>
              <span className="flex items-center space-x-2 animate-fade-in delay-1400">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></div>
                <span>Joy & Happiness</span>
              </span>
            </div>
          </div>
        </div>

        {/* Floating celebration elements */}
        <div className="absolute top-10 left-10 text-2xl animate-float">✨</div>
        <div className="absolute top-20 right-16 text-2xl animate-float-delay">🌟</div>
        <div className="absolute bottom-20 left-20 text-2xl animate-float-delay-2">🎊</div>
        <div className="absolute bottom-10 right-10 text-2xl animate-float">🎉</div>
      </div>
    </div>
  )
}

export default NewYearMessage