import { useEffect, useRef } from 'react'
import { fadeInOnScroll, staggerFadeInWithRotation, createParallax, cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS, FOUNDER } from '../constants/site'

function Approach() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: '01',
      title: 'Context First',
      desc: 'Every engagement begins with deep listening. We map relationships, histories and priorities before any strategy is formed.',
    },
    {
      number: '02',
      title: 'Evidence with Integrity',
      desc: 'We bring mātauranga Māori and scientific evidence into genuine dialogue — neither subordinated to the other.',
    },
    {
      number: '03',
      title: 'System Alignment, Design for Execution',
      desc: 'Strategy only works when the systems around it are aligned. We design for implementation, not just the plan.',
    },
  ]

  useEffect(() => {
    if (headerRef.current) {
      fadeInOnScroll(headerRef.current, { y: 30 })
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.timeline-item')
      staggerFadeInWithRotation(cards, {
        y: 40,
        rotation: 3,
        stagger: 0.15,
        trigger: gridRef.current,
      })
    }

    if (statementRef.current) {
      fadeInOnScroll(statementRef.current, { y: 30 })
      createParallax(statementRef.current, { speed: 0.1 })
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="approach section section-numbered section-divider" id={SECTION_IDS.approach} data-section-number="03">
      <div className="approach-container">
        <div className="approach-header" ref={headerRef}>
          <h2 className="approach-title">
            Kā tikaka | Our Approach
          </h2>
          <p className="approach-intro">
            Hinewaa operates at the interface of mātauranga Māori, scientific evidence and governance systems. We bring disciplined analysis to complex environments, ensuring strategy is culturally grounded, analytically sound and practically implementable. Our approach is built on three principles:
          </p>
        </div>

        <div className="timeline-wrap" ref={gridRef}>
          <div className="timeline-line" />
          <div className="timeline-grid">
            {principles.map((principle) => (
              <div key={principle.number} className="timeline-item">
                <div className="timeline-dot">{principle.number}</div>
                <h3 className="timeline-title">{principle.title}</h3>
                <p className="timeline-desc">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pull-quote" ref={statementRef}>
          <span className="pull-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="pull-quote-text">{FOUNDER.longBio}</p>
          <cite className="pull-quote-cite">{FOUNDER.name} — {FOUNDER.role}</cite>
        </div>
      </div>
    </section>
  )
}

export default Approach
