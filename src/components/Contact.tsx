import { useEffect, useRef, useState } from 'react'
import { fadeInOnScroll, staggerFadeIn, cleanupScrollTriggers } from '../utils/animations'
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
    if (headerRef.current) {
      fadeInOnScroll(headerRef.current, { y: 30 })
    }

    if (infoRef.current) {
      fadeInOnScroll(infoRef.current, { y: 30, delay: 0.1 })

      const items = infoRef.current.querySelectorAll('.contact-item')
      staggerFadeIn(items, {
        y: 20,
        stagger: 0.1,
        trigger: infoRef.current,
      })
    }

    if (formRef.current) {
      fadeInOnScroll(formRef.current, { y: 30, delay: 0.2 })
    }

    return () => cleanupScrollTriggers()
  }, [])

  return (
    <section className="contact section section-numbered" id={SECTION_IDS.contact} data-section-number="07">
      <div className="contact-container">
        <div className="contact-header" ref={headerRef}>
          <h2 className="contact-title">
            Share your kaupapa | <em>Kōrero</em>
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
                Kā manaakitaka. Your message has been sent successfully.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-message form-error" role="alert">
                Sorry, there was an error sending your message. Please try again
                or email us directly.
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
