import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeInOnScroll, cleanupScrollTriggers } from '../utils/animations'

function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      number: '01',
      title: 'Strategic Design & Governance',
      description:
        'We design intergenerational strategies and governance frameworks that align iwi, Crown and regional systems. Our work includes: Strategy development and transformation roadmaps | Governance design and advisory | System alignment across policy, delivery and investment | Impact frameworks and measurable performance architecture. We ensure strategy translates into clear decisions, accountability and execution.',
    },
    {
      number: '02',
      title: 'Climate & Taiao Systems',
      description:
        'We embed mātauranga Māori within climate adaptation, environmental governance and natural resource management systems. Our work includes: Climate strategy and adaptation planning | Taiao governance frameworks | Indigenous knowledge integration into policy and science | Commercial–environment interface design. We support durable environmental and economic resilience.',
    },
    {
      number: '03',
      title: 'Indigenous Economies & Global Governance',
      description:
        'We strengthen Indigenous participation in regional, national and international systems. Our work includes: Indigenous bioeconomy and food–ocean transition strategy | Regional economic development advisory | Commercial partnership design | Antarctic and Southern Ocean governance research. We position Indigenous leadership within evolving global and environmental systems.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const header = headerRef.current
    if (!section || !track || !header) return

    fadeInOnScroll(header, { y: 30 })

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.service-card'))
    const isDesktop = window.matchMedia('(min-width: 769px)').matches

    if (!isDesktop) {
      gsap.set(cards, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15 })
        },
      })
      return () => cleanupScrollTriggers()
    }

    // ── 1. Measure slot positions while grid is in normal flow ────────────────
    // Reset any inline styles so we measure the grid as CSS intends
    cards.forEach(card => {
      card.style.cssText = ''
    })
    void track.offsetWidth // force reflow

    const trackRect = track.getBoundingClientRect()
    const slotRects = cards.map(card => {
      const r = card.getBoundingClientRect()
      return {
        top:    r.top    - trackRect.top,
        left:   r.left   - trackRect.left,
        width:  r.width,
        height: r.height,
      }
    })

    // Fix track height so it doesn't collapse when cards become absolute
    const maxBottom = Math.max(...slotRects.map(r => r.top + r.height))
    track.style.minHeight = `${maxBottom + 40}px`

    // ── 2. Stack all cards at the middle slot position ────────────────────────
    const stackSlot = slotRects[1] ?? slotRects[0]

    const stackOffsets = [
      { x: -7, y: -7, rotation: -2.5, scale: 1.02, zIndex: 3 },
      { x:  0, y:  0, rotation:  0,   scale: 1.00,  zIndex: 2 },
      { x:  7, y:  7, rotation:  2.5, scale: 0.98,  zIndex: 1 },
    ]

    cards.forEach((card, i) => {
      card.style.position = 'absolute'
      card.style.top      = `${stackSlot.top}px`
      card.style.left     = `${stackSlot.left}px`
      card.style.width    = `${stackSlot.width}px`
      gsap.set(card, {
        x:        stackOffsets[i].x,
        y:        stackOffsets[i].y,
        rotation: stackOffsets[i].rotation,
        scale:    stackOffsets[i].scale,
        zIndex:   stackOffsets[i].zIndex,
        opacity:  0,
      })
    })

    // ── 3. Inject SVG borders (hidden via dashoffset) ─────────────────────────
    const svgRects: SVGRectElement[] = []
    slotRects.forEach((slot, i) => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute(
        'style',
        'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:1;'
      )
      svg.setAttribute('aria-hidden', 'true')

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('width', '100%')
      rect.setAttribute('height', '100%')
      rect.setAttribute('rx', '8')
      rect.setAttribute('ry', '8')
      rect.setAttribute('fill', 'none')
      rect.setAttribute('stroke', '#52a882')
      rect.setAttribute('stroke-width', '1.2')

      const perimeter = Math.round(2 * (slot.width + slot.height)) + 40
      rect.setAttribute('stroke-dasharray', String(perimeter))
      rect.setAttribute('stroke-dashoffset', String(perimeter))

      svg.appendChild(rect)
      cards[i].insertBefore(svg, cards[i].firstChild)
      svgRects.push(rect)
    })

    // ── 4. Build and fire animation on scroll ─────────────────────────────────
    const runAnimation = () => {
      const tl = gsap.timeline()

      // Phase 1 — Stack fade-in (0.9s, stagger 0.08s)
      tl.to(cards, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.08,
      })

      // Phase 2 — Spread (hold 0.7s, then fan to slots, stagger 0.1s)
      // Animate top/left/width directly so cards land precisely in their slots
      cards.forEach((card, i) => {
        tl.to(card, {
          top:      slotRects[i].top,
          left:     slotRects[i].left,
          width:    slotRects[i].width,
          x:        0,
          y:        0,
          rotation: 0,
          scale:    1,
          zIndex:   'auto',
          duration: 1.1,
          ease:     'expo.inOut',
        }, i === 0 ? '+=0.7' : '<+=0.1')
      })

      // Phase 3 — Morph border draw (hold 0.5s, stagger 0.35s per card)
      tl.addLabel('morph0', '+=0.5')

      cards.forEach((card, i) => {
        const d = i * 0.35
        const cardTitle = card.querySelector<HTMLElement>('.service-title')

        tl.to(svgRects[i], {
          attr: { 'stroke-dashoffset': 0 },
          duration: 1.4,
          ease: 'power3.inOut',
        }, `morph0+=${d}`)

        if (cardTitle) {
          tl.to(cardTitle, {
            color: '#52a882',
            duration: 0.5,
            ease: 'power2.out',
          }, `morph0+=${d + 0.3}`)
        }

        tl.to(card, {
          boxShadow: '0 0 48px rgba(82,168,130,0.07)',
          duration: 0.8,
          ease: 'power2.out',
        }, `morph0+=${d + 1.4}`)

        tl.call(() => card.classList.add('nub-lit'), [], `morph0+=${d + 1.4}`)
      })
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      once: true,
      onEnter: runAnimation,
    })

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section
      className="services section section-numbered section-divider"
      id="services"
      ref={sectionRef}
      data-section-number="02"
    >
      <div className="services-container">
        <div className="services-header" ref={headerRef}>
          <h2 className="services-title">
            Kā Mahi | Our Mahi
          </h2>
        </div>

        <div className="services-track" ref={trackRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
