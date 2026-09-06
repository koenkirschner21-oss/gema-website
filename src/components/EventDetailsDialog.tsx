import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  formatEventDate,
  formatEventTime,
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
          <div className="event-dialog__media">
            <SiteImage
              src={event.image}
              alt={`${event.title} promotional graphic`}
              priority
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
            <div>
              <dt>Date</dt>
              <dd>{formatEventDate(event.date)}</dd>
            </div>
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

          {event.registrationUrl ? (
            <a
              className="event-dialog__rsvp"
              href={event.registrationUrl}
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
      </div>
    </div>,
    document.body,
  )
}
