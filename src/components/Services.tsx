import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'

function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const services = [
    {
      number: '01',
      category: 'Strategy',
      title: 'Strategic Design & Governance',
      description:
        'We design intergenerational strategies and governance frameworks that align iwi, Crown and regional systems. Our work includes: Strategy development and transformation roadmaps | Governance design and advisory | System alignment across policy, delivery and investment | Impact frameworks and measurable performance architecture. We ensure strategy translates into clear decisions, accountability and execution.',
      tags: ['Strategy Design', 'Governance', 'Systems Thinking'],
    },
    {
      number: '02',
      category: 'Climate',
      title: 'Climate & Taiao Systems',
      description:
        'We embed mātauranga Māori within climate adaptation, environmental governance and natural resource management systems. Our work includes: Climate strategy and adaptation planning | Taiao governance frameworks | Indigenous knowledge integration into policy and science | Commercial–environment interface design. We support durable environmental and economic resilience.',
      tags: ['Climate Adaptation', 'Taiao', 'Indigenous Knowledge'],
    },
    {
      number: '03',
      category: 'Indigenous Economies',
      title: 'Indigenous Economies & Global Governance',
      description:
        'We strengthen Indigenous participation in regional, national and international systems. Our work includes: Indigenous bioeconomy and food–ocean transition strategy | Regional economic development advisory | Commercial partnership design | Antarctic and Southern Ocean governance research. We position Indigenous leadership within evolving global and environmental systems.',
      tags: ['Bioeconomy', 'Global Governance', 'Regional Development'],
    },
  ]

  useEffect(() => {
    const header = headerRef.current
    const track = trackRef.current
    if (!header || !track) return

    // ── Title line reveal ────────────────────────────────────────────────────
    const titleTexts = header.querySelectorAll('.services-title-text')
    gsap.fromTo(
      titleTexts,
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

    // ── Card stagger ─────────────────────────────────────────────────────────
    const cards = track.querySelectorAll('.service-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: track,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      },
    )

    // ── Ghost number parallax ─────────────────────────────────────────────────
    track.querySelectorAll('.service-ghost-number').forEach((ghost) => {
      gsap.to(ghost, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: ghost.closest('.service-card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // ── Per-card mouse tilt ───────────────────────────────────────────────────
    type Handler = {
      el: HTMLDivElement
      move: (e: MouseEvent) => void
      leave: () => void
    }
    const handlers: Handler[] = []

    cardsRef.current.forEach((card) => {
      if (!card) return

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const rotateX =
          ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4
        const rotateY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4
        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          transformPerspective: 1000,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      handlers.push({ el: card, move: onMove, leave: onLeave })
    })

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
      cleanupScrollTriggers()
    }
  }, [])

  return (
    <section
      className="services section section-numbered section-divider"
      id={SECTION_IDS.services}
      data-section-number="02"
    >
      <div className="services-container">
        <div className="services-header" ref={headerRef}>
          <h2 className="services-title">
            <span className="services-title-line">
              <span className="services-title-text">Kā Mahi</span>
            </span>
            <span className="services-title-line">
              <span className="services-title-text">Our Mahi</span>
            </span>
          </h2>
        </div>

        <div className="services-track" ref={trackRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
            >
              {/* Ghost numeral — decorative, aria-hidden */}
              <span className="service-ghost-number" aria-hidden="true">
                {service.number}
              </span>

              {/* Top: meta + heading + divider */}
              <div className="service-card-top">
                <div className="service-card-meta">
                  <span className="service-index-label">
                    — {service.number}
                  </span>
                  <span className="service-category">{service.category}</span>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <div className="service-divider" />
              </div>

              {/* Bottom: description + tags */}
              <div className="service-card-bottom">
                <p className="service-description">{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
