import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'
import { projects } from '../data/projects'

function Work() {
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const track = trackRef.current
    if (!header || !track) return

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
      },
    )

    // ── Card stagger ──────────────────────────────────────────────────────────
    gsap.fromTo(
      track.querySelectorAll('.work-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: track,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section
      className="work section section-numbered section-divider"
      id={SECTION_IDS.work}
      data-section-number="04"
    >
      <div className="work-header-wrap" ref={headerRef}>
        <div className="work-header-inner">
          <div className="work-header-row">
            <h2 className="work-title">
              <span className="title-line">
                <span className="title-text">He Mahi Whakahirahira</span>
              </span>
              <span className="title-line">
                <span className="title-text">
                  <em>Selected Work</em>
                </span>
              </span>
            </h2>
            <p className="work-scroll-hint" aria-hidden="true">drag to explore →</p>
          </div>
          <p className="work-intro">
            A selection of strategic engagements across iwi, Crown and environmental systems.
          </p>
        </div>
      </div>

      <div className="work-track-outer" ref={trackRef}>
        <div className="work-track">
          {projects.map((project) => (
            <div key={project.slug} className="work-card">
              <div className="work-card-image">
                <span className="work-card-category">{project.category}</span>
              </div>
              <div className="work-card-body">
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-summary">{project.summary}</p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="work-card-link"
                >
                  View project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
