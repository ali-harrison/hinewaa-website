import { useEffect, useRef } from 'react'
import { fadeInOnScroll, staggerFadeIn, cleanupScrollTriggers } from '../utils/animations'
import { SECTION_IDS } from '../constants/site'

function Services() {
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
    if (headerRef.current) {
      fadeInOnScroll(headerRef.current, { y: 30 })
    }

    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.service-card')
      staggerFadeIn(cards, { y: 30, stagger: 0.15, trigger: trackRef.current })
    }

    return () => cleanupScrollTriggers()
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
            Kā Mahi | Our Mahi
          </h2>
        </div>

        <div className="services-track" ref={trackRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card nub-lit">
              <div className="service-card-inner">
                <div className="service-card-label">
                  <span className="service-number">{service.number}</span>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
