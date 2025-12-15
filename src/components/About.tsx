import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutImage from '../assets/images/about-aimee.jpg'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple quick fade in - no scale transform
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="about section" id="about" ref={sectionRef}>
      {/* Card Container with ref for animation */}
      <div className="about-container" ref={containerRef}>
        <span className="about-accent">WHO WE ARE</span>

        <div className="about-layout">
          {/* LEFT SIDE - Image + Title */}
          <div className="about-left">
            <div className="about-image-wrapper">
              <img
                src={aboutImage}
                alt="Aimee Hinewaa Ratana"
                className="about-image"
              />
              <div className="image-caption">
                <p className="caption-name">Aimee Rachel Kaio</p>
                <p className="caption-role">Founder & Lead Strategist</p>
              </div>
            </div>

            <h2 className="about-title">
              Our <em>Story</em>
            </h2>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="about-right">
            <div className="about-main">
              <strong className="about-lead">
                Hinewaa leads innovation shaped by two worlds - guided by whakapapa, informed by science, and designed to honour people, place, and planet.
              </strong>

              <p>
                We are bridge-builders and system thinkers - translating between iwi, Crown, science, and regional sectors. We don't just advise on strategy; we design it, align it, and future-proof it through values-driven innovation that combines mātauranga Māori with strategic rigour.
              </p>

              <p>
                From regional economic development to Antarctic governance, we work where Indigenous knowledge meets global systems - turning aspiration into structure, vision into measurable action, and fragmented approaches into purposeful, intergenerational solutions.
              </p>
            </div>

            {/* Values Bento Grid */}
            <div className="values-bento-container">
              <h3 className="values-heading">Our Values</h3>

              <div className="bento-grid">
                {/* Large Card */}
                <div className="bento-card bento-large bento-primary">
                  <span className="bento-icon">01</span>
                  <div className="bento-content">
                    <h4>Innovation</h4>
                    <p>
                      Blending mātauranga Māori with strategic rigour to solve complex challenges
                    </p>
                  </div>
                </div>

                {/* Medium Card */}
                <div className="bento-card bento-medium bento-accent">
                  <span className="bento-icon">02</span>
                  <div className="bento-content">
                    <h4>Integrity</h4>
                    <p>Grounded in whakapapa, guided by honesty and accountability</p>
                  </div>
                </div>

                {/* Medium Card */}
                <div className="bento-card bento-medium bento-primary-light">
                  <span className="bento-icon">03</span>
                  <div className="bento-content">
                    <h4>Strategic Excellence</h4>
                    <p>Delivering measurable, future-focused outcomes</p>
                  </div>
                </div>

                {/* Small Card */}
                <div className="bento-card bento-small bento-accent-light">
                  <span className="bento-icon">04</span>
                  <div className="bento-content">
                    <h4>Collaboration</h4>
                    <p>Bridge-building across sectors and worldviews</p>
                  </div>
                </div>

                {/* Small Card */}
                <div className="bento-card bento-small bento-primary-dark">
                  <span className="bento-icon">05</span>
                  <div className="bento-content">
                    <h4>Impact</h4>
                    <p>Creating lasting, intergenerational change</p>
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
