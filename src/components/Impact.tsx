import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Impact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
  const statementRef = useRef<HTMLDivElement>(null)

  const impacts = [
    {
      metric: '5+',
      label: 'Years Experience',
      description: 'Leading Indigenous-centered strategy and innovation',
    },
    {
      metric: '3',
      label: 'Key Sectors',
      description: 'Strategy, Climate, and Regional Development',
    },
    {
      metric: 'Global',
      label: 'Reach',
      description: 'From Aotearoa to Antarctic governance',
    },
  ]

  useEffect(() => {
    // Ensure elements are visible by default
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1 })
    }

    statsRef.current.forEach((stat) => {
      if (stat) {
        gsap.set(stat, { opacity: 1 })
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

    // Stats counter animations
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        const metric = stat.querySelector('.impact-metric')

        // Stat card entrance
        gsap.fromTo(
          stat,
          {
            opacity: 0,
            scale: 0.8,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              onEnter: () => gsap.to(stat, { opacity: 1, scale: 1, y: 0 }),
            },
          }
        )

        // Metric number scale animation
        if (metric) {
          gsap.fromTo(
            metric,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.2 + 0.3,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        // Subtle float animation on scroll
        gsap.to(stat, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: stat,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    // Statement animation
    gsap.fromTo(
      statementRef.current,
      { opacity: 0, y: 50 },
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
    <section className="impact section" id="impact" ref={sectionRef}>
      <div className="impact-container">
        <div className="impact-header" ref={headerRef}>
          <h2 className="impact-title">
            Our <em>Impact</em>
          </h2>
          <p className="impact-intro">
            Trusted by iwi, government, and industry to deliver transformation
            that matters.
          </p>
        </div>

        <div className="impact-stats">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="impact-stat"
              ref={(el) => {
                statsRef.current[index] = el
              }}
            >
              <div className="impact-metric">{impact.metric}</div>
              <div className="impact-label">{impact.label}</div>
              <p className="impact-description">{impact.description}</p>
            </div>
          ))}
        </div>

        <div className="impact-statement" ref={statementRef}>
          <h3>Outcomes That Endure</h3>
          <p>
            Our work helps shift how iwi, government, and industry think and act
            - embedding Indigenous values and intergenerational thinking into
            national and regional systems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Impact
