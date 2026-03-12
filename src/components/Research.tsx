import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'

function Research() {
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // ── Title line reveal ─────────────────────────────────────────────────────
    gsap.fromTo(
      header.querySelectorAll('.title-text'),
      { y: '110%' },
      {
        y: '0%',
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // ── Content + cta fade in ─────────────────────────────────────────────────
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="research section section-numbered section-divider" id={SECTION_IDS.research} data-section-number="06">
      <div className="research-container">
        <div className="research-header" ref={headerRef}>
          <h2 className="research-title">
            <span className="title-line">
              <span className="title-text">Research & <em>Innovation</em></span>
            </span>
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
