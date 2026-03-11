import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { MOTION, createParallax, cleanupScrollTriggers } from '../utils/animations'
import { useMagnetic } from '../hooks/useMagnetic'
import heroImage from '../assets/images/hero-antarctic.webp'
import { SECTION_IDS, CTA_PRIMARY } from '../constants/site'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const magneticRef = useMagnetic(0.3)

  useEffect(() => {
    if (!titleRef.current) return

    const splitTitle = new SplitType(titleRef.current, {
      types: 'lines,words,chars',
      tagName: 'span',
    })

    const tl = gsap.timeline({ defaults: { ease: MOTION.ease } })

    // Enhanced char animation with scale + 3D rotation
    tl.fromTo(
      splitTitle.chars,
      { opacity: 0, y: 60, rotateX: -90, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.0,
        stagger: {
          amount: 0.8,
          from: 'start',
        },
        ease: 'back.out(1.7)',
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: MOTION.duration.fast },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: MOTION.duration.fast },
        '-=0.3'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: MOTION.duration.slow },
        '-=1.0'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3'
      )

    // ScrollTrigger-based parallax instead of manual scroll listener
    let parallaxTween: gsap.core.Tween | null = null
    if (imageRef.current) {
      parallaxTween = createParallax(imageRef.current, { speed: 0.15 })
    }

    return () => {
      tl.kill()
      splitTitle.revert()
      if (parallaxTween) parallaxTween.kill()
      cleanupScrollTriggers()
    }
  }, [])

  return (
    <section className="hero" id={SECTION_IDS.hero} ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title" ref={titleRef}>
            Indigenous Strategy for Complex Systems
          </h1>

          <div className="hero-subtitle" ref={subtitleRef}>
            <p>
              Advisory and governance expertise across climate, taiao and intergenerational development.
            </p>
            <p>
              We help organisations align Indigenous knowledge, science and commercial realities to deliver durable, future-focused outcomes.
            </p>
          </div>

          <div className="hero-cta" ref={ctaRef}>
            <div className="hero-cta-magnetic" ref={magneticRef}>
              <button
                className="btn-hero-primary"
                onClick={() => {
                  const contactSection = document.getElementById(SECTION_IDS.contact)
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {CTA_PRIMARY.label}
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper" ref={imageRef}>
          <div className="hero-image-container">
            <img
              src={heroImage}
              alt="Antarctic landscape showcasing environmental leadership"
              className="hero-image"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero