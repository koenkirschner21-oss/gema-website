import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { getHomepageEvents } from '../data/events'
import {
  homeMedia,
  homePillars,
  homepageEventPlaceholderCount,
  pastPartnerPlaceholderCount,
} from '../data/home'
import { getPastPartnersWithLogos } from '../data/partners'
import './Home.css'

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
              <PhotoPlaceholder
                src={homeMedia.hero.src}
                label={homeMedia.hero.label}
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
              <h2>What is GEMA?</h2>
              <p>GEMA is where the GEM community comes together outside the classroom.</p>
              <p>
                We create opportunities for students to meet one another, take
                part in events, connect with professionals, build experience and
                have a voice within their program. Whether you want to attend
                your first event or take on a leadership role, GEMA gives GEM
                students more ways to make the most of their time at Guelph.
              </p>
              <Link className="home-text-link" to="/about">
                Learn About GEMA
              </Link>
            </div>
            <p className="home-intro__statement">
              A student association for GEM students at Lang.
            </p>
          </div>
        </Container>
      </section>

      <section className="home-do">
        <Container>
          <h2>What We Do</h2>
          <ul className="home-do__grid">
            {homePillars.map((item, index) => (
              <li key={item.title} data-accent={item.accent}>
                <span className="home-do__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
          <Link className="home-text-link" to="/about">
            Learn More About GEMA
          </Link>
        </Container>
      </section>

      <section className="home-events">
        <Container>
          <div className="home-events__intro">
            <h2>See what’s happening with GEMA.</h2>
            <p>
              From professional development and networking to social and
              community events, GEMA creates opportunities to connect throughout
              the year.
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
                  <EventCard key={`event-placeholder-${index}`} placeholder />
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
              <PhotoPlaceholder
                src={homeMedia.involve.src}
                label={homeMedia.involve.label}
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
            the GEM community. The organizations recognized here are previous
            partners and sponsors.
          </p>
          <div className="home-partners__logos">
            {pastPartnerLogos.length > 0
              ? pastPartnerLogos.map((partner) =>
                  partner.url ? (
                    <a
                      key={partner.id}
                      className="home-partners__logo"
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={partner.logo} alt={partner.name} />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div key={partner.id} className="home-partners__logo">
                      <img src={partner.logo} alt={partner.name} />
                    </div>
                  ),
                )
              : Array.from({ length: pastPartnerPlaceholderCount }, (_, index) => (
                  <div
                    key={`past-partner-placeholder-${index}`}
                    className="home-partners__logo is-placeholder"
                  >
                    <span>Past partner logo</span>
                  </div>
                ))}
          </div>
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
