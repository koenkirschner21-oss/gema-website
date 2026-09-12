import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { EventDetailsDialog } from './EventDetailsDialog'
import { SiteImage } from './SiteImage'
import {
  formatEventDateLabel,
  formatEventTime,
  isPastEvent,
  type GemaEvent,
} from '../data/events'
import './EventCard.css'

type EventCardProps = {
  event?: GemaEvent
  compact?: boolean
  detailed?: boolean
  placeholder?: boolean
  readMoreTo?: string
  readMoreDetails?: boolean
  onOpenDetails?: (event: GemaEvent) => void
}

function EventPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="visually-hidden">Event photo to be added</span>
  }

  return (
    <SiteImage
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  )
}

export function EventCard({
  event,
  compact = false,
  detailed = false,
  placeholder = false,
  readMoreTo,
  readMoreDetails = false,
  onOpenDetails,
}: EventCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const closeDetails = useCallback(() => setDetailsOpen(false), [])
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
  const dateLabel = formatEventDateLabel(event)
  const description = detailed
    ? event.fullDescription || event.shortDescription
    : event.shortDescription
  const showRegistration = Boolean(event.registrationUrl) && !isPastEvent(event)
  const className = [
    'event-card',
    compact ? 'event-card--compact' : '',
    readMoreDetails ? 'event-card--clickable' : '',
  ]
    .filter(Boolean)
    .join(' ')

  function openDetails() {
    if (onOpenDetails && event) {
      onOpenDetails(event)
      return
    }

    setDetailsOpen(true)
  }

  return (
    <article className={className}>
      {compact || !event.image ? null : (
        <div className="event-card__media">
          <EventPhoto
            src={event.image}
            alt={`${event.title} promotional graphic`}
          />
        </div>
      )}
      <div className="event-card__body">
        {dateLabel ? (
          <p className="event-card__date">{dateLabel}</p>
        ) : null}
        {event.category ? (
          <p className="event-card__category">{event.category}</p>
        ) : null}
        <h3>{event.title}</h3>
        {time || event.location || event.cost ? (
          <p className="event-card__meta">
            {[time, event.location, event.cost].filter(Boolean).join(' · ')}
          </p>
        ) : null}
        {description || readMoreDetails || readMoreTo ? (
          <p className="event-card__copy">
            {description}
            {readMoreDetails ? (
              <>
                {description ? ' ' : null}
                <button
                  type="button"
                  className="event-card__more"
                  aria-haspopup="dialog"
                  aria-expanded={detailsOpen}
                  onClick={openDetails}
                >
                  Read more
                  <span className="visually-hidden"> about {event.title}</span>
                </button>
              </>
            ) : readMoreTo ? (
              <>
                {description ? ' ' : null}
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
        {showRegistration ? (
          <a
            className="event-card__cta"
            href={event.registrationUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP
            <span className="visually-hidden">
              {' '}
              for {event.title} (opens in a new tab)
            </span>
          </a>
        ) : null}
      </div>
      {detailsOpen ? (
        <EventDetailsDialog event={event} onClose={closeDetails} />
      ) : null}
    </article>
  )
}
