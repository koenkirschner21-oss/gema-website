import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { EventsCalendar } from '../components/EventsCalendar'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  eventsMedia,
  eventsPagePlaceholderCount,
  featuredEmptyState,
  getFeaturedEvents,
  getFeaturedSectionCopy,
  getFeaturedSectionTitle,
} from '../data/events'
import './Events.css'

export function Events() {
  const featuredEvents = getFeaturedEvents()
  const featuredTitle = getFeaturedSectionTitle()
  const featuredCopy = getFeaturedSectionCopy()

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
              <h1>Events</h1>
              <p className="events-lede">
                GEMA hosts events throughout the year that bring students
                together, create opportunities to learn and connect, and
                strengthen the GEM community beyond the classroom.
              </p>
              <div className="events-hero__actions">
                <a
                  className="events-button events-button--primary"
                  href="#featured-events"
                >
                  View Upcoming Events
                </a>
                <Link
                  className="events-button events-button--secondary"
                  to="/get-involved"
                >
                  Get Involved
                </Link>
              </div>
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

      <section className="events-featured" id="featured-events">
        <Container>
          <h2>{featuredTitle}</h2>
          <p className="events-section-copy">{featuredCopy}</p>
          {featuredEvents.length > 0 ? (
            <div className="events-featured__grid">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <>
              <div className="events-featured__grid">
                {Array.from({ length: eventsPagePlaceholderCount }, (_, index) => (
                  <EventCard key={`event-placeholder-${index}`} placeholder />
                ))}
              </div>
              <div className="events-empty">
                <p className="events-empty__title">{featuredEmptyState.heading}</p>
                <p>{featuredEmptyState.copy}</p>
                <div className="events-empty__actions">
                  <Link
                    className="events-button events-button--primary"
                    to="/get-involved"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>

      <section className="events-calendar">
        <Container>
          <h2>Events Calendar</h2>
          <p className="events-section-copy">
            View upcoming GEMA programming at a glance and plan ahead for
            events throughout the semester.
          </p>
          <EventsCalendar />
        </Container>
      </section>

      <section className="events-new">
        <Container>
          <div className="events-new__panel">
            <div>
              <h2>New to U of G or GEM?</h2>
              <p>
                Attending a GEMA event is one of the easiest ways to meet other
                students, learn more about the community and start getting
                involved.
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
            <h2>Interested in hosting or partnering on an event?</h2>
            <p>
              GEMA works with organizations, professionals, alumni, faculty and
              community partners to create programming that provides meaningful
              value to students.
            </p>
            <div className="events-partner__actions">
              <Link
                className="events-button events-button--primary"
                to="/partners"
              >
                Explore Partnerships
              </Link>
              <Link
                className="events-button events-button--secondary"
                to="/contact?reason=partnership"
              >
                Contact GEMA
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="events-cta">
        <Container>
          <h2>Find your next GEMA event.</h2>
          <p>
            Events are one of the easiest ways to connect with other GEM
            students and become more involved in the community.
          </p>
          <div className="events-cta__actions">
            <Link
              className="events-button events-button--primary"
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
