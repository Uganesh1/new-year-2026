import { useEffect, useState } from 'react'

const CircularSparkles = () => {
  const [sparkles, setSparkles] = useState([])
  const [pulsePhase, setPulsePhase] = useState(0)

  useEffect(() => {
    // Create initial sparkles in a circle pattern with multiple layers
    const initialSparkles = Array.from({ length: 40 }, (_, i) => {
      const angle = (i * 9) * (Math.PI / 180) // Convert to radians
      const radius = 200 + Math.random() * 30 // Main circle with variation
      const speed = Math.random() * 0.03 + 0.01
      const reverse = Math.random() > 0.5
      const size = Math.random() * 3 + 2
      
      // Color palette with multiple colors
      const colorPalette = [
        '#60a5fa', // blue-400
        '#3b82f6', // blue-500
        '#8b5cf6', // violet-500
        '#a855f7', // purple-500
        '#ec4899', // pink-500
        '#f472b6', // pink-400
        '#fbbf24', // amber-400
        '#f59e0b', // amber-500
        '#10b981', // emerald-500
        '#06b6d4', // cyan-500
        '#6366f1', // indigo-500
        '#d946ef', // fuchsia-500
      ]
      
      return {
        id: i,
        angle: angle,
        radius: radius,
        baseRadius: radius,
        size: size,
        speed: speed * (reverse ? -1 : 1), // Some rotate opposite direction
        delay: Math.random() * 3,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        opacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        trailLength: Math.floor(Math.random() * 3) + 1,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        layer: Math.floor(Math.random() * 3), // Multiple layers for depth
      }
    })
    setSparkles(initialSparkles)

    // Update sparkle positions for rotation with pulsing radius
    let animationFrame
    let lastTime = 0
    
    const updateSparkles = (time) => {
      const delta = time - lastTime
      lastTime = time
      
      // Update pulse phase for radius animation
      setPulsePhase(prev => (prev + 0.01) % (Math.PI * 2))
      
      setSparkles(prev => prev.map(sparkle => {
        const newAngle = sparkle.angle + sparkle.speed * (delta / 16)
        
        // Pulsing radius effect
        const radiusPulse = Math.sin(pulsePhase + sparkle.pulsePhase) * 20
        const currentRadius = sparkle.baseRadius + radiusPulse
        
        const newX = Math.cos(newAngle) * currentRadius
        const newY = Math.sin(newAngle) * currentRadius
        
        // Twinkling opacity effect
        const opacityPulse = Math.sin(time * 0.001 + sparkle.id) * 0.3 + 0.7
        const newOpacity = Math.max(0.2, Math.min(1, sparkle.opacity * opacityPulse))
        
        // Size pulse effect
        const sizePulse = Math.sin(time * 0.002 + sparkle.id) * 0.5 + 1
        const currentSize = sparkle.size * sizePulse

        return {
          ...sparkle,
          angle: newAngle,
          x: newX,
          y: newY,
          opacity: newOpacity,
          currentSize: currentSize
        }
      }))
      
      animationFrame = requestAnimationFrame(updateSparkles)
    }

    // Start animation
    setTimeout(() => {
      lastTime = performance.now()
      animationFrame = requestAnimationFrame(updateSparkles)
    }, 500)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // Create additional sparkles for inner and outer circles
  const innerSparkles = Array.from({ length: 20 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const radius = 120 + Math.random() * 40
    const delay = Math.random() * 5
    const size = Math.random() * 2 + 0.5
    const color = ['#60a5fa', '#8b5cf6', '#f472b6', '#fbbf24'][Math.floor(Math.random() * 4)]
    
    return {
      id: `inner-${i}`,
      angle,
      radius,
      size,
      color,
      delay
    }
  })

  const outerSparkles = Array.from({ length: 15 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const radius = 240 + Math.random() * 30
    const delay = Math.random() * 5
    const size = Math.random() * 1.5 + 0.5
    const color = ['#3b82f6', '#a855f7', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
    
    return {
      id: `outer-${i}`,
      angle,
      radius,
      size,
      color,
      delay
    }
  })

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Multiple animated rings */}
      <div className="absolute w-[480px] h-[480px] border border-white/5 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[440px] h-[440px] border border-blue-400/10 rounded-full animate-spin-slow-reverse"></div>
      <div className="absolute w-[520px] h-[520px] border border-purple-400/5 rounded-full animate-spin-slow" style={{animationDuration: '40s'}}></div>
      
      {/* Glow rings */}
      <div className="absolute w-[460px] h-[460px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full animate-pulse-slow blur-xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full animate-pulse-slow-delay blur-2xl"></div>
      
      {/* Main circular sparkle particles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full transition-all duration-100"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
            width: `${sparkle.currentSize || sparkle.size}px`,
            height: `${sparkle.currentSize || sparkle.size}px`,
            backgroundColor: sparkle.color,
            opacity: sparkle.opacity,
            transform: `translate(-50%, -50%)`,
            boxShadow: `
              0 0 ${sparkle.currentSize * 4}px ${sparkle.currentSize * 2}px ${sparkle.color}80,
              0 0 ${sparkle.currentSize * 6}px ${sparkle.currentSize * 3}px ${sparkle.color}40
            `,
            zIndex: sparkle.layer,
            filter: `blur(${sparkle.layer * 0.5}px)`,
          }}
        />
      ))}
      
      {/* Inner circle sparkles - smaller, faster */}
      {innerSparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `calc(50% + ${Math.cos(sparkle.angle) * sparkle.radius}px)`,
            top: `calc(50% + ${Math.sin(sparkle.angle) * sparkle.radius}px)`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            transform: `translate(-50%, -50%)`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `0 0 ${sparkle.size * 6}px ${sparkle.size * 2}px ${sparkle.color}`,
          }}
        />
      ))}
      
      {/* Outer circle sparkles - larger, slower */}
      {outerSparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `calc(50% + ${Math.cos(sparkle.angle) * sparkle.radius}px)`,
            top: `calc(50% + ${Math.sin(sparkle.angle) * sparkle.radius}px)`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            transform: `translate(-50%, -50%)`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: '8s',
            boxShadow: `0 0 ${sparkle.size * 8}px ${sparkle.size * 3}px ${sparkle.color}60`,
          }}
        />
      ))}
      
      {/* Shooting sparkles that move across the circle */}
      {Array.from({ length: 8 }).map((_, i) => {
        const startAngle = Math.random() * Math.PI * 2
        const endAngle = startAngle + Math.PI * (Math.random() * 0.5 + 0.5)
        const radius = 180 + Math.random() * 40
        const duration = 2 + Math.random() * 2
        const delay = Math.random() * 3
        const color = ['#60a5fa', '#8b5cf6', '#f472b6'][Math.floor(Math.random() * 3)]
        
        return (
          <div
            key={`shoot-${i}`}
            className="absolute rounded-full animate-shoot"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: '2px',
              backgroundColor: color,
              transformOrigin: 'center',
              transform: `translate(-50%, -50%) rotate(${startAngle}rad)`,
              animation: `shoot ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              boxShadow: `0 0 10px 2px ${color}`,
            }}
          >
            <style>{`
              @keyframes shoot-${i} {
                0% {
                  transform: translate(-50%, -50%) rotate(${startAngle}rad) translateX(${radius}px);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -50%) rotate(${endAngle}rad) translateX(${radius}px);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )
      })}
      
      {/* Burst sparkles that appear randomly */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const radius = 150 + Math.random() * 60
        const delay = Math.random() * 4
        const color = ['#fbbf24', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 3)]
        
        return (
          <div
            key={`burst-${i}`}
            className="absolute rounded-full animate-burst"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              width: '0px',
              height: '0px',
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${delay}s`,
              boxShadow: `0 0 20px 5px ${color}`,
            }}
          />
        )
      })}
      
      {/* Connection lines between sparkles (dotted) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle1 = (i * 30) * (Math.PI / 180)
        const angle2 = ((i + 6) * 30) * (Math.PI / 180)
        const radius = 220
        
        return (
          <div
            key={`line-${i}`}
            className="absolute w-px h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              left: `calc(50% + ${Math.cos(angle1) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle1) * radius}px)`,
              width: '100px',
              transform: `
                translate(-50%, -50%) 
                rotate(${Math.atan2(
                  Math.sin(angle2) * radius - Math.sin(angle1) * radius,
                  Math.cos(angle2) * radius - Math.cos(angle1) * radius
                )}rad)
              `,
              transformOrigin: '0 0',
              opacity: 0.3,
              backgroundImage: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(96, 165, 250, 0.3) 20%, 
                rgba(96, 165, 250, 0.6) 50%, 
                rgba(96, 165, 250, 0.3) 80%, 
                transparent 100%
              )`,
            }}
          />
        )
      })}
    </div>
  )
}

export default CircularSparkles