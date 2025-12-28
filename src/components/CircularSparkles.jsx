import { useEffect, useRef } from 'react'
import Fireworks from 'fireworks-js'

const CircularSparkles = () => {
  const canvasRef = useRef(null)
  const fireworksRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Get container dimensions for proper positioning
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.8 // 80% of the smaller dimension

    // Create fireworks instance
    const fireworks = new Fireworks(canvasRef.current, {
      autoresize: false,
      opacity: 0.9,
      acceleration: 1.08,
      friction: 0.95,
      gravity: 0.3, // Lower gravity for circular spread
      particles: 80, // Increased particles for better effect
      traceLength: 2,
      traceSpeed: 12,
      explosion: 8, // More explosion particles
      intensity: 45,
      flickering: 60,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360 // Full color spectrum
      },
      delay: {
        min: 25,
        max: 40 // Faster bursts
      },
      rocketsPoint: {
        min: 50, // Start from center
        max: 50
      },
      brightness: {
        min: 60,
        max: 90
      },
      decay: {
        min: 0.01,
        max: 0.025
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      },
      boundaries: {
        x: 50,
        y: 50,
        width: rect.width,
        height: rect.height,
        visible: false
      },
      sound: {
        enable: false
      }
    })

    // Custom explosion pattern for circular effect
    const originalCreateParticle = fireworks.createParticle
    fireworks.createParticle = function(x, y, hue) {
      // Convert coordinates to polar relative to center
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Only create particles within the circle radius
      if (distance <= radius) {
        return originalCreateParticle.call(this, x, y, hue)
      }
      return null
    }

    // Override the explosion to create circular patterns
    const originalExplode = fireworks.explode
    fireworks.explode = function(x, y, hue) {
      const particles = 36 // Number of particles in circle
      const explosionPower = 8
      
      for (let i = 0; i < particles; i++) {
        const angle = (i * 360 / particles) * (Math.PI / 180)
        const speed = 5 + Math.random() * 3
        
        // Calculate position within circle
        const offsetX = Math.cos(angle) * radius * 0.8
        const offsetY = Math.sin(angle) * radius * 0.8
        
        // Create particle at calculated position
        const particleX = centerX + offsetX
        const particleY = centerY + offsetY
        
        // Add velocity outward from center
        const particle = originalCreateParticle.call(this, particleX, particleY, hue)
        if (particle) {
          particle.vx = Math.cos(angle) * speed
          particle.vy = Math.sin(angle) * speed
        }
      }
    }

    fireworks.start()
    fireworksRef.current = fireworks

    // Add variety by changing colors periodically
    const colorInterval = setInterval(() => {
      if (fireworksRef.current) {
        const hueMin = Math.floor(Math.random() * 360)
        const hueMax = (hueMin + 120) % 360
        fireworksRef.current.setOptions({
          hue: { min: hueMin, max: hueMax },
          intensity: 40 + Math.random() * 20
        })
      }
    }, 3000)

    return () => {
      clearInterval(colorInterval)
      if (fireworksRef.current) {
        fireworksRef.current.stop()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: 'circle(50% at 50% 50%)', // Perfect circular clip
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      {/* Decorative rings around the circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute w-96 h-96 border-2 border-blue-500/30 rounded-full animate-pulse"></div>
          
          {/* Middle ring */}
          <div className="absolute w-80 h-80 border border-white/20 rounded-full animate-spin-slow"></div>
          
          {/* Inner ring */}
          <div className="absolute w-64 h-64 border border-purple-500/30 rounded-full animate-spin-slow-reverse"></div>
        </div>
      </div>
      
      {/* Center point indicator */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Pulsing center dot */}
          <div className="w-4 h-4 bg-white rounded-full animate-ping-slow"></div>
          <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Radial lines for visual reference */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180)
        const length = 180
        
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-px h-24 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}rad) translateY(-${length/2}px)`,
              transformOrigin: 'center',
              opacity: 0.3,
            }}
          />
        )
      })}
      
      {/* Static sparkles on the ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15) * (Math.PI / 180)
        const distance = 180
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const size = 1 + Math.random() * 2
        const color = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
          />
        )
      })}
    </div>
  )
}

export default CircularSparkles