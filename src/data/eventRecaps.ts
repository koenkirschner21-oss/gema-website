import { formatEventTime, getPastDatedEvents, type GemaEvent } from './events'

export type EventRecapImage = {
  src: string
  alt: string
  objectPosition?: string
}

export type EventRecap = {
  id: string
  title: string
  date: string
  shortRecap: string
  /** Optional full recap shown when Read more expands (replaces shortRecap). */
  moreRecap?: string | null
  /** Line under the title (e.g. collaboration credit). */
  subtitle?: string | null
  featuredImages: EventRecapImage[]
  /**
   * How the right-hand visual should render.
   * - `graphic`: single promotional image (contain), used by tote-style recaps
   * - `photos`: photo frame with cover cropping; 2+ images use a manual slideshow
   */
  visualMode?: 'graphic' | 'photos'
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
export const eventRecaps: EventRecap[] = [
  {
    id: 'ideathon-2026',
    title: 'Ideathon 2026',
    date: '2026-10-03',
    category: 'Collaboration',
    subtitle: 'In collaboration with Enactus Guelph',
    location: 'MacDonald Hall · University of Guelph',
    time: null,
    cost: null,
    shortRecap:
      'GEMA joined Enactus Guelph and other campus partners for Ideathon, a full-day innovation competition bringing together more than 120 University of Guelph students.',
    moreRecap:
      'GEMA joined Enactus Guelph and other campus partners for Ideathon, a full-day innovation competition that brought together more than 120 University of Guelph students. GEMA supported the Government & Public Policy stream with a workshop focused on identifying underserved groups, policy gaps, and opportunities for practical solutions, which participants then applied as they developed and pitched their ideas.',
    visualMode: 'photos',
    // Add workshop / group / speaker WebPs here (2–4 total) to enable the
    // manual slideshow: ideathon-2026-workshop, -group, -speaker.
    featuredImages: [
      {
        src: '/recaps/ideathon-2026-main.webp',
        alt: 'Ideathon participants and presenters during the event at MacDonald Hall',
        objectPosition: 'center 52%',
      },
    ],
    galleryUrl: null,
  },
]

export const eventRecapEmptyCopy =
  'Event recaps and photo galleries from the 2026–27 year will be added here throughout the semester.'

function recapFromEvent(event: GemaEvent): EventRecap {
  return {
    id: event.id,
    title: event.title,
    date: event.date as string,
    shortRecap: event.shortDescription,
    moreRecap: null,
    subtitle: null,
    featuredImages: event.image
      ? [
          {
            src: event.image,
            alt: `${event.title} promotional graphic`,
          },
        ]
      : [],
    visualMode: event.image ? 'graphic' : 'photos',
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

  // Oldest first so established recaps stay above newer additions
  // (Custom Tote Bag Decorating, then Ideathon 2026).
  return [...fromEvents, ...manual].sort((a, b) => a.date.localeCompare(b.date))
}
