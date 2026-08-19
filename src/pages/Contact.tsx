import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '../components/Container'
import {
  contactConnect,
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
          <div className="contact-hero__content">
            <p className="contact-eyebrow">{contactHero.eyebrow}</p>
            <h1>{contactHero.headline}</h1>
            <p className="contact-lede">{contactHero.copy}</p>
          </div>
        </Container>
      </section>

      <section className="contact-form-section" id="send-message">
        <Container>
          <div className="contact-form-section__inner">
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
                        aria-required="true"
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
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-subject">
                      Subject / Reason for Contact
                    </label>
                    <select
                      id="contact-subject"
                      name="_subject"
                      required
                      aria-required="true"
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
                      rows={7}
                      required
                      aria-required="true"
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
          </div>
        </Container>
      </section>

      <section className="contact-routes">
        <Container>
          <h2>Looking for Something Specific?</h2>
          <ul className="contact-routes__grid">
            {contactRoutes.map((item) => (
              <li key={item.to}>
                <Link to={item.to} data-accent={item.accent}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="contact-routes__cue" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="contact-connect">
        <Container>
          <h2>{contactConnect.heading}</h2>
          <ul className="contact-connect__grid">
            <li>
              <h3>{contactConnect.general.title}</h3>
              <p>{contactConnect.general.copy}</p>
              {site.email ? (
                <a className="contact-text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <p className="contact-connect__placeholder">
                  {contactConnect.general.emailPlaceholder}
                </p>
              )}
            </li>
            <li>
              <h3>{contactConnect.instagram.title}</h3>
              <p>{contactConnect.instagram.copy}</p>
              <a
                className="contact-text-link"
                href={site.instagram.href}
                target="_blank"
                rel="noreferrer"
              >
                {contactConnect.instagram.linkLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <h3>{contactConnect.linkedin.title}</h3>
              <p>{contactConnect.linkedin.copy}</p>
              <a
                className="contact-text-link"
                href={site.linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                {contactConnect.linkedin.linkLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Container>
      </section>
    </article>
  )
}
