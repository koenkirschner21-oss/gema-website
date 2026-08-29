import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import {
  involveMedia,
  involvementBenefits,
  involvementPaths,
  involveSocial,
  openingsEmptyState,
} from '../data/getInvolved'
import { getActiveOpportunities } from '../data/opportunities'
import { site } from '../data/site'
import './GetInvolved.css'

function InvolveMedia({
  src,
  alt,
  ratio,
}: {
  src: string | null
  alt: string
  ratio: 'wide' | 'editorial'
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure className={`photo-placeholder photo-placeholder--${ratio}`}>
      {showImage ? (
        <img src={src ?? undefined} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <span className="visually-hidden">{alt}</span>
      )}
    </figure>
  )
}

function InstagramIcon() {
  return (
    <svg className="involve-social__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
    <svg className="involve-social__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S.02 4.88.02 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.15h4.6V23H.2zM8.34 8.15h4.4v2.02h.06c.61-1.16 2.12-2.38 4.36-2.38 4.66 0 5.52 3.07 5.52 7.06V23h-4.6v-8.12c0-1.94-.03-4.43-2.7-4.43-2.7 0-3.12 2.11-3.12 4.29V23h-4.6z"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="involve-social__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.2 2h2.72c.22 1.7 1.12 3.18 2.7 3.98A7.4 7.4 0 0 0 22.2 6.7v2.78a9.4 9.4 0 0 1-5.28-1.66v7.55A6.63 6.63 0 1 1 8.4 9.04v2.9a3.75 3.75 0 1 0 2.52 3.55V2z"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="involve-social__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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

function SocialIcon({ platform }: { platform: (typeof involveSocial)[number]['platform'] }) {
  if (platform === 'instagram') {
    return <InstagramIcon />
  }

  if (platform === 'linkedin') {
    return <LinkedInIcon />
  }

  return <TikTokIcon />
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
                There are plenty of ways to get involved with GEMA throughout
                the year. Attend an event, meet other GEM students, contribute
                to an initiative or apply for a leadership opportunity when
                positions become available.
              </p>
              <div className="involve-hero__actions">
                <a
                  className="involve-button involve-button--primary"
                  href="#current-opportunities"
                >
                  Explore Opportunities
                </a>
                <Link className="involve-button involve-button--secondary" to="/events">
                  View Events
                </Link>
              </div>
            </div>
            <div className="involve-hero__media">
              <InvolveMedia
                src={involveMedia.hero.src}
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
              <li key={item.title}>
                <Link to={item.to} data-accent={item.accent}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="involve-openings" id="current-opportunities">
        <Container>
          <h2>Current Opportunities</h2>
          {activeOpportunities.length > 0 ? (
            <ul className="involve-openings__grid">
              {activeOpportunities.map((item) => (
                <li key={item.id}>
                  {item.category ? (
                    <p className="involve-openings__category">{item.category}</p>
                  ) : null}
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
                      Apply Now
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
              <h3>{openingsEmptyState.heading}</h3>
              <p className="involve-openings__intro">{openingsEmptyState.copy}</p>
              <Link className="involve-text-link" to={openingsEmptyState.linkTo}>
                {openingsEmptyState.linkLabel}
              </Link>
            </div>
          )}
        </Container>
      </section>

      <section className="involve-why">
        <Container>
          <div className="involve-why__grid">
            <div className="involve-why__media">
              <InvolveMedia
                src={involveMedia.why.src}
                alt={involveMedia.why.alt}
                ratio="editorial"
              />
            </div>
            <div className="involve-why__content">
              <h2>Why Get Involved?</h2>
              <ul className="involve-why__benefits">
                {involvementBenefits.map((item) => (
                  <li key={item.title} data-accent={item.accent}>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="involve-new">
        <Container>
          <div className="involve-new__panel">
            <div className="involve-new__copy">
              <h2>New to GEM?</h2>
              <p>
                Attending a GEMA event is one of the easiest ways to meet people
                and get familiar with the community.
              </p>
            </div>
            <div className="involve-new__actions">
              <Link className="involve-button involve-button--primary" to="/events">
                Explore Events
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="involve-social" id="stay-connected">
        <Container>
          <div className="involve-social__layout">
            <div className="involve-social__media">
              <InvolveMedia
                src={involveMedia.social.src}
                alt={involveMedia.social.alt}
                ratio="editorial"
              />
            </div>
            <div className="involve-social__panel">
              <h2>Stay Connected</h2>
              <p>
                Follow GEMA for event updates, recruitment news, and community
                highlights.
              </p>
              <ul className="involve-social__links">
                {involveSocial.map((item) => {
                  const destination = site[item.platform]

                  return (
                    <li key={item.platform}>
                      <a
                        className="involve-social__link"
                        href={destination.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SocialIcon platform={item.platform} />
                        <span>{item.linkLabel}</span>
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </li>
                  )
                })}
                {site.email ? (
                  <li>
                    <a className="involve-social__link" href={`mailto:${site.email}`}>
                      <EmailIcon />
                      <span>Email</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
