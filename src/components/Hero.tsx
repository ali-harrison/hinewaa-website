import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return

    // Split title into words and characters, but split by lines and words to preserve em tag
    const splitTitle = new SplitType(titleRef.current, {
      types: 'lines,words,chars',
      tagName: 'span',
    })

    // Animate
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Staggered character animation
    tl.fromTo(
      splitTitle.chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.025,
        ease: 'back.out(1.5)',
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=1'
      )

    // Parallax effect on scroll
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY
        const parallaxSpeed = 0.5
        gsap.to(imageRef.current, {
          y: scrollY * parallaxSpeed,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      tl.kill()
      splitTitle.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title" ref={titleRef}>
            Indigenous <em>strategies</em> shaping global futures
          </h1>

          <div className="hero-subtitle" ref={subtitleRef}>
            <p>
              We transform fragmented systems into purposeful, intergenerational
              solutions - aligning people, planet, and prosperity.
            </p>
          </div>

          <div className="hero-cta" ref={ctaRef}>
            <button className="btn-hero-primary" onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Share Your Kaupapa
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper" ref={imageRef}>
          <div className="hero-image-container">
            <img
              src="/src/assets/images/hero-antarctic.jpeg"
              alt="Antarctic landscape showcasing environmental leadership"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
