import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/xyzrdbql', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 5000)
      }
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  useEffect(() => {
    // Ensure elements are visible by default
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1 })
    }
    if (infoRef.current) {
      gsap.set(infoRef.current, { opacity: 1 })
    }
    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 1 })
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

    // Info section slide in from left
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(infoRef.current, { opacity: 1, x: 0 }),
        },
      }
    )

    // Form slide in from right
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(formRef.current, { opacity: 1, x: 0 }),
        },
      }
    )

    // Animate contact items with stagger
    const contactItems = document.querySelectorAll('.contact-item')
    contactItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15 + 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-header" ref={headerRef}>
          <h2 className="contact-title">
            Share Your <em>Kaupapa</em>
          </h2>
          <p className="contact-intro">
            If you'd like to explore potential mahi with Hinewaa - whether strategy, innovation, or research - we'd love to hear from you. Tell us a little about your kaupapa and we'll be in touch.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info" ref={infoRef}>
            <h3>Get In Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email</strong>
                <a href="mailto:aimee@hinewaa.com">aimee@hinewaa.com</a>
              </div>
              <div className="contact-item">
                <strong>Phone</strong>
                <a href="tel:021408174">021 408 174</a>
              </div>
              <div className="contact-item">
                <strong>Location</strong>
                <p>Aotearoa New Zealand</p>
              </div>
            </div>
          </div>

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input type="text" id="organization" name="organization" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your kaupapa</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Share your goals, challenges, or areas where you'd like to collaborate..."
                required
              ></textarea>
            </div>

            {formStatus === 'success' && (
              <div className="form-message form-success">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-message form-error">
                Sorry, there was an error sending your message. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Start a Conversation'}
              <span>→</span>
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <img
                  src="/src/assets/images/Vector.png"
                  alt="Hinewaa"
                  className="footer-logo-image"
                />
              </div>
              <p className="footer-copyright">
                &copy; 2025 Hinewaa Ltd. All rights reserved.
              </p>
            </div>

            <nav className="footer-nav">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#impact">Impact</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>

            <div className="footer-social">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="mailto:aimee@hinewaa.com" className="social-link">
                  <span>Email</span>
                </a>
                <a href="https://linkedin.com/company/hinewaa" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Contact
