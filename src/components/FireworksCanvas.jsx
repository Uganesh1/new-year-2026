import { useEffect, useRef } from 'react'
import Fireworks from 'fireworks-js'

const FireworksCanvas = () => {
  const containerRef = useRef(null)
  const fireworksRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const fireworks = new Fireworks(containerRef.current, {
      autoresize: true,
      opacity: 0.8,
      acceleration: 1.05,
      friction: 0.96,
      gravity: 1.2,
      particles: 120, // Increased particles
      traceLength: 4,
      traceSpeed: 12,
      explosion: 8, // More explosion particles
      intensity: 50, // Increased intensity
      flickering: 80, // More flickering
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 15, // Faster fireworks
        max: 40
      },
      rocketsPoint: {
        min: 0,
        max: 100
      },
      lineWidth: {
        explosion: {
          min: 2,
          max: 4
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 60,
        max: 100 // Brighter
      },
      decay: {
        min: 0.01,
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
    })

    fireworks.start()
    fireworksRef.current = fireworks

    // Add more fireworks over time
    const intensityInterval = setInterval(() => {
      if (fireworksRef.current) {
        // Randomly change intensity for variety
        fireworksRef.current.setOptions({
          intensity: Math.random() * 30 + 40,
          hue: {
            min: Math.random() * 360,
            max: Math.random() * 360
          }
        })
      }
    }, 3000)

    return () => {
      clearInterval(intensityInterval)
      if (fireworksRef.current) {
        fireworksRef.current.stop()
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      />
      {/* Additional canvas for sparkle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </>
  )
}

export default FireworksCanvas