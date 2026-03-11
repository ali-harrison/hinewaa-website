import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { cleanupScrollTriggers } from '../utils/animations'
import logoImage from '../assets/images/Vector.png'
import { SECTION_IDS, NAV_LINKS, COMPANY, CONTACT_INFO } from '../constants/site'

function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
        setTimeout(() => setFormStatus('idle'), 6000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 6000)
      }
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 6000)
    }
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // ── Title line reveal ─────────────────────────────────────────────────────
    gsap.fromTo(
      header.querySelectorAll('.title-text'),
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
      }
    )

    // ── Contact items stagger ─────────────────────────────────────────────────
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current.querySelectorAll('.contact-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // ── Form fade in ──────────────────────────────────────────────────────────
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="contact section section-numbered" id={SECTION_IDS.contact} data-section-number="06">
      <div className="contact-container">
        <div className="contact-header" ref={headerRef}>
          <h2 className="contact-title">
            <span className="title-line">
              <span className="title-text">Share your kaupapa</span>
            </span>
            <span className="title-line">
              <span className="title-text"><em>Kōrero</em></span>
            </span>
          </h2>
          <p className="contact-intro">
            If you'd like to explore potential mahi with Hinewaa - whether strategy, systems innovation, or research - we'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info" ref={infoRef}>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email</strong>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
              <div className="contact-item">
                <strong>Phone</strong>
                <a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a>
              </div>
              <div className="contact-item">
                <strong>Location</strong>
                <p>{CONTACT_INFO.location}</p>
              </div>
            </div>
          </div>

          <form
            className="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
            aria-label="Contact form"
          >
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
              <div className="form-message form-success" role="status">
                Ngā mihi — we'll be in touch.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-message form-error" role="alert">
                Something went wrong, please email us directly at{' '}
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting'
                ? 'Sending...'
                : 'Start a Conversation'}
              <span>→</span>
            </button>
          </form>
        </div>
      </div>

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <img
                  src={logoImage}
                  alt={COMPANY.name}
                  className="footer-logo-image"
                />
              </div>
              <p className="footer-copyright">
                &copy; {COMPANY.founded} {COMPANY.name}. All rights reserved.
              </p>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              <ul>
                {NAV_LINKS.map(link => (
                  <li key={link.id}>
                    <a href={link.href}>
                      {link.id === SECTION_IDS.hero ? link.english : link.reo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-social">
              <h4>Whakapā mai</h4>
              <div className="social-links">
                <a href={`mailto:${CONTACT_INFO.email}`} className="social-link">
                  Email
                </a>
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
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
