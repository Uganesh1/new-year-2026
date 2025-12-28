import { useEffect, useRef } from 'react'
import Fireworks from 'fireworks-js'

const FireworksCanvas = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const fireworks = new Fireworks(containerRef.current, {
      autoresize: true,
      opacity: 0.4, // Reduced opacity for subtlety
      acceleration: 1.02,
      friction: 0.98,
      gravity: 1.5,
      particles: 40, // Reduced particle count
      traceLength: 2,
      traceSpeed: 8,
      explosion: 4,
      intensity: 20, // Reduced intensity
      flickering: 30,
      lineStyle: 'round',
      hue: {
        min: 180,
        max: 300
      },
      delay: {
        min: 40,
        max: 80
      },
      rocketsPoint: {
        min: 30,
        max: 70
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 2
        },
        trace: {
          min: 0.5,
          max: 1
        }
      },
      brightness: {
        min: 40,
        max: 60
      },
      decay: {
        min: 0.01,
        max: 0.02
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    })

    fireworks.start()

    return () => {
      fireworks.stop()
    }
  }, [])

  return (
    <canvas
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
    />
  )
}

export default FireworksCanvas