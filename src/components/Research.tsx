import { useEffect, useRef } from 'react'
import { fadeInOnScroll, cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'

function Research() {
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      fadeInOnScroll(headerRef.current, { y: 30 })
    }

    if (contentRef.current) {
      fadeInOnScroll(contentRef.current, { y: 30, delay: 0.1 })
    }

    if (ctaRef.current) {
      fadeInOnScroll(ctaRef.current, { y: 20 })
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="research section section-numbered section-divider" id={SECTION_IDS.research} data-section-number="05">
      <div className="research-container">
        <div className="research-header" ref={headerRef}>
          <h2 className="research-title">
            Research & <em>Innovation</em>
          </h2>
        </div>

        <div className="research-content" ref={contentRef}>
          <div className="research-main">
            <h3>Indigenous Voice in Global Systems</h3>
            <p>
              Hinewaa contributes research examining how Indigenous peoples can strengthen participation within international governance systems, including the Antarctic Treaty framework.
            </p>
            <p>
              This work connects mātauranga Māori with environmental law, climate policy and global decision-making structures — advancing Indigenous authority within evolving environmental regimes.
            </p>
          </div>

          <div className="research-sidebar">
            <div className="research-topics">
              <h4>Research Focus Areas</h4>
              <ul className="topics-list">
                <li>Antarctic Treaty System & Indigenous participation</li>
                <li>Southern Ocean environmental governance</li>
                <li>Climate adaptation and food-ocean systems</li>
                <li>Regional economic transformation</li>
                <li>Indigenous-led innovation and governance frameworks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="research-cta" ref={ctaRef}>
          <p>Insights, publications, and thought leadership coming soon.</p>
        </div>
      </div>
    </section>
  )
}

export default Research
