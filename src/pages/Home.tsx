import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { aboutValues } from '../data/about'
import { getHomepageEvents } from '../data/events'
import { homeMedia } from '../data/home'
import { getPartnersWithLogos } from '../data/partners'
import { site } from '../data/site'
import './Home.css'

export function Home() {
  const homepageEvents = getHomepageEvents()
  const partnerLogos = getPartnersWithLogos()

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
                GEMA is the student association representing Government,
                Economics and Management students at the University of
                Guelph&apos;s Gordon S. Lang School of Business and Economics.
                We connect students through events, opportunities, professional
                development, and community.
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
              <h2>What Is GEMA?</h2>
              <p>
                GEMA represents students in the Government, Economics and
                Management major at the Gordon S. Lang School of Business and
                Economics.
              </p>
              <p>
                We create opportunities for connection, professional growth,
                and involvement beyond the classroom.
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
            {aboutValues.map((item, index) => (
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
            Learn More
          </Link>
        </Container>
      </section>

      {homepageEvents.length > 0 ? (
        <section className="home-events">
          <Container>
            <div className="home-events__intro">
              <h2>Upcoming Events</h2>
              <Link className="home-text-link home-text-link--inline" to="/events">
                View All Events
              </Link>
            </div>
            <div className="home-events__grid">
              {homepageEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="home-involve">
        <Container>
          <div className="home-involve__panel">
            <h2>Get involved with GEMA.</h2>
            <p>
              Attend events, join initiatives, apply for leadership
              opportunities when they open, and connect with the broader GEM
              community.
            </p>
            <div className="home-involve__actions">
              <Link className="home-button home-button--on-red" to="/get-involved">
                Get Involved
              </Link>
              <Link
                className="home-button home-button--on-red-secondary"
                to="/get-involved"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-partners">
        <Container>
          <h2>Our Partners</h2>
          {partnerLogos.length > 0 ? (
            <>
              <div className="home-partners__logos">
                {partnerLogos.map((partner) =>
                  partner.url ? (
                    <a
                      key={partner.id}
                      className="home-partners__logo"
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={partner.logo} alt={partner.name} />
                    </a>
                  ) : (
                    <div key={partner.id} className="home-partners__logo">
                      <img src={partner.logo} alt={partner.name} />
                    </div>
                  ),
                )}
              </div>
              <Link className="home-text-link" to="/partners">
                Explore Partnerships
              </Link>
            </>
          ) : (
            <div className="home-partners__invite">
              <p>Interested in working with GEMA?</p>
              <Link className="home-button home-button--primary" to="/partners">
                Explore Partnerships
              </Link>
            </div>
          )}
        </Container>
      </section>

      <section className="home-cta">
        <Container>
          <h2>Stay connected with GEMA.</h2>
          <p>
            Follow GEMA for events, opportunities, announcements, and community
            updates.
          </p>
          <div className="home-cta__actions">
            <a
              className="home-button home-button--primary"
              href={site.instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a
              className="home-button home-button--secondary"
              href={site.linkedin.href}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
          <Link className="home-text-link" to="/contact">
            Contact GEMA
          </Link>
        </Container>
      </section>
    </article>
  )
}
