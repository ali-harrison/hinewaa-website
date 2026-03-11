import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'

function Impact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const impacts = [
    {
      metric: '20+ years',
      label: 'Senior Leadership',
      description: 'Experience shaping strategy, investment and governance in complex environments across iwi, Crown and regional systems.',
    },
    {
      metric: 'Multi-sector',
      label: 'Depth of Practice',
      description: 'Operating at the interface of commercial, taiao and regulatory systems — climate, Indigenous economies, public policy and environmental governance.',
    },
    {
      metric: 'Aotearoa & Global',
      label: 'Reach',
      description: 'Contributing Indigenous voice within regional and international frameworks, from Te Waipounamu to Antarctic governance systems.',
    },
  ]

  useEffect(() => {
    const header = headerRef.current
    const stats = statsRef.current
    if (!header || !stats) return

    // ── Title line reveal ─────────────────────────────────────────────────────
    gsap.fromTo(
      header.querySelectorAll('.title-text'),
      { y: '110%' },
      {
        y: '0%',
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // ── Card stagger ──────────────────────────────────────────────────────────
    gsap.fromTo(
      stats.querySelectorAll('.impact-stat'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: stats,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="impact section section-numbered section-divider" id={SECTION_IDS.impact} data-section-number="03">
      <div className="impact-container">
        <div className="impact-header" ref={headerRef}>
          <h2 className="impact-title">
            <span className="title-line"><span className="title-text">Kā pūtaka</span></span>
            <span className="title-line"><span className="title-text"><em>Our Impact</em></span></span>
          </h2>
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
