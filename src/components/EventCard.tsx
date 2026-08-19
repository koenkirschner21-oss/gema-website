import { useState } from 'react'
import {
  formatEventDate,
  formatEventTime,
  type GemaEvent,
} from '../data/events'
import './EventCard.css'

type EventCardProps = {
  event?: GemaEvent
  compact?: boolean
  placeholder?: boolean
}

function EventPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="visually-hidden">Event photo to be added</span>
  }

  return <img src={src} alt="" onError={() => setFailed(true)} />
}

export function EventCard({
  event,
  compact = false,
  placeholder = false,
}: EventCardProps) {
  if (placeholder) {
    return (
      <article className="event-card event-card--placeholder" aria-label="Development event placeholder">
        <div className="event-card__media">
          <span className="event-card__media-label">Event image</span>
        </div>
        <div className="event-card__body">
          <p className="event-card__date">Date</p>
          <p className="event-card__category">Category</p>
          <h3>Event name</h3>
          <p className="event-card__meta">Time · Location</p>
          <p className="event-card__copy">Short description</p>
          <span className="event-card__cta">View Event</span>
        </div>
      </article>
    )
  }

  if (!event) {
    return null
  }

  const time = formatEventTime(event)
  const className = ['event-card', compact ? 'event-card--compact' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      {compact ? null : (
        <div className="event-card__media">
          {event.image ? (
            <EventPhoto src={event.image} />
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
        {event.shortDescription ? (
          <p className="event-card__copy">{event.shortDescription}</p>
        ) : null}
        {event.registrationUrl ? (
          <a
            className="event-card__cta"
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Register
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
