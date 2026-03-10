import { useEffect, useRef } from 'react'
import { fadeInOnScroll, cleanupScrollTriggers } from '../utils/animations'

function Collabs() {
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (!containerRef.current) return

    fadeInOnScroll(containerRef.current, { y: 40, start: 'top 75%' })

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="collabs section section-numbered" data-section-number="04">
      <div className="collabs-container" ref={containerRef}>
        <h3 className="collabs-title">Trusted Partners</h3>
        <p className="collabs-subtitle">
          We collaborate with iwi, industry, research institutes, and regional organisations.
        </p>

        <div className="collabs-track-container">
          <div className="collabs-track">
            {partners.map((partner) => (
              <div key={`partner-${partner.id}`} className="partner-logo">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className={`partner-logo-img ${partner.id === 3 ? 'partner-logo-large' : ''} ${partner.id === 2 || partner.id === 8 ? 'partner-logo-invert' : ''} ${partner.id === 10 ? 'partner-logo-medium' : ''}`}
                />
              </div>
            ))}
            {partners.map((partner) => (
              <div
                key={`partner-duplicate-${partner.id}`}
                className="partner-logo"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
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
