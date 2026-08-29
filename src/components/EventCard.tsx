import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  formatEventDate,
  formatEventTime,
  type GemaEvent,
} from '../data/events'
import './EventCard.css'

type EventCardProps = {
  event?: GemaEvent
  compact?: boolean
  detailed?: boolean
  placeholder?: boolean
  readMoreTo?: string
}

function EventPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="visually-hidden">Event photo to be added</span>
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />
}

export function EventCard({
  event,
  compact = false,
  detailed = false,
  placeholder = false,
  readMoreTo,
}: EventCardProps) {
  if (placeholder) {
    return (
      <article
        className="event-card event-card--placeholder"
        aria-label="Event details coming soon"
      >
        <div className="event-card__media" aria-hidden="true" />
        <div className="event-card__body">
          <h3>More Fall events are coming soon</h3>
          <p className="event-card__copy">
            Additional programming will be announced soon
          </p>
          <p className="event-card__status">Details coming soon</p>
        </div>
      </article>
    )
  }

  if (!event) {
    return null
  }

  const time = formatEventTime(event)
  const description = detailed
    ? event.fullDescription || event.shortDescription
    : event.shortDescription
  const className = ['event-card', compact ? 'event-card--compact' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      {compact ? null : (
        <div className="event-card__media">
          {event.image ? (
            <EventPhoto
              src={event.image}
              alt={`Promotional graphic for ${event.title}${event.location ? ` at ${event.location}` : ''}`}
            />
          ) : (
            <span className="visually-hidden">Event photo to be added</span>
          )}
        </div>
      )}
      <div className="event-card__body">
        <p className="event-card__date">{formatEventDate(event.date)}</p>
        {event.category ? (
          <p className="event-card__category">{event.category}</p>
        ) : null}
        <h3>{event.title}</h3>
        {time || event.location ? (
          <p className="event-card__meta">
            {time}
            {time && event.location ? ' · ' : null}
            {event.location}
          </p>
        ) : null}
        {description ? (
          <p className="event-card__copy">
            {description}
            {readMoreTo ? (
              <>
                {' '}
                <Link className="event-card__more" to={readMoreTo}>
                  Read more
                  <span className="visually-hidden">
                    {' '}
                    about {event.title}
                  </span>
                </Link>
              </>
            ) : null}
          </p>
        ) : null}
        {event.registrationUrl ? (
          <a
            className="event-card__cta"
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
          >
            RSVP
            <span className="visually-hidden">
              {' '}
              for {event.title} (opens in a new tab)
            </span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
