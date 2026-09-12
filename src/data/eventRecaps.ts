import { formatEventTime, getPastDatedEvents, type GemaEvent } from './events'

export type EventRecapImage = {
  src: string
  alt: string
}

export type EventRecap = {
  id: string
  title: string
  date: string
  shortRecap: string
  featuredImages: EventRecapImage[]
  galleryUrl: string | null
  category: string | null
  location: string | null
  time: string | null
  cost: string | null
}

/**
 * Past event recaps shown on /events.
 *
 * Add confirmed recaps here after events have taken place.
 * Use ISO dates (`YYYY-MM-DD`). Include 2–4 featured photos in
 * `public/recaps/` and a Google Drive or gallery URL when available.
 *
 * Dated events that have already occurred are also listed automatically
 * from `src/data/events.ts` until a matching recap id is added here.
 *
 * Example:
 * {
 *   id: 'example-recap',
 *   title: 'Event title',
 *   date: '2026-09-15',
 *   shortRecap: 'One or two sentences about the event.',
 *   featuredImages: [
 *     { src: '/recaps/example-1.jpg', alt: 'Students at the event' },
 *     { src: '/recaps/example-2.jpg', alt: 'GEMA community at the event' },
 *   ],
 *   galleryUrl: 'https://drive.google.com/drive/folders/example',
 *   category: 'Networking',
 *   location: 'Location',
 *   time: '6:00 PM – 8:00 PM',
 *   cost: null,
 * }
 */
export const eventRecaps: EventRecap[] = []

export const eventRecapEmptyCopy =
  'Event recaps and photo galleries from the 2026–27 year will be added here throughout the semester.'

function recapFromEvent(event: GemaEvent): EventRecap {
  return {
    id: event.id,
    title: event.title,
    date: event.date as string,
    shortRecap: event.shortDescription,
    featuredImages: event.image
      ? [
          {
            src: event.image,
            alt: `${event.title} promotional graphic`,
          },
        ]
      : [],
    galleryUrl: null,
    category: event.category || null,
    location: event.location,
    time: formatEventTime(event),
    cost: event.cost,
  }
}

export function getEventRecaps() {
  const manual = eventRecaps
  const fromEvents = getPastDatedEvents()
    .filter((event) => !manual.some((recap) => recap.id === event.id))
    .map(recapFromEvent)

  return [...manual, ...fromEvents].sort((a, b) => b.date.localeCompare(a.date))
}
