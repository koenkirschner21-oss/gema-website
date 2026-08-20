import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '../components/Container'
import {
  contactDirect,
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

function InstagramIcon() {
  return (
    <svg className="contact-direct__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="12"
        cy="12"
        r="4.15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="contact-direct__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S.02 4.88.02 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.15h4.6V23H.2zM8.34 8.15h4.4v2.02h.06c.61-1.16 2.12-2.38 4.36-2.38 4.66 0 5.52 3.07 5.52 7.06V23h-4.6v-8.12c0-1.94-.03-4.43-2.7-4.43-2.7 0-3.12 2.11-3.12 4.29V23h-4.6z"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="contact-direct__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.2 2h2.72c.22 1.7 1.12 3.18 2.7 3.98A7.4 7.4 0 0 0 22.2 6.7v2.78a9.4 9.4 0 0 1-5.28-1.66v7.55A6.63 6.63 0 1 1 8.4 9.04v2.9a3.75 3.75 0 1 0 2.52 3.55V2z"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="contact-direct__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.25"
        y="5.5"
        width="17.5"
        height="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M3.5 6.25 12 13.1 20.5 6.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}

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

  const socials = [
    {
      label: site.instagram.label,
      href: site.instagram.href,
      icon: <InstagramIcon />,
    },
    {
      label: site.linkedin.label,
      href: site.linkedin.href,
      icon: <LinkedInIcon />,
    },
    {
      label: site.tiktok.label,
      href: site.tiktok.href,
      icon: <TikTokIcon />,
    },
  ]

  return (
    <article className="contact">
      <section className="contact-hero">
        <Container>
          <div className="contact-hero__content">
            <p className="contact-hero__label">{contactHero.eyebrow}</p>
            <span className="contact-hero__accent" aria-hidden="true" />
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

                  {formNotice ? (
                    <p className="contact-form__note" role="status">
                      {formNotice}
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

      <section className="contact-direct">
        <Container>
          <div className="contact-direct__grid">
            <div className="contact-direct__copy">
              <h2>{contactDirect.heading}</h2>
              <p>{contactDirect.copy}</p>
            </div>
            <ul className="contact-direct__links">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    className="contact-direct__link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {site.email ? (
                <li>
                  <a className="contact-direct__link" href={`mailto:${site.email}`}>
                    <EmailIcon />
                    <span>{site.email}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </Container>
      </section>
    </article>
  )
}
