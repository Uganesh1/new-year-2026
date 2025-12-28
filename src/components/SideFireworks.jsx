import { useEffect, useRef } from 'react'
import Fireworks from 'fireworks-js'

const SideFireworks = () => {
  const leftContainerRef = useRef(null)
  const rightContainerRef = useRef(null)

  useEffect(() => {
    // Common configuration for both sides - Festive New Year colors
    const commonConfig = {
      autoresize: true,
      opacity: 0.85,
      acceleration: 1.08,
      friction: 0.96,
      gravity: 0.9,
      particles: 70,
      traceLength: 3,
      traceSpeed: 12,
      explosion: 6,
      intensity: 40,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0, // Full spectrum for both sides
        max: 360
      },
      delay: {
        min: 25,
        max: 45
      },
      brightness: {
        min: 60,
        max: 85
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      },
      sound: {
        enable: false
      }
    }

    // Initialize left side fireworks (travel from left to right)
    if (leftContainerRef.current) {
      const leftFireworks = new Fireworks(leftContainerRef.current, {
        ...commonConfig,
        rocketsPoint: {
          min: 0, // Start from left edge
          max: 15 // Only left 15% of canvas
        },
        // Add some variation to left side
        particles: 65,
        intensity: 38
      })

      leftFireworks.start()
    }

    // Initialize right side fireworks (travel from right to left)
    if (rightContainerRef.current) {
      const rightFireworks = new Fireworks(rightContainerRef.current, {
        ...commonConfig,
        rocketsPoint: {
          min: 85, // Start from right edge
          max: 100 // Only right 15% of canvas
        },
        // Mirror the left side settings
        particles: 65,
        intensity: 38
      })

      rightFireworks.start()
    }

    // Optional: Change colors periodically for both sides
    const colorChangeInterval = setInterval(() => {
      if (leftContainerRef.current?._fireworks) {
        // Change to specific color themes periodically
        const themes = [
          { min: 0, max: 60 },   // Red to Yellow
          { min: 180, max: 240 }, // Blue to Cyan
          { min: 300, max: 360 }, // Magenta to Red
          { min: 120, max: 180 }, // Green to Cyan
          { min: 60, max: 120 },  // Yellow to Green
        ]
        const randomTheme = themes[Math.floor(Math.random() * themes.length)]
        
        leftContainerRef.current._fireworks.setOptions({
          hue: randomTheme
        })
      }
      if (rightContainerRef.current?._fireworks) {
        // Keep both sides synchronized
        const themes = [
          { min: 0, max: 60 },
          { min: 180, max: 240 },
          { min: 300, max: 360 },
          { min: 120, max: 180 },
          { min: 60, max: 120 },
        ]
        const randomTheme = themes[Math.floor(Math.random() * themes.length)]
        
        rightContainerRef.current._fireworks.setOptions({
          hue: randomTheme
        })
      }
    }, 4000) // Change colors every 4 seconds

    return () => {
      clearInterval(colorChangeInterval)
      // Note: Fireworks-js doesn't expose stop method directly on instance
      // We need to clear the canvas
      if (leftContainerRef.current) {
        const ctx = leftContainerRef.current.getContext('2d')
        ctx.clearRect(0, 0, leftContainerRef.current.width, leftContainerRef.current.height)
      }
      if (rightContainerRef.current) {
        const ctx = rightContainerRef.current.getContext('2d')
        ctx.clearRect(0, 0, rightContainerRef.current.width, rightContainerRef.current.height)
      }
    }
  }, [])

  return (
    <>
      {/* Left side fireworks canvas */}
      <canvas
        ref={leftContainerRef}
        className="absolute left-0 top-0 w-2/5 h-full pointer-events-none"
      />
      
      {/* Right side fireworks canvas */}
      <canvas
        ref={rightContainerRef}
        className="absolute right-0 top-0 w-2/5 h-full pointer-events-none"
      />
      
      {/* Gradient overlays for smoother edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent"></div>
      
      {/* Decorative floating particles on sides */}
      {Array.from({ length: 8 }).map((_, i) => {
        const isLeft = i % 2 === 0
        const top = 20 + (i * 10)
        const delay = i * 0.3
        const color = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
        
        return (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isLeft ? 'left-4' : 'right-4'}`}
            style={{
              top: `${top}%`,
              backgroundColor: color,
              animation: 'float-particle 4s ease-in-out infinite',
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </>
  )
}

export default SideFireworks