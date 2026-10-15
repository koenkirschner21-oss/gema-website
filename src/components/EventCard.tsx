import { useCallback, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { EventDetailsDialog } from './EventDetailsDialog'
import { BrandMark } from './BrandMark'
import { SiteImage } from './SiteImage'
import {
  formatEventDateLabel,
  formatEventTime,
  isPastEvent,
  parseISODate,
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
  showGraphicPlaceholder?: boolean
  onOpenDetails?: (event: GemaEvent) => void
}

function formatCoverDate(event: GemaEvent) {
  if (!event.date) {
    return null
  }

  return parseISODate(event.date).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
  })
}

function EventCoverFallback({ event }: { event?: GemaEvent }) {
  const dateLabel = event ? formatCoverDate(event) : null

  return (
    <div
      className="event-card__media event-card__media--fallback"
      aria-hidden="true"
    >
      <div className="event-card__fallback">
        <BrandMark size="sm" />
        <span className="event-card__fallback-accents">
          <span />
          <span />
          <span />
        </span>
        {event ? (
          <p className="event-card__fallback-title">{event.title}</p>
        ) : null}
        {dateLabel ? (
          <p className="event-card__fallback-date">{dateLabel}</p>
        ) : null}
      </div>
    </div>
  )
}

function EventMedia({ event }: { event: GemaEvent }) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(event.image) && !failed

  if (!showImage) {
    return <EventCoverFallback event={event} />
  }

  const fit = event.imageFit ?? 'contain'
  const position = event.imageObjectPosition ?? 'center'

  return (
    <div
      className={
        fit === 'cover'
          ? 'event-card__media event-card__media--graphic event-card__media--cover'
          : 'event-card__media event-card__media--graphic'
      }
      style={
        {
          '--event-media-fit': fit,
          '--event-media-position': position,
        } as CSSProperties
      }
    >
      <SiteImage
        src={event.image ?? undefined}
        alt={event.imageAlt || `${event.title} promotional graphic`}
        style={{
          objectFit: fit,
          objectPosition: position,
        }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function EventCard({
  event,
  compact = false,
  detailed = false,
  placeholder = false,
  readMoreTo,
  readMoreDetails = false,
  showGraphicPlaceholder = false,
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
        <EventCoverFallback />
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
  const showMedia = Boolean(event.image) || showGraphicPlaceholder
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
      {compact || !showMedia ? null : <EventMedia event={event} />}
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
            {description ? (
              <span className="event-card__summary">{description}</span>
            ) : null}
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
