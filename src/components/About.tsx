import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { fadeInOnScroll, cleanupScrollTriggers } from '../utils/animations'
import aboutImage from '../assets/images/about-aimee.jpg'
import { SECTION_IDS, NAV_LINKS, FOUNDER } from '../constants/site'

function About() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (leftRef.current) {
      fadeInOnScroll(leftRef.current, { y: 60, start: 'top 75%' })
    }

    if (rightRef.current) {
      fadeInOnScroll(rightRef.current, { y: 60, delay: 0.2, start: 'top 75%' })
    }

    if (bentoRef.current) {
      const cards = bentoRef.current.querySelectorAll('.bento-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bentoRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="about section section-numbered section-divider" id={SECTION_IDS.about} data-section-number="01">
      <div className="about-container">
        <span className="about-accent">{NAV_LINKS.find(l => l.id === SECTION_IDS.about)?.reo}</span>

        <div className="about-layout">
          <div className="about-left" ref={leftRef}>
            <div className="about-image-wrapper img-reveal">
              <img
                src={aboutImage}
                alt="Aimee Hinewaa Ratana"
                className="about-image img-grayscale"
                loading="lazy"
                width={1434}
                height={770}
              />
              <div className="image-caption">
                <p className="caption-name">{FOUNDER.name}</p>
                <p className="caption-role">{FOUNDER.role}</p>
              </div>
            </div>

            <h2 className="about-title">
              Two Knowledge Systems. One Strategic Lens.
            </h2>
          </div>

          <div className="about-right" ref={rightRef}>
            <div className="about-main">
              <strong className="about-lead">{FOUNDER.shortBio}</strong>

              <p>
                Hinewaa is an Indigenous-led strategic advisory practice working where community, iwi, Crown, research and industry intersect.
              </p>

              <p>
                Our focus areas include: Climate and environmental governance | Indigenous bioeconomy and mahika kai | Strategic transformation and system alignment | Commercial–taiao partnerships
              </p>

              <p>
                We operate at the interface of policy, science and community - translating complexity into actionable strategy. From regional economic development to interests in Antarctic governance, we work where Indigenous knowledge meets global systems.
              </p>
            </div>

            <div className="values-bento-container">
              <h3 className="values-heading">Our Values</h3>

              <div className="bento-grid" ref={bentoRef}>
                <div className="bento-card bento-large bento-primary">
                  <span className="bento-icon">01</span>
                  <div className="bento-content">
                    <h4>Knowledge Integrity</h4>
                    <p>
                      Grounded in whakapapa and informed by science. We honour mātauranga Māori while applying evidence, analysis and disciplined thinking to complex system challenges.
                    </p>
                  </div>
                </div>

                <div className="bento-card bento-medium bento-accent">
                  <span className="bento-icon">02</span>
                  <div className="bento-content">
                    <h4>Strategic Rigour</h4>
                    <p>
                      Clarity in complexity. We bring structured thinking, governance discipline and measurable frameworks to ensure strategy translates into action and accountability.
                    </p>
                  </div>
                </div>

                <div className="bento-card bento-medium bento-primary-light">
                  <span className="bento-icon">03</span>
                  <div className="bento-content">
                    <h4>Intergenerational Impact</h4>
                    <p>Designed for those who come next. We focus on enduring outcomes — aligning people, planet and prosperity for long-term resilience and prosperity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
