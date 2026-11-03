import { useState } from 'react'
import Words from './Words'
import { SECTION_IDS, CONTACT_INFO } from '../constants/site'

function Contact() {
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
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section className="contact section" id={SECTION_IDS.contact}>
      <div className="container contact-layout">
        <div className="contact-side">
          <div className="section-heading">
            <span className="eyebrow" data-reveal>Get in touch</span>
            <h2 className="section-title" data-words><Words text="Kōrero" /></h2>
          </div>
          <p className="contact-intro" data-reveal>
            Share your kaupapa. If you're thinking about strategy, governance or research work, we'd
            love to hear from you.
          </p>

          <dl className="contact-details" data-rule>
            <div className="contact-item" data-rule="bottom" data-reveal>
              <dt className="eyebrow">Email</dt>
              <dd><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></dd>
            </div>
            <div className="contact-item" data-rule="bottom" data-reveal>
              <dt className="eyebrow">Phone</dt>
              <dd><a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a></dd>
            </div>
            <div className="contact-item" data-rule="bottom" data-reveal>
              <dt className="eyebrow">Location</dt>
              <dd>{CONTACT_INFO.location}</dd>
            </div>
          </dl>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-label="Contact form"
          data-reveal
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="eyebrow">Name</label>
              <input type="text" id="name" name="name" autoComplete="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="eyebrow">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="organization" className="eyebrow">Organisation (optional)</label>
            <input type="text" id="organization" name="organization" autoComplete="organization" />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="eyebrow">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What are you working on, and how could we help?"
              required
            ></textarea>
          </div>

          {formStatus === 'success' && (
            <div className="form-message" role="status">
              Kā mihi, we'll be in touch.
            </div>
          )}

          {formStatus === 'error' && (
            <div className="form-message form-error" role="alert">
              Something went wrong. Please email us directly at{' '}
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
            </div>
          )}

          <button type="submit" className="btn" disabled={formStatus === 'submitting'}>
            {formStatus === 'submitting' ? 'Sending…' : 'Send message'}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
