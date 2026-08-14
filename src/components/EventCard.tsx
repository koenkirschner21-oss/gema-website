import {
  formatEventDate,
  formatEventTime,
  type GemaEvent,
} from '../data/events'
import './EventCard.css'

type EventCardProps = {
  event: GemaEvent
  compact?: boolean
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const time = formatEventTime(event)
  const className = ['event-card', compact ? 'event-card--compact' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      {compact ? null : (
        <div className="event-card__media">
          {event.image ? (
            <img src={event.image} alt="" />
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
            className="event-card__register"
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
