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

    // ── Drag momentum ─────────────────────────────────────────────────────────
    // trackRef is .work-track-outer (the scroll container).
    // During drag: quickTo for smooth 60fps cursor tracking.
    // On release: gsap.to for momentum coast with power2.out.
    const container = trackRef.current
    const maxScroll = () => container.scrollWidth - container.offsetWidth

    let isDown = false
    let startX = 0
    let startScrollLeft = 0
    let lastX = 0
    let lastDeltaX = 0

    const quickScroll = gsap.quickTo(container, 'scrollLeft', {
      duration: 0.1,
      ease: 'power2.out',
    })

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX
      startScrollLeft = container.scrollLeft
      lastX = e.pageX
      lastDeltaX = 0
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      container.style.scrollSnapType = 'none'
      gsap.killTweensOf(container, 'scrollLeft')
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      lastDeltaX = e.pageX - lastX
      lastX = e.pageX
      const dx = e.pageX - startX
      quickScroll(Math.max(0, Math.min(maxScroll(), startScrollLeft - dx)))
    }

    const onMouseUp = () => {
      if (!isDown) return
      isDown = false
      container.style.cursor = 'grab'
      container.style.userSelect = ''
      const target = Math.max(0, Math.min(maxScroll(), container.scrollLeft - lastDeltaX * 8))
      gsap.to(container, {
        scrollLeft: target,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => { container.style.scrollSnapType = '' },
      })
    }

    container.style.cursor = 'grab'
    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseleave', onMouseUp)

    return () => {
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mouseleave', onMouseUp)
      cleanupScrollTriggers()
    }
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
