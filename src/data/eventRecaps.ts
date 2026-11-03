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
  {
    id: '5k-for-charity-mefsa',
    title: '5K for Charity',
    date: '2026-10-25',
    category: 'In collaboration with MEFSA',
    subtitle: 'In collaboration with MEFSA and campus partners',
    location: 'Guelph Arboretum',
    time: '10:00 AM – 12:00 PM',
    cost: null,
    shortRecap:
      'GEMA joined MEFSA and other campus clubs for a charity 5K supporting the Canadian Cancer Society, ending with a shared cheque presentation.',
    moreRecap:
      'GEMA joined MEFSA and other campus clubs for a charity 5K at the Guelph Arboretum supporting the Canadian Cancer Society and breast cancer research. Students turned out for the run, giveaways, and raffle prizes, and the day closed with a group cheque presentation recognizing the funds raised together.',
    visualMode: 'photos',
    featuredImages: [
      {
        src: '/recaps/5k-for-charity-2026-group.jpg',
        alt: 'GEMA students and campus partners presenting a Canadian Cancer Society donation cheque after the 5K for Charity',
        objectPosition: 'center 48%',
      },
      {
        src: '/recaps/5k-for-charity-2026-cheque.jpg',
        alt: 'Two students holding the Canadian Cancer Society donation cheque at the 5K for Charity',
        objectPosition: 'center 40%',
      },
    ],
    galleryUrl: null,
  },
  {
    id: 'langsgiving-carnival-pumpkin-painting',
    title: 'Fall Fair — Pumpkin Painting',
    date: '2026-10-28',
    category: null,
    subtitle: null,
    location: 'Johnston Green',
    time: '1:00 PM – 5:00 PM',
    cost: null,
    shortRecap:
      'Students gathered with GEMA on Johnston Green for pumpkin painting, seasonal activities, and Fall Fair community programming.',
    moreRecap:
      'Students gathered with GEMA on Johnston Green for Fall Fair pumpkin painting, seasonal activities, and community programming. The afternoon mixed creative table activities with a lively outdoor campus atmosphere.',
    visualMode: 'photos',
    featuredImages: [
      {
        src: '/recaps/fall-fair-2026-table.jpg',
        alt: 'GEMA students at the Fall Fair pumpkin painting table on Johnston Green',
        objectPosition: 'center 42%',
      },
      {
        src: '/recaps/fall-fair-2026-pumpkins-1.jpg',
        alt: 'Two students holding painted pumpkins at the GEMA Fall Fair',
        objectPosition: 'center 34%',
      },
      {
        src: '/recaps/fall-fair-2026-pumpkins-2.jpg',
        alt: 'Two students smiling with painted pumpkins at the GEMA Fall Fair',
        objectPosition: 'center 36%',
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
