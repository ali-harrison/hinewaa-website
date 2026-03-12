import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useMagnetic(strength: number = 0.35) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Listen on document so we can detect proximity before cursor enters the element
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)

      if (dist < 100) {
        gsap.to(el, {
          x: (e.clientX - centerX) * strength,
          y: (e.clientY - centerY) * strength,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [strength])

  return ref
}
