import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { EventCard } from '../components/EventCard'
import { EventsCalendar } from '../components/EventsCalendar'
import {
  eventsMedia,
  featuredEmptyState,
  getFeaturedEvents,
  getFeaturedSectionCopy,
  getFeaturedSectionTitle,
} from '../data/events'
import './Events.css'

function EventsMedia({
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
              <h1>Connect, learn, and get involved.</h1>
              <p className="events-lede">
                GEMA hosts events throughout the year that bring students
                together, create opportunities to learn and connect, and
                strengthen the GEM community beyond the classroom.
              </p>
            </div>
            <div className="events-hero__media">
              <EventsMedia
                src={eventsMedia.hero.src}
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
          {featuredEvents.length > 0 ? (
            <>
              <p className="events-section-copy">{featuredCopy}</p>
              <div className="events-featured__grid">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="events-empty">
              <p className="events-empty__title">{featuredEmptyState.heading}</p>
              <p>{featuredEmptyState.copy}</p>
            </div>
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
                to="/partners"
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
