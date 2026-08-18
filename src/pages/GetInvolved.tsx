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
                {item.cta ? (
                  item.cta.to.startsWith('#') ? (
                    <a className="involve-text-link" href={item.cta.to}>
                      {item.cta.label}
                    </a>
                  ) : (
                    <Link className="involve-text-link" to={item.cta.to}>
                      {item.cta.label}
                    </Link>
                  )
                ) : null}
                {item.social ? (
                  <div className="involve-ways__social">
                    <a
                      className="involve-text-link"
                      href={site.instagram.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {site.instagram.label}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                    <a
                      className="involve-text-link"
                      href={site.linkedin.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {site.linkedin.label}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="involve-openings" id="current-opportunities">
        <Container>
          {activeOpportunities.length > 0 ? (
            <>
              <h2>Current Opportunities</h2>
              <ul className="involve-openings__list">
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
            </>
          ) : (
            <div className="involve-openings__empty">
              <h2>No applications are currently open.</h2>
              <p>
                Recruitment opportunities open at different points throughout
                the year. Stay connected with GEMA to be the first to hear when
                new positions become available.
              </p>
              <div className="involve-openings__actions">
                <Link
                  className="involve-button involve-button--primary"
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
            <h2>New to GEM? You’re in the right place.</h2>
            <p>
              You don’t need a title or executive position to be part of the
              GEMA community. Attend an upcoming event, meet other students and
              start getting involved at your own pace.
            </p>
            <p>
              Recruitment, events and opportunities change throughout the year,
              so stay connected with GEMA to keep up with what’s happening and
              find new ways to get involved.
            </p>
            <div className="involve-new__actions">
              <Link className="involve-button involve-button--primary" to="/events">
                Explore Events
              </Link>
              <Link className="involve-button involve-button--secondary" to="/about">
                Learn About GEMA
              </Link>
            </div>
            <div className="involve-new__social">
              <a
                className="involve-text-link"
                href={site.instagram.href}
                target="_blank"
                rel="noreferrer"
              >
                {site.instagram.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <a
                className="involve-text-link"
                href={site.linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                {site.linkedin.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="involve-cta">
        <Container>
          <h2>Ready to get involved?</h2>
          <p>
            Start by exploring what’s happening with GEMA and find the
            opportunity that’s right for you.
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
