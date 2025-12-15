import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Approach() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bridgesRef = useRef<(HTMLDivElement | null)[]>([])
  const statementRef = useRef<HTMLDivElement>(null)

  const bridges = [
    { from: 'Iwi', to: 'Crown' },
    { from: 'Science', to: <span className="matauranga-text">M<span className="macron-a">a</span>tauranga</span> },
    { from: 'Economy', to: 'Environment' },
  ]

  useEffect(() => {
    // Ensure elements are visible by default
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1 })
    }

    bridgesRef.current.forEach((bridge) => {
      if (bridge) {
        gsap.set(bridge, { opacity: 1 })
      }
    })

    if (statementRef.current) {
      gsap.set(statementRef.current, { opacity: 1 })
    }

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(headerRef.current, { opacity: 1, y: 0 }),
        },
      }
    )

    // Bridge cards stagger animation
    bridgesRef.current.forEach((bridge, index) => {
      if (bridge) {
        const line = bridge.querySelector('.bridge-line')
        const arrow = bridge.querySelector('.bridge-arrow')

        // Card entrance
        gsap.fromTo(
          bridge,
          { opacity: 0, x: -60, rotationY: -15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bridge,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              onEnter: () => gsap.to(bridge, { opacity: 1, x: 0, rotationY: 0 }),
            },
          }
        )

        // Animate bridge line
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: index * 0.2 + 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bridge,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Animate arrow
        gsap.fromTo(
          arrow,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.2 + 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bridge,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Subtle parallax
        gsap.to(bridge, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: bridge,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    // Statement fade in
    gsap.fromTo(
      statementRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(statementRef.current, { opacity: 1, y: 0 }),
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="approach section" id="approach" ref={sectionRef}>
      <div className="approach-container">
        <div className="approach-header" ref={headerRef}>
          <h2 className="approach-title">
            How We <em>Bridge</em> Worlds
          </h2>
          <p className="approach-intro">
            We connect seemingly separate systems to create coherent,
            values-driven strategies.
          </p>
        </div>

        <div className="bridges-grid">
          {bridges.map((bridge, index) => (
            <div
              key={index}
              className="bridge-card"
              ref={(el) => {
                bridgesRef.current[index] = el
              }}
            >
              <div className="bridge-endpoints">
                <span className="bridge-point">{bridge.from}</span>
                <div className="bridge-visual">
                  <div className="bridge-line"></div>
                  <span className="bridge-arrow">→</span>
                </div>
                <span className="bridge-point">{bridge.to}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="approach-statement" ref={statementRef}>
          <p>
            Hinewaa leads innovation shaped by two worlds - guided by whakapapa,
            informed by science, and designed to honour people, place, and
            planet.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Approach
