import { useEffect, useRef } from 'react'
import { fadeInOnScroll, staggerFadeInWithRotation, createParallax, cleanupScrollTriggers } from '../utils/animations'

function Impact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)

  const impacts = [
    {
      metric: '20+ years',
      label: 'Senior Leadership across iwi, Crown and regional systems',
      description: 'Experience shaping strategy, investment and governance in complex environments.',
    },
    {
      metric: 'Multi-sector',
      label: 'Climate, Indigenous economies, public policy and environmental governance',
      description: 'Operating at the interface of commercial, taiao and regulatory systems.',
    },
    {
      metric: 'Aotearoa & Global',
      label: 'From Te Waipounamu to Antarctic governance systems',
      description: 'Contributing Indigenous voice within regional and international frameworks.',
    },
  ]

  useEffect(() => {
    if (headerRef.current) {
      fadeInOnScroll(headerRef.current, { y: 30 })
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.impact-stat')
      staggerFadeInWithRotation(cards, {
        y: 40,
        rotation: 2,
        stagger: 0.15,
        trigger: statsRef.current,
      })
    }

    if (statementRef.current) {
      fadeInOnScroll(statementRef.current, { y: 30 })
      createParallax(statementRef.current, { speed: 0.1 })
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="impact section section-numbered section-divider" id="impact" data-section-number="04">
      <div className="impact-container">
        <div className="impact-header" ref={headerRef}>
          <h2 className="impact-title">
            Kā pūtaka | Our Impact
          </h2>
          <h3>Impact in Practice</h3>
          <p className="impact-intro">
            Hinewaa contributes to system-level transformation across iwi, Crown and environmental governance contexts.
          </p>
        </div>

        <div className="impact-stats" ref={statsRef}>
          {impacts.map((impact, index) => (
            <div key={index} className="impact-stat">
              <div className="impact-metric">{impact.metric}</div>
              <div className="impact-label">{impact.label}</div>
              <p className="impact-description">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact
