import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { EventCard } from './EventCard'
import type { GemaEvent } from '../data/events'
import './EventsCarousel.css'

function getPageSize() {
  if (typeof window === 'undefined') {
    return 3
  }

  if (window.matchMedia('(max-width: 640px)').matches) {
    return 1
  }

  if (window.matchMedia('(max-width: 1080px)').matches) {
    return 2
  }

  return 3
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function startIndexForPage(pageIndex: number, size: number, count: number) {
  const maxStart = Math.max(0, count - size)
  return Math.min(pageIndex * size, maxStart)
}

export function EventsCarousel({ events }: { events: GemaEvent[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [pageSize, setPageSize] = useState(getPageSize)
  const [page, setPage] = useState(0)
  const labelId = useId()
  const pageCount = Math.max(1, Math.ceil(events.length / pageSize))
  const currentPage = Math.min(page, pageCount - 1)

  const goToPage = useCallback(
    (nextPage: number) => {
      const viewport = viewportRef.current
      if (!viewport) {
        return
      }

      const slides = viewport.querySelectorAll<HTMLElement>(
        '.events-carousel__slide',
      )
      const clamped = Math.max(0, Math.min(nextPage, pageCount - 1))
      const target = slides[startIndexForPage(clamped, pageSize, events.length)]
      setPage(clamped)

      if (!target) {
        return
      }

      const delta =
        target.getBoundingClientRect().left - viewport.getBoundingClientRect().left

      viewport.scrollTo({
        left: viewport.scrollLeft + delta,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    },
    [events.length, pageCount, pageSize],
  )

  useEffect(() => {
    function onResize() {
      setPageSize(getPageSize())
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleScroll() {
    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    const slides = [...viewport.querySelectorAll<HTMLElement>(
      '.events-carousel__slide',
    )]
    const viewportLeft = viewport.getBoundingClientRect().left
    let nearestPage = 0
    let nearestDelta = Number.POSITIVE_INFINITY

    for (let index = 0; index < pageCount; index += 1) {
      const slide = slides[startIndexForPage(index, pageSize, events.length)]
      if (!slide) {
        continue
      }

      const delta = Math.abs(slide.getBoundingClientRect().left - viewportLeft)
      if (delta < nearestDelta) {
        nearestDelta = delta
        nearestPage = index
      }
    }

    setPage(nearestPage)
  }

  if (events.length === 0) {
    return null
  }

  return (
    <div
      className="events-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="visually-hidden">
        Upcoming events
      </p>
      {pageCount > 1 ? (
        <div className="events-carousel__nav">
          <button
            type="button"
            aria-label="Previous events"
            disabled={currentPage <= 0}
            onClick={() => goToPage(currentPage - 1)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                goToPage(currentPage - 1)
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                goToPage(currentPage + 1)
              }
            }}
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Next events"
            disabled={currentPage >= pageCount - 1}
            onClick={() => goToPage(currentPage + 1)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                goToPage(currentPage - 1)
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                goToPage(currentPage + 1)
              }
            }}
          >
            Next
          </button>
        </div>
      ) : null}
      <div
        ref={viewportRef}
        className="events-carousel__viewport"
        onScroll={handleScroll}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="events-carousel__slide"
            aria-label={`${event.title}, ${index + 1} of ${events.length}`}
          >
            <EventCard event={event} readMoreDetails />
          </div>
        ))}
      </div>
      {pageCount > 1 ? (
        <div className="events-carousel__dots">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === currentPage
                  ? 'events-carousel__dot is-active'
                  : 'events-carousel__dot'
              }
              aria-label={`Show events group ${index + 1} of ${pageCount}`}
              aria-current={index === currentPage ? 'true' : undefined}
              onClick={() => goToPage(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
