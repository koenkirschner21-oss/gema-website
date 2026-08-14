import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  involveMedia,
  involvementBenefits,
  involvementPaths,
} from '../data/getInvolved'
import { getActiveOpportunities } from '../data/opportunities'
import { site } from '../data/site'
import './GetInvolved.css'

function InstagramIcon() {
  return (
    <svg
      className="involve-connect__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className="involve-connect__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.1 3.78-2.1 4.04 0 4.79 2.66 4.79 6.12V23h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V23h-4z"
      />
    </svg>
  )
}

export function GetInvolved() {
  const activeOpportunities = getActiveOpportunities()

  useEffect(() => {
    document.title = 'Get Involved | GEMA'
  }, [])

  return (
    <article className="involve">
      <section className="involve-hero">
        <Container>
          <div className="involve-hero__grid">
            <div className="involve-hero__copy">
              <p className="involve-eyebrow">GET INVOLVED</p>
              <h1>Find your place in the GEMA community.</h1>
              <p className="involve-lede">
                Students can take part through events, leadership opportunities,
                initiatives, and the wider GEM community. Whether you want to
                show up, contribute, or take on more responsibility, there is a
                place to start.
              </p>
            </div>
            <div className="involve-hero__media">
              <PhotoPlaceholder
                src={involveMedia.hero.src}
                label={involveMedia.hero.label}
                alt={involveMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="involve-ways">
        <Container>
          <h2>Ways to Get Involved</h2>
          <ul className="involve-ways__grid">
            {involvementPaths.map((item) => (
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="involve-openings">
        <Container>
          <h2>Current Opportunities</h2>
          {activeOpportunities.length > 0 ? (
            <ul className="involve-openings__list">
              {activeOpportunities.map((item) => (
                <li key={item.id}>
                  <p className="involve-openings__category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.deadline ? (
                    <p className="involve-openings__deadline">
                      Apply by {item.deadline}
                    </p>
                  ) : null}
                  {item.applicationUrl ? (
                    <a
                      className="involve-button involve-button--primary"
                      href={item.applicationUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apply
                      <span className="visually-hidden">
                        {' '}
                        for {item.title} (opens in a new tab)
                      </span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="involve-openings__empty">
              <p className="involve-openings__empty-title">
                There are no open applications at the moment.
              </p>
              <p>
                Recruitment is announced when roles open. Follow GEMA for
                updates, or start by coming to an event.
              </p>
              <div className="involve-openings__actions">
                <a
                  className="involve-button involve-button--primary"
                  href={site.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow GEMA
                  <span className="visually-hidden">
                    {' '}
                    on Instagram (opens in a new tab)
                  </span>
                </a>
                <Link
                  className="involve-button involve-button--secondary"
                  to="/events"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="involve-why">
        <Container>
          <h2>Why Get Involved?</h2>
          <div className="involve-why__grid">
            <div className="involve-why__media">
              <PhotoPlaceholder
                src={involveMedia.why.src}
                label={involveMedia.why.label}
                alt={involveMedia.why.alt}
                ratio="square"
              />
            </div>
            <ul className="involve-why__benefits">
              {involvementBenefits.map((item) => (
                <li key={item.title} data-accent={item.accent}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="involve-new">
        <Container>
          <div className="involve-new__panel">
            <div>
              <h2>New to GEM?</h2>
              <p>
                Attending a GEMA event is one of the easiest ways to meet people
                and get familiar with the community.
              </p>
            </div>
            <Link className="involve-button involve-button--primary" to="/events">
              Explore Events
            </Link>
          </div>
        </Container>
      </section>

      <section className="involve-connect">
        <Container>
          <h2>Stay Connected</h2>
          <div className="involve-connect__grid">
            <a
              className="involve-connect__item"
              href={site.instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              <div>
                <h3>Instagram</h3>
                <p>
                  Primary channel for event updates, recruitment, and
                  announcements.
                </p>
                <span className="involve-connect__action">
                  Visit Instagram
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </span>
              </div>
            </a>
            <a
              className="involve-connect__item"
              href={site.linkedin.href}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
              <div>
                <h3>LinkedIn</h3>
                <p>
                  Professional updates, organization news, and community
                  highlights.
                </p>
                <span className="involve-connect__action">
                  Visit LinkedIn
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </span>
              </div>
            </a>
          </div>
        </Container>
      </section>

      <section className="involve-cta">
        <Container>
          <h2>Start by showing up.</h2>
          <p>
            Come to an event, stay connected for updates, or apply when a role
            opens.
          </p>
          <div className="involve-cta__actions">
            <Link className="involve-button involve-button--primary" to="/events">
              Explore Events
            </Link>
            <Link
              className="involve-button involve-button--secondary"
              to="/about/team"
            >
              Meet the Team
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
