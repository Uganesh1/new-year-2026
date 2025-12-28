import { useEffect, useState } from 'react'

const Starfield = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${3 + Math.random() * 2}s infinite alternate`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}

export default Starfield