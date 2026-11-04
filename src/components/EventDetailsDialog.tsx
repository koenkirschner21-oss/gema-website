import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import {
  formatEventTime,
  formatPublicEventDate,
  isPastEvent,
  type GemaEvent,
} from '../data/events'
import { SiteImage } from './SiteImage'
import './EventDetailsDialog.css'

type EventDetailsDialogProps = {
  event: GemaEvent
  onClose: () => void
}

export function EventDetailsDialog({
  event,
  onClose,
}: EventDetailsDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [imageFailed, setImageFailed] = useState(false)
  const time = formatEventTime(event)
  const description = event.fullDescription || event.shortDescription
  const showRegistration = Boolean(event.registrationUrl) && !isPastEvent(event)
  const registrationLabel = event.registrationLabel?.trim() || 'RSVP'
  const titleId = `event-dialog-title-${event.id}`

  const descriptionId = `event-dialog-desc-${event.id}`

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const layout = document.querySelector('.layout')
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    layout?.setAttribute('inert', '')
    closeRef.current?.focus()

    function isFocusable(element: HTMLElement) {
      return !element.closest('[hidden]') && !element.hasAttribute('disabled')
    }

    function handleKey(keyEvent: KeyboardEvent) {
      if (keyEvent.key === 'Escape') {
        keyEvent.preventDefault()
        onClose()
        return
      }

      if (keyEvent.key !== 'Tab' || !panelRef.current) {
        return
      }

      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter(isFocusable)

      if (focusable.length === 0) {
        keyEvent.preventDefault()
        panelRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (keyEvent.shiftKey && document.activeElement === first) {
        keyEvent.preventDefault()
        last.focus()
      } else if (!keyEvent.shiftKey && document.activeElement === last) {
        keyEvent.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      layout?.removeAttribute('inert')
      document.removeEventListener('keydown', handleKey)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      className="event-dialog-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="event-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        {event.image && !imageFailed ? (
          <div
            className="event-dialog__media"
            style={
              {
                '--event-media-fit':
                  event.imageFitDialog ?? event.imageFit ?? 'contain',
                '--event-media-position':
                  event.imageObjectPositionDialog ??
                  event.imageObjectPosition ??
                  'center',
              } as CSSProperties
            }
          >
            <SiteImage
              src={event.image}
              alt={event.imageAlt || `${event.title} promotional graphic`}
              priority
              style={{
                objectFit:
                  event.imageFitDialog ?? event.imageFit ?? 'contain',
                objectPosition:
                  event.imageObjectPositionDialog ??
                  event.imageObjectPosition ??
                  'center',
              }}
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : null}

        <div className="event-dialog__body">
          <div className="event-dialog__top">
            <div>
              {event.category ? (
                <p className="event-dialog__category">{event.category}</p>
              ) : null}
              <h2 id={titleId}>{event.title}</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="event-dialog__close"
              aria-label={`Close details for ${event.title}`}
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <dl className="event-dialog__facts">
            {event.date ? (
              <div>
                <dt>Date</dt>
                <dd>{formatPublicEventDate(event.date)}</dd>
              </div>
            ) : event.approximateTiming ? (
              <div>
                <dt>Timing</dt>
                <dd>{event.approximateTiming}</dd>
              </div>
            ) : null}
            {time ? (
              <div>
                <dt>Time</dt>
                <dd>{time}</dd>
              </div>
            ) : null}
            {event.location ? (
              <div>
                <dt>Location</dt>
                <dd>{event.location}</dd>
              </div>
            ) : null}
            {event.cost ? (
              <div>
                <dt>Cost</dt>
                <dd>{event.cost}</dd>
              </div>
            ) : null}
          </dl>

          {description ? (
            <p className="event-dialog__copy" id={descriptionId}>{description}</p>
          ) : null}

          {showRegistration ? (
            <a
              className="event-dialog__rsvp"
              href={event.registrationUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              {registrationLabel}
              <span className="visually-hidden">
                {event.registrationLabel?.trim()
                  ? ' (opens in a new tab)'
                  : ` for ${event.title} (opens in a new tab)`}
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
