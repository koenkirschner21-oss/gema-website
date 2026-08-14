import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { EventsCalendar } from '../components/EventsCalendar'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  eventsMedia,
  getFeaturedEvents,
  getFeaturedSectionTitle,
} from '../data/events'
import { site } from '../data/site'
import './Events.css'

export function Events() {
  const featuredEvents = getFeaturedEvents()
  const featuredTitle = getFeaturedSectionTitle()

  useEffect(() => {
    document.title = 'Events | GEMA'
  }, [])

  return (
    <article className="events">
      <section className="events-hero">
        <Container>
          <div className="events-hero__grid">
            <div className="events-hero__copy">
              <p className="events-eyebrow">EVENTS</p>
              <h1>Connect, learn, and get involved.</h1>
              <p className="events-lede">
                GEMA hosts professional, networking, social, and
                community-focused programming throughout the academic year.
                This page is where students can see what is happening now and
                what is coming next.
              </p>
            </div>
            <div className="events-hero__media">
              <PhotoPlaceholder
                src={eventsMedia.hero.src}
                label={eventsMedia.hero.label}
                alt={eventsMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="events-featured">
        <Container>
          <h2>{featuredTitle}</h2>
          {featuredEvents.length > 0 ? (
            <div className="events-featured__grid">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p className="events-empty__title">New events are on the way.</p>
              <p>
                Upcoming GEMA programming will appear here once dates and
                details are confirmed.
              </p>
              <div className="events-empty__actions">
                <a
                  className="events-button events-button--primary"
                  href={site.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Stay Connected
                  <span className="visually-hidden">
                    {' '}
                    on Instagram (opens in a new tab)
                  </span>
                </a>
                <Link
                  className="events-button events-button--secondary"
                  to="/get-involved"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="events-calendar">
        <Container>
          <h2>Events Calendar</h2>
          <EventsCalendar />
        </Container>
      </section>

      <section className="events-new">
        <Container>
          <div className="events-new__panel">
            <div>
              <h2>New to U of G or GEM?</h2>
              <p>
                GEMA events are an easy way to meet people, learn more about
                the community, and start getting involved.
              </p>
            </div>
            <div className="events-new__actions">
              <Link
                className="events-button events-button--primary"
                to="/get-involved"
              >
                Get Involved
              </Link>
              <Link
                className="events-button events-button--secondary"
                to="/about"
              >
                Learn About GEMA
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="events-partner">
        <Container>
          <div className="events-partner__panel">
            <h2>Host or Partner With GEMA</h2>
            <p>
              Organizations, alumni, faculty, professionals, and community
              partners are invited to collaborate on events, panels, networking
              opportunities, or student programming.
            </p>
            <Link
              className="events-button events-button--primary"
              to="/partners"
            >
              Explore Partnerships
            </Link>
          </div>
        </Container>
      </section>

      <section className="events-cta">
        <Container>
          <h2>Stay up to date.</h2>
          <p>
            Follow GEMA for event announcements, opportunities, and updates
            throughout the year.
          </p>
          <div className="events-cta__actions">
            <a
              className="events-button events-button--primary"
              href={site.instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link
              className="events-button events-button--secondary"
              to="/get-involved"
            >
              Get Involved
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
