import { useEffect, useRef } from 'react'
import Fireworks from 'fireworks-js'

const SideFireworks = () => {
  const leftContainerRef = useRef(null)
  const rightContainerRef = useRef(null)

  useEffect(() => {
    // Initialize left side fireworks (travel from left to right)
    if (leftContainerRef.current) {
      const leftFireworks = new Fireworks(leftContainerRef.current, {
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1,
        particles: 60,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 35,
        flickering: 40,
        lineStyle: 'round',
        hue: {
          min: 180, // Blue tones
          max: 240
        },
        delay: {
          min: 30,
          max: 50
        },
        rocketsPoint: {
          min: 0,
          max: 20 // Only left 20% of canvas
        },
        brightness: {
          min: 50,
          max: 70
        }
      })

      leftFireworks.start()
    }

    // Initialize right side fireworks (travel from right to left)
    if (rightContainerRef.current) {
      const rightFireworks = new Fireworks(rightContainerRef.current, {
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1,
        particles: 60,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 35,
        flickering: 40,
        lineStyle: 'round',
        hue: {
          min: 300, // Purple/pink tones
          max: 360
        },
        delay: {
          min: 40,
          max: 60
        },
        rocketsPoint: {
          min: 80,
          max: 100 // Only right 20% of canvas
        },
        brightness: {
          min: 50,
          max: 70
        }
      })

      rightFireworks.start()
    }
  }, [])

  return (
    <>
      {/* Left side fireworks canvas */}
      <canvas
        ref={leftContainerRef}
        className="absolute left-0 top-0 w-1/3 h-full pointer-events-none opacity-70"
      />
      
      {/* Right side fireworks canvas */}
      <canvas
        ref={rightContainerRef}
        className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-70"
      />
    </>
  )
}

export default SideFireworks