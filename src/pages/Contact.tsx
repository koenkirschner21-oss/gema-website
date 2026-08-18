import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '../components/Container'
import {
  contactChannels,
  contactFormCopy,
  contactFormEndpoint,
  contactHero,
  contactReasons,
  contactRoutes,
  contactSuccess,
  getContactReasonFromQuery,
} from '../data/contact'
import { site } from '../data/site'
import './Contact.css'

export function Contact() {
  const [searchParams] = useSearchParams()
  const selectedReason = getContactReasonFromQuery(searchParams.get('reason'))
  const [formNotice, setFormNotice] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formIsConnected = Boolean(contactFormEndpoint)

  useEffect(() => {
    document.title = 'Contact GEMA | GEMA'
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formIsConnected || !contactFormEndpoint) {
      setFormNotice(contactFormCopy.blockedSubmit)
      return
    }

    setIsSubmitting(true)
    setFormNotice(null)

    const payload = new FormData(event.currentTarget)

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        setFormNotice(contactFormCopy.error)
        return
      }

      setSubmitted(true)
    } catch {
      setFormNotice(contactFormCopy.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <article className="contact">
      <section className="contact-hero">
        <Container>
          <p className="contact-eyebrow">{contactHero.eyebrow}</p>
          <h1>{contactHero.headline}</h1>
          <p className="contact-lede">{contactHero.copy}</p>
        </Container>
      </section>

      <section className="contact-options">
        <Container>
          <h2>Get in Touch</h2>
          <ul className="contact-options__grid">
            <li data-accent="red">
              <h3>{contactChannels.general.title}</h3>
              <p>{contactChannels.general.copy}</p>
              {site.email ? (
                <a className="contact-options__action" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <p className="contact-options__placeholder">
                  {contactChannels.general.emailPlaceholder}
                </p>
              )}
            </li>
            <li data-accent="gold">
              <h3>{contactChannels.partnerships.title}</h3>
              <p>{contactChannels.partnerships.copy}</p>
              <Link
                className="contact-button contact-button--primary contact-options__cta"
                to={contactChannels.partnerships.to}
              >
                {contactChannels.partnerships.cta}
              </Link>
            </li>
            <li data-accent="blue">
              <h3>{contactChannels.social.title}</h3>
              <p>{contactChannels.social.copy}</p>
              <div className="contact-options__social">
                <a
                  className="contact-options__action"
                  href={site.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.instagram.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                <a
                  className="contact-options__action"
                  href={site.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.linkedin.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      <section className="contact-form-section" id="send-message">
        <Container>
          {submitted ? (
            <div className="contact-success">
              <h2>{contactSuccess.heading}</h2>
              <p>{contactSuccess.copy}</p>
            </div>
          ) : (
            <>
              <h2>{contactFormCopy.heading}</h2>
              <p className="contact-form-intro">{contactFormCopy.copy}</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-organization">
                    Organization
                    <span className="contact-field__hint">Optional</span>
                  </label>
                  <input
                    id="contact-organization"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Reason for Contact</label>
                  <select
                    id="contact-subject"
                    name="_subject"
                    required
                    key={selectedReason || 'default'}
                    defaultValue={selectedReason}
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                  />
                </div>

                <input
                  className="visually-hidden"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button
                  className="contact-button contact-button--primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {!formIsConnected || formNotice ? (
                  <p className="contact-form__note" role="status">
                    {formNotice ?? contactFormCopy.disconnected}
                  </p>
                ) : null}
              </form>
            </>
          )}
        </Container>
      </section>

      <section className="contact-routes">
        <Container>
          <h2>Looking for something specific?</h2>
          <ul className="contact-routes__list">
            {contactRoutes.map((item) => (
              <li key={item.to}>
                <span className="contact-routes__label">{item.title}</span>
                <Link to={item.to}>{item.cta}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  )
}
