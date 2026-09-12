import { Link } from 'react-router-dom'
import { BrandMark } from '../components/BrandMark'
import { Container } from '../components/Container'
import { EventsCalendar } from '../components/EventsCalendar'
import { EventRecapCard } from '../components/EventRecapCard'
import { EventsCarousel } from '../components/EventsCarousel'
import {
  featuredEmptyState,
  getFeaturedSectionTitle,
  getPublicUpcomingEvents,
  upcomingEventsNote,
} from '../data/events'
import { eventRecapEmptyCopy, getEventRecaps } from '../data/eventRecaps'
import './Events.css'

export function Events() {
  const upcomingEvents = getPublicUpcomingEvents()
  const upcomingTitle = getFeaturedSectionTitle()
  const eventRecaps = getEventRecaps()

  return (
    <article className="events">
      <section className="events-hero">
        <Container>
          <div className="events-hero__content">
            <BrandMark size="hero" />
            <p className="events-hero__label">Events</p>
            <span className="events-hero__accent" aria-hidden="true" />
            <h1>Connect, learn, and get involved.</h1>
            <p className="events-lede">
              GEMA hosts events throughout the year that bring students
              together, create opportunities to learn and connect, and
              strengthen the GEM community beyond the classroom.
            </p>
          </div>
        </Container>
      </section>

      <section className="events-list" id="featured-events">
        <Container>
          <h2>{upcomingTitle}</h2>
          {upcomingEvents.length > 0 ? (
            <>
              <p className="events-section-note">{upcomingEventsNote}</p>
              <EventsCarousel events={upcomingEvents} />
            </>
          ) : (
            <p className="events-section-copy">{featuredEmptyState.copy}</p>
          )}
        </Container>
      </section>

      <section className="events-calendar">
        <Container>
          <div className="events-calendar__intro">
            <h2>Events Calendar</h2>
            <p className="events-section-copy">
              View upcoming GEMA programming at a glance and plan ahead for
              events throughout the year.
            </p>
          </div>
          <EventsCalendar />
        </Container>
      </section>

      <section className="events-recaps" id="past-event-recaps">
        <Container>
          <h2>Past Event Recaps</h2>
          {eventRecaps.length > 0 ? (
            <div className="events-recaps__list">
              {eventRecaps.map((recap) => (
                <EventRecapCard key={recap.id} recap={recap} />
              ))}
            </div>
          ) : (
            <p className="events-section-copy events-recaps__empty">
              {eventRecapEmptyCopy}
            </p>
          )}
        </Container>
      </section>

      <section className="events-new">
        <Container>
          <div className="events-new__panel">
            <div className="events-new__copy">
              <h2>New to U of G or GEM?</h2>
              <p>
                GEMA events are an easy way to meet people, learn more about the
                community, and start getting involved.
              </p>
            </div>
            <div className="events-new__actions">
              <Link
                className="events-button events-button--primary"
                to="/get-involved"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="events-partner">
        <Container>
          <div className="events-partner__grid">
            <div className="events-partner__copy">
              <h2>Host or Partner With GEMA</h2>
              <p>
                Organizations, alumni, faculty, professionals, and community
                partners are invited to collaborate on events, panels,
                networking opportunities, and student programming.
              </p>
            </div>
            <div className="events-partner__action">
              <Link
                className="events-button events-button--primary"
                to="/partners#partner-with-gema"
              >
                Explore Partnerships
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
