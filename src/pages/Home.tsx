import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { getHomepageEvents } from '../data/events'
import {
  homeIntroPoints,
  homeMedia,
  homePillars,
  homepageEventPlaceholderCount,
  pastPartnerPlaceholderCount,
} from '../data/home'
import { getPastPartnersWithLogos } from '../data/partners'
import './Home.css'

function HomeMedia({
  src,
  alt,
  ratio,
}: {
  src: string | null
  alt: string
  ratio: 'wide'
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

function HomePartnerLogo({
  src,
  name,
}: {
  src: string
  name: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="visually-hidden">{name}</span>
  }

  return <img src={src} alt={name} onError={() => setFailed(true)} />
}

export function Home() {
  const homepageEvents = getHomepageEvents()
  const pastPartnerLogos = getPastPartnersWithLogos()

  useEffect(() => {
    document.title = 'GEMA | Government, Economics & Management Association'
  }, [])

  return (
    <article className="home">
      <section className="home-hero">
        <Container>
          <div className="home-hero__grid">
            <div className="home-hero__copy">
              <p className="home-eyebrow">
                Government • Economics • Management
              </p>
              <h1>Connecting the GEM community beyond the classroom.</h1>
              <p className="home-lede">
                The Government, Economics & Management Association (GEMA)
                represents GEM students at the University of Guelph’s Gordon S.
                Lang School of Business and Economics. Through events,
                professional development, leadership opportunities and community
                initiatives, GEMA helps students make more of their university
                experience.
              </p>
              <div className="home-hero__actions">
                <Link className="home-button home-button--primary" to="/get-involved">
                  Get Involved
                </Link>
                <Link className="home-button home-button--secondary" to="/events">
                  Explore Events
                </Link>
              </div>
            </div>
            <div className="home-hero__media">
              <HomeMedia
                src={homeMedia.hero.src}
                alt={homeMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-intro">
        <Container>
          <div className="home-intro__grid">
            <div className="home-intro__copy">
              <h2>What Is GEMA?</h2>
              <p>
                GEMA is the student association for the Government, Economics
                & Management major at the University of Guelph.
              </p>
              <p>
                We bring students together, represent the GEM community and
                create opportunities to connect, develop professionally and get
                involved beyond the classroom.
              </p>
              <Link className="home-text-link" to="/about">
                Learn About GEMA
              </Link>
            </div>
            <ul className="home-intro__points">
              {homeIntroPoints.map((item) => (
                <li key={item.title} data-accent={item.accent}>
                  <span className="home-intro__mark" aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="home-do">
        <Container>
          <h2>What We Do</h2>
          <ul className="home-do__grid">
            {homePillars.map((item) => (
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="home-events">
        <Container>
          <div className="home-events__intro">
            <h2>See what’s happening with GEMA.</h2>
            <p>
              From professional development and networking to community events,
              there are plenty of ways to connect throughout the year.
            </p>
            <Link className="home-text-link home-text-link--inline" to="/events">
              View All Events
            </Link>
          </div>
          <div className="home-events__grid">
            {homepageEvents.length > 0
              ? homepageEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              : Array.from({ length: homepageEventPlaceholderCount }, (_, index) => (
                  <article
                    key={`event-placeholder-${index}`}
                    className="home-event-placeholder"
                    aria-label="Event placeholder"
                  >
                    <div className="home-event-placeholder__media" />
                    <p>Event details coming soon</p>
                  </article>
                ))}
          </div>
        </Container>
      </section>

      <section className="home-involve">
        <Container>
          <div className="home-involve__grid">
            <div className="home-involve__panel">
              <h2>Find out how to get involved with GEMA.</h2>
              <p>
                Attend an event. Meet other GEM students. Support an initiative.
                Apply for a leadership opportunity when positions open.
              </p>
              <p>
                However you choose to participate, getting involved is one of
                the best ways to become part of the GEM community beyond the
                classroom.
              </p>
              <div className="home-involve__actions">
                <Link className="home-button home-button--on-red" to="/get-involved">
                  Get Involved
                </Link>
                <Link
                  className="home-button home-button--on-red-secondary"
                  to="/get-involved#current-opportunities"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>
            <div className="home-involve__media">
              <HomeMedia
                src={homeMedia.involve.src}
                alt={homeMedia.involve.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-partners">
        <Container>
          <h2>Creating more opportunities together.</h2>
          <p className="home-partners__copy">
            GEMA has worked with organizations and community partners to support
            student programming, professional development and experiences for
            the GEM community.
          </p>
          <p className="home-partners__note">
            The organizations recognized here are previous partners and
            sponsors.
          </p>
          {pastPartnerLogos.length > 0 ? (
            <div className="home-partners__logos">
              {pastPartnerLogos.map((partner) =>
                partner.url ? (
                  <a
                    key={partner.id}
                    className="home-partners__logo"
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HomePartnerLogo src={partner.logo} name={partner.name} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div key={partner.id} className="home-partners__logo">
                    <HomePartnerLogo src={partner.logo} name={partner.name} />
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="home-partners__empty">
              <p className="home-partners__empty-label">Past partners</p>
              <div className="home-partners__logos">
                {Array.from({ length: pastPartnerPlaceholderCount }, (_, index) => (
                  <div
                    key={`past-partner-placeholder-${index}`}
                    className="home-partners__logo is-placeholder"
                  >
                    <span>Logo</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link className="home-button home-button--primary" to="/partners">
            Partner With GEMA
          </Link>
        </Container>
      </section>

      <section className="home-cta">
        <Container>
          <h2>Have a question or want to connect?</h2>
          <p>
            Whether you’re a student, alumni, organization or member of the
            University of Guelph community, we’d be happy to hear from you.
          </p>
          <div className="home-cta__actions">
            <Link className="home-button home-button--primary" to="/contact">
              Contact GEMA
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
