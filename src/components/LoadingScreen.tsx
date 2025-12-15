import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import logoImage from '../assets/images/Vector.png'

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if page has already loaded in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded')

    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 40)

    // Wait for minimum 2 seconds then fade out
    const timer = setTimeout(() => {
      if (loadingRef.current) {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsLoading(false)
            sessionStorage.setItem('hasLoaded', 'true')
          },
        })
      }
    }, 2200)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">
          <img
            src={logoImage}
            alt="Hinewaa Ltd"
            className="loading-logo-image"
          />
        </div>

        {/* Loading bar */}
        <div className="loading-bar-container">
          <div className="loading-bar-bg">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loading-text">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
