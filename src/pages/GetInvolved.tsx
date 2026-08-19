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
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="involve-openings" id="current-opportunities">
        <Container>
          <h2>Current Opportunities</h2>
          {activeOpportunities.length > 0 ? (
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
          ) : (
            <div className="involve-openings__empty">
              <p className="involve-openings__status">
                {openingsEmptyState.heading}
              </p>
              <p>{openingsEmptyState.copy}</p>
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
            <div>
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

      <section className="involve-social">
        <Container>
          <h2>Stay Connected</h2>
          <ul className="involve-social__grid">
            {involveSocial.map((item) => {
              const destination = site[item.platform]

              return (
                <li key={item.platform}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <a
                    className="involve-text-link"
                    href={destination.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.linkLabel}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </article>
  )
}
