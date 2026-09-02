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
}

/**
 * Past event recaps shown on /events.
 *
 * Add confirmed recaps here after events have taken place.
 * Use ISO dates (`YYYY-MM-DD`). Include 2–4 featured photos and a
 * Google Drive or gallery URL when available.
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
 * }
 */
export const eventRecaps: EventRecap[] = []

export const eventRecapEmptyCopy =
  'Event recaps and photo galleries from the 2026–27 year will be added here throughout the semester.'

export function getEventRecaps() {
  return [...eventRecaps].sort((a, b) => b.date.localeCompare(a.date))
}
