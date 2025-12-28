import { useEffect, useState } from 'react'

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute top-0 rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `fall linear ${flake.duration}s infinite`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Snowflakes