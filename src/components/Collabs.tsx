import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Collabs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const partners = [
    { id: 1, name: 'Partner 1', logo: '/logos/partner-1.png' },
    { id: 2, name: 'Partner 2', logo: '/logos/partner-2.png' },
    { id: 3, name: 'Partner 3', logo: '/logos/partner-3.png' },
    { id: 4, name: 'Partner 4', logo: '/logos/partner-4.png' },
    { id: 5, name: 'Partner 5', logo: '/logos/partner-5.png' },
    { id: 6, name: 'Partner 6', logo: '/logos/partner-6.png' },
    { id: 8, name: 'Partner 8', logo: '/logos/partner-8.png' },
    { id: 9, name: 'Partner 9', logo: '/logos/partner-9.png' },
    { id: 10, name: 'Partner 10', logo: '/logos/partner-10.png' },
  ]

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !trackRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animate container
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 80, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
    )
      // Animate title
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      )
      // Animate track
      .fromTo(
        trackRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="collabs">
      <div className="collabs-container" ref={containerRef}>
        <h3 className="collabs-title" ref={titleRef}>
          Trusted Partners
        </h3>
        <p className="collabs-subtitle" ref={titleRef}>
          We collaborate with iwi, research institutes, and regional organisations to co-create meaningful, lasting change.
        </p>

        <div className="collabs-track-container" ref={trackRef}>
          <div className="collabs-track">
            {/* First set of partners */}
            {partners.map((partner) => (
              <div key={`partner-${partner.id}`} className="partner-logo">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`partner-logo-img ${partner.id === 3 ? 'partner-logo-large' : ''} ${partner.id === 2 || partner.id === 8 ? 'partner-logo-invert' : ''} ${partner.id === 10 ? 'partner-logo-medium' : ''}`}
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner) => (
              <div key={`partner-duplicate-${partner.id}`} className="partner-logo">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`partner-logo-img ${partner.id === 3 ? 'partner-logo-large' : ''} ${partner.id === 2 || partner.id === 8 ? 'partner-logo-invert' : ''} ${partner.id === 10 ? 'partner-logo-medium' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collabs
