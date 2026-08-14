import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import {
  contactFormEndpoint,
  contactReasons,
  contactRoutes,
} from '../data/contact'
import { site } from '../data/site'
import './Contact.css'

export function Contact() {
  const [formNotice, setFormNotice] = useState<string | null>(null)
  const formIsConnected = Boolean(contactFormEndpoint)

  useEffect(() => {
    document.title = 'Contact GEMA | GEMA'
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (formIsConnected) {
      return
    }

    event.preventDefault()
    setFormNotice(
      'This form is not connected yet. It will be enabled before launch, and your message was not sent.',
    )
  }

  return (
    <article className="contact">
      <section className="contact-hero">
        <Container>
          <p className="contact-eyebrow">CONTACT</p>
          <h1>Contact GEMA</h1>
          <p className="contact-lede">
            Students, partners, alumni, faculty, and community members are
            welcome to get in touch. Use the options below to reach the right
            part of GEMA.
          </p>
        </Container>
      </section>

      <section className="contact-options">
        <Container>
          <h2>Get in Touch</h2>
          <ul className="contact-options__grid">
            <li data-accent="red">
              <h3>General Inquiries</h3>
              <p>Questions about the association, collaborations, or anything else.</p>
              {site.email ? (
                <a className="contact-options__action" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <p className="contact-options__placeholder">
                  General GEMA email to be added
                </p>
              )}
            </li>
            <li data-accent="gold">
              <h3>Instagram</h3>
              <p>Event updates, recruitment, and announcements.</p>
              <a
                className="contact-options__action"
                href={site.instagram.href}
                target="_blank"
                rel="noreferrer"
              >
                {site.instagram.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li data-accent="blue">
              <h3>LinkedIn</h3>
              <p>Professional updates, organization news, and community highlights.</p>
              <a
                className="contact-options__action"
                href={site.linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                {site.linkedin.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Container>
      </section>

      <section className="contact-form-section">
        <Container>
          <h2>Send Us a Message</h2>
          <form
            className="contact-form"
            action={contactFormEndpoint ?? undefined}
            method={formIsConnected ? 'POST' : undefined}
            onSubmit={handleSubmit}
          >
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
              <label htmlFor="contact-subject">Subject / Reason for Contact</label>
              <select id="contact-subject" name="_subject" required defaultValue="">
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

            <button className="contact-button contact-button--primary" type="submit">
              Send Message
            </button>

            {!formIsConnected ? (
              <p className="contact-form__note" role="status">
                {formNotice ??
                  'Form submissions are not connected yet. This will be enabled before launch.'}
              </p>
            ) : null}
          </form>
        </Container>
      </section>

      <section className="contact-routes">
        <Container>
          <h2>Looking for Something Specific?</h2>
          <ul className="contact-routes__list">
            {contactRoutes.map((item) => (
              <li key={item.to} data-accent={item.accent}>
                <Link to={item.to}>
                  <span>
                    <strong>{item.title}</strong>
                    <span className="contact-routes__copy">{item.copy}</span>
                  </span>
                  <span className="contact-routes__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="contact-cta">
        <Container>
          <h2>Stay connected with GEMA.</h2>
          <p>
            Follow GEMA for announcements, opportunities, and upcoming events.
          </p>
          <div className="contact-cta__actions">
            <a
              className="contact-button contact-button--primary"
              href={site.instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a
              className="contact-button contact-button--secondary"
              href={site.linkedin.href}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>
    </article>
  )
}
