import { useEffect, useState } from 'react'

const NewYearMessage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`text-center space-y-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Year display */}
      <div className="space-y-4">
        <div className="text-8xl md:text-9xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            2026
          </span>
        </div>
        
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Main message */}
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-wide">
          Happy New Year
        </h1>
        
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-gray-300 text-lg font-light leading-relaxed">
            May this year bring you joy, success, and unforgettable moments
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pt-8 border-t border-gray-800/50">
        <div className="inline-flex items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <span className="text-sm">New Beginnings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Fresh Opportunities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
            <span className="text-sm">Endless Joy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewYearMessage