export type EventStatus = 'upcoming' | 'cancelled' | 'hidden'

export type FeaturedEventsMode = 'orientation' | 'standard'

export type GemaEvent = {
  id: string
  title: string
  date: string
  startTime: string | null
  endTime: string | null
  location: string | null
  shortDescription: string
  category: string
  registrationUrl: string | null
  image: string | null
  featured: boolean
  orientationWeek: boolean
  status: EventStatus
}

/**
 * Featured section mode.
 *
 * - 'orientation' → section title is "Orientation Week"
 *   and featured O-Week events are shown
 * - 'standard' → section title is "Upcoming Events"
 *   and regular featured events are shown
 *
 * Switch this value only. Do not change page layout.
 */
export const featuredEventsMode: FeaturedEventsMode = 'standard'

/**
 * GEMA events shown on /events.
 *
 * Add confirmed events here. Use ISO dates (`YYYY-MM-DD`).
 * Times and locations can be plain display strings.
 * Set `status: 'upcoming'` to publish an event.
 *
 * Example:
 * {
 *   id: 'example-event',
 *   title: 'Event title',
 *   date: '2026-09-15',
 *   startTime: '6:00 PM',
 *   endTime: '8:00 PM',
 *   location: 'Location',
 *   shortDescription: 'One or two sentences.',
 *   category: 'Networking',
 *   registrationUrl: null,
 *   image: null,
 *   featured: true,
 *   orientationWeek: false,
 *   status: 'upcoming',
 * }
 */
export const events: GemaEvent[] = []

export const eventsMedia = {
  hero: {
    src: null as string | null,
    label: 'Replace with GEMA event photo',
    alt: 'GEMA event',
  },
}

export function getVisibleEvents() {
  return events.filter((item) => item.status === 'upcoming')
}

export function getFeaturedSectionTitle() {
  return featuredEventsMode === 'orientation'
    ? 'Orientation Week'
    : 'Upcoming Events'
}

export function getFeaturedEvents() {
  const visible = getVisibleEvents()

  if (featuredEventsMode === 'orientation') {
    const selected = visible.filter(
      (item) => item.orientationWeek && item.featured,
    )
    return selected.length > 0
      ? selected
      : visible.filter((item) => item.orientationWeek)
  }

  return visible.filter((item) => item.featured)
}

export function getHomepageEvents(limit = 3) {
  const featured = getFeaturedEvents()
  const source = featured.length > 0 ? featured : getVisibleEvents()

  return [...source]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
}

export function getEventsByDate(isoDate: string) {
  return getVisibleEvents().filter((item) => item.date === isoDate)
}

export function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseISODate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatEventDate(isoDate: string) {
  return parseISODate(isoDate).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatEventTime(event: GemaEvent) {
  if (!event.startTime) {
    return null
  }

  return event.endTime
    ? `${event.startTime} – ${event.endTime}`
    : event.startTime
}

export function formatMonthLabel(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1).toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric',
  })
}

export function getEventDateSet() {
  return new Set(getVisibleEvents().map((item) => item.date))
}
