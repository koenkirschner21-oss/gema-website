export type EventStatus =
  | 'confirmed'
  | 'tentative'
  | 'planned'
  | 'cancelled'
  | 'hidden'

export type FeaturedEventsMode = 'orientation' | 'standard'

export type GemaEvent = {
  id: string
  title: string
  status: EventStatus
  date: string | null
  approximateTiming: string | null
  startTime: string | null
  endTime: string | null
  location: string | null
  shortDescription: string
  fullDescription: string | null
  category: string
  cost: string | null
  registrationUrl: string | null
  /** Public event image path, or null to use the branded fallback cover. */
  image: string | null
  /** Optional alt text for `image`. Falls back to a title-based label. */
  imageAlt?: string | null
  /** How the image fills the card frame. Defaults to contain for posters. */
  imageFit?: 'cover' | 'contain'
  /** Optional CSS object-position for intentional cropping in cards. */
  imageObjectPosition?: string
  /** Optional fit override for the event details dialog media frame. */
  imageFitDialog?: 'cover' | 'contain'
  /** Optional object-position override for the event details dialog. */
  imageObjectPositionDialog?: string
  featured: boolean
  orientationWeek: boolean
}

/**
 * Featured section mode.
 *
 * - 'orientation' → heading is "Orientation Week"
 *   and Orientation Week events are shown
 * - 'standard' → heading is "Upcoming Events"
 *   and dated upcoming events are shown
 *
 * Switch this value only. Do not change page layout.
 */
export const featuredEventsMode: FeaturedEventsMode = 'standard'

/**
 * GEMA events shown on /events.
 *
 * `status` is the internal certainty level:
 * - confirmed: exact date/time/location may be published
 * - tentative: a working date exists; shown publicly as upcoming
 * - planned: approximate or multi-option timing; not rendered publicly
 * - cancelled / hidden: excluded from all public lists
 *
 * Public rendering:
 * - dated future confirmed/tentative events → Upcoming Events + calendar
 * - undated planned / multi-date events → kept in data, not shown
 * - past dated events → Past Event Recaps (auto list)
 *
 * Use ISO dates (`YYYY-MM-DD`) for confirmed and tentative events.
 * Planned events use `approximateTiming` and leave `date` null.
 * Cancelled and hidden events are excluded from public lists.
 * Leave unused fields `null`. Do not invent missing details.
 * Set `image` when a real graphic exists; null uses the branded fallback.
 *
 * Example (confirmed):
 * {
 *   id: 'example-event',
 *   title: 'Event title',
 *   status: 'confirmed',
 *   date: '2026-09-15',
 *   approximateTiming: null,
 *   startTime: '6:00 PM',
 *   endTime: '8:00 PM',
 *   location: 'Location',
 *   shortDescription: 'One or two sentences.',
 *   fullDescription: null,
 *   category: 'Networking',
 *   cost: null,
 *   registrationUrl: null,
 *   image: null,
 *   featured: true,
 *   orientationWeek: false,
 * }
 */
export const events: GemaEvent[] = [
  {
    id: 'custom-tote-bag-decorating',
    title: 'Custom Tote Bag Decorating',
    status: 'confirmed',
    date: '2026-09-07',
    approximateTiming: null,
    startTime: '12:00 PM',
    endTime: '2:00 PM',
    location: 'Branion Plaza',
    shortDescription:
      'Join GEMA during Orientation Week for a free custom tote bag decorating event. Meet new people, learn more about the GEMA community, and personalize your own tote using materials provided.',
    fullDescription:
      'Join GEMA during Orientation Week for a free custom tote bag decorating event. Plain tote bags are provided for customization, along with materials such as stickers, glitter pens, rhinestones, and non-scented fabric markers. All students are welcome to meet new people, learn more about GEMA, and personalize a tote.',
    category: 'Orientation Week',
    cost: 'Free',
    registrationUrl:
      'https://uoguelph.campusgroups.com/gema/rsvp_boot?id=375495',
    image: '/custom-tote-bag-decorating.webp',
    featured: true,
    orientationWeek: true,
  },
  {
    id: 'langsgiving-pie-day-lsa',
    title: 'Langsgiving — Pie Day x LSA',
    status: 'confirmed',
    date: '2026-10-08',
    approximateTiming: null,
    startTime: '11:00 AM',
    endTime: '3:00 PM',
    location: 'Lang Plaza',
    shortDescription:
      'A Thanksgiving fundraiser and donation-based event where GEMA and other student organizations will be selling pie at Lang Plaza.',
    fullDescription: null,
    category: 'Collaboration',
    cost: null,
    registrationUrl: null,
    image: '/events/langsgiving-pie-day-oct8.png',
    imageAlt:
      'Langsgiving Week 1 event graphic highlighting Pie Day on October 8 at Lang Plaza',
    imageFit: 'cover',
    imageObjectPosition: 'center 78%',
    imageFitDialog: 'contain',
    imageObjectPositionDialog: 'center center',
    featured: true,
    orientationWeek: false,
  },
  {
    id: '5k-for-charity-mefsa',
    title: '5K for Charity',
    status: 'confirmed',
    date: '2026-10-25',
    approximateTiming: null,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Guelph Arboretum',
    shortDescription:
      'A charity 5K supporting the Canadian Cancer Society and breast cancer research, with participant giveaways and raffle prizes.',
    fullDescription: null,
    category: 'In collaboration with MEFSA',
    cost: null,
    registrationUrl: null,
    image: '/events/5k-for-charity-2026.png',
    imageAlt:
      '5K for Charity event graphic for October 25 at the Guelph Arboretum',
    imageFit: 'cover',
    imageObjectPosition: 'center 50%',
    featured: true,
    orientationWeek: false,
  },
  {
    id: 'langsgiving-carnival-pumpkin-painting',
    title: 'Fall Fair — Pumpkin Painting',
    status: 'confirmed',
    date: '2026-10-28',
    approximateTiming: null,
    startTime: '1:00 PM',
    endTime: '5:00 PM',
    location: 'Johnston Green',
    shortDescription:
      'A Halloween-themed Langsgiving Carnival activity featuring pumpkin painting, pumpkin pong, and seasonal treats.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: '/events/fall-fair-pumpkin-painting.png',
    imageAlt: 'Fall Fair Pumpkin Painting event graphic',
    imageFit: 'cover',
    imageObjectPosition: 'center 46%',
    featured: true,
    orientationWeek: false,
  },
  {
    id: 'perspectives-with-professors',
    title: 'Perspectives with Professors',
    status: 'confirmed',
    date: '2026-11-09',
    approximateTiming: null,
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    location: 'University Club',
    shortDescription:
      'Connect with Guelph professors beyond the classroom through rapid-fire questions, real-world scenarios, an interactive agree/disagree game, student Q&A, and advice from faculty.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: '/events/perspectives-with-professors.png',
    imageAlt: 'Perspectives with Professors event graphic',
    imageFit: 'contain',
    imageObjectPosition: 'center center',
    imageFitDialog: 'contain',
    imageObjectPositionDialog: 'center center',
    featured: true,
    orientationWeek: false,
  },
  {
    id: 'christmas-ornament-painting-movie-night',
    title: 'Christmas Ornament Painting + Movie Night',
    status: 'confirmed',
    date: '2026-12-01',
    approximateTiming: null,
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    location: 'The Lookout',
    shortDescription:
      'A Christmas-themed social featuring ornament painting, a movie, and seasonal snacks.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: '/events/christmas-ornament-painting-movie-night.png',
    imageAlt: 'Christmas Ornament Painting and Movie Night event graphic',
    imageFit: 'cover',
    imageObjectPosition: 'center 48%',
    featured: true,
    orientationWeek: false,
  },
  {
    id: 'inside-the-executive-mind',
    title: 'Inside the Executive Mind',
    status: 'confirmed',
    date: '2027-03-25',
    approximateTiming: null,
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    location: 'University Club',
    shortDescription:
      'A professional-development event featuring business leaders sharing insights from their careers and industries.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: '/events/inside-the-executive-mind.png',
    imageAlt: 'Inside the Executive Mind event graphic',
    imageFit: 'contain',
    imageObjectPosition: 'center center',
    imageFitDialog: 'contain',
    imageObjectPositionDialog: 'center center',
    featured: true,
    orientationWeek: false,
  },
  {
    id: 'legal-industry-night-gcla',
    title: 'Legal Industry Night with GCLA',
    status: 'planned',
    date: null,
    approximateTiming: 'Jan 28 or Feb 3–4, 2027 · University Club or Peter Clark Hall',
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    location: null,
    shortDescription:
      'A career-focused event where students can hear from professionals about their paths in the legal industry and connect with organizations supporting law-school preparation.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    // Temporary reuse of Get Involved “Why Get Involved?” photo; stays non-public until date finalized.
    image: '/get-involved-why.webp',
    imageAlt: 'GEMA team or event photography',
    imageFit: 'cover',
    imageObjectPosition: 'center 35%',
    featured: false,
    orientationWeek: false,
  },
  {
    id: 'candy-gram',
    title: 'Candy Gram',
    status: 'planned',
    date: null,
    approximateTiming: 'Feb 10 or 11, 2027 · University Centre',
    startTime: '12:00 PM',
    endTime: '2:00 PM',
    location: null,
    shortDescription:
      'A Valentine’s-themed campus activation featuring GEM-themed cards and candy.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: null,
    featured: false,
    orientationWeek: false,
  },
  {
    id: 'international-womens-day',
    title: 'International Women’s Day Event',
    status: 'planned',
    date: null,
    approximateTiming: 'Mar 8 or 9, 2027 · location TBD',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    location: null,
    shortDescription:
      'A community and wellness event planned around International Women’s Day.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: null,
    featured: false,
    orientationWeek: false,
  },
  {
    id: 'stress-buster-goodie-bags',
    title: 'Stress Buster Goodie Bags',
    status: 'planned',
    date: null,
    approximateTiming: 'Apr 5, 6, or 8, 2027 · University Centre',
    startTime: '12:00 PM',
    endTime: '2:00 PM',
    location: null,
    shortDescription:
      'A pre-exam initiative offering students small wellness and study-support items heading into finals.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: null,
    featured: false,
    orientationWeek: false,
  },
  {
    id: 'game-night',
    title: 'Game Night',
    status: 'cancelled',
    date: null,
    approximateTiming: null,
    startTime: null,
    endTime: null,
    location: null,
    shortDescription:
      'Trivia, board games, and other competitive games designed to bring GEM students together for a casual night of fun and friendly competition.',
    fullDescription: null,
    category: '',
    cost: null,
    registrationUrl: null,
    image: null,
    featured: false,
    orientationWeek: false,
  },
]

export const eventsMedia = {
  hero: {
    src: null as string | null,
    label: 'GEMA students at an event',
    alt: 'GEMA students at an event',
  },
}

export const featuredSectionCopy = {
  orientation: {
    heading: 'Orientation Week',
    copy: 'Start the year with GEMA. Explore our Orientation Week events and find opportunities to meet other students, connect with the GEM community and get involved from the beginning.',
  },
  standard: {
    heading: 'Upcoming Events',
    copy: 'See what’s coming up with GEMA and find your next opportunity to connect, learn or get involved.',
  },
}

export const upcomingEventsNote =
  'Event details may be updated as plans are finalized.'

export const tentativeSectionCopy = {
  heading: 'Tentatively Scheduled',
  copy: 'These events have working dates that are not yet finalized. Times, locations, and other details will be added as they are confirmed.',
}

export const plannedSectionCopy = {
  heading: 'Planned for 2026–27',
  copy: 'These events are part of GEMA’s 2026–27 programming. Exact dates will be announced as they are confirmed.',
}

export const featuredEmptyState = {
  heading: 'More events are on the way.',
  copy: 'GEMA programming is updated throughout the year. Check back soon for upcoming events and announcements.',
}

export const featuredPlaceholderNote =
  'Fall programming will appear here as events are finalized.'

export const featuredPlaceholderCount = 3

export const eventStatusLabels: Record<
  'confirmed' | 'tentative' | 'planned',
  string
> = {
  confirmed: 'Confirmed',
  tentative: 'Tentative',
  planned: 'Planned',
}

function compareByDate(a: GemaEvent, b: GemaEvent) {
  return (a.date ?? '').localeCompare(b.date ?? '')
}

function isDatedPublicEvent(item: GemaEvent) {
  return (
    (item.status === 'confirmed' || item.status === 'tentative') &&
    item.date !== null
  )
}

export function getConfirmedUpcomingEvents() {
  const today = toISODate(new Date())

  return events
    .filter(
      (item) =>
        item.status === 'confirmed' && item.date !== null && item.date >= today,
    )
    .sort(compareByDate)
}

export function getTentativeEvents() {
  const today = toISODate(new Date())

  return events
    .filter(
      (item) =>
        item.status === 'tentative' &&
        (item.date === null || item.date >= today),
    )
    .sort(compareByDate)
}

export function getPlannedEvents() {
  return events.filter((item) => item.status === 'planned')
}

/** Dated upcoming events shown publicly and on the calendar. */
export function getPublicUpcomingEvents() {
  const today = toISODate(new Date())

  return events
    .filter((item) => isDatedPublicEvent(item) && (item.date as string) >= today)
    .sort(compareByDate)
}

export function getPastDatedEvents() {
  const today = toISODate(new Date())

  return events
    .filter((item) => isDatedPublicEvent(item) && (item.date as string) < today)
    .sort((a, b) => compareByDate(b, a))
}

export function isPastEvent(event: GemaEvent) {
  return Boolean(event.date && event.date < toISODate(new Date()))
}

/** Dated upcoming events. Used by the date-based calendar. */
export function getVisibleEvents() {
  return getPublicUpcomingEvents()
}

export function getFeaturedSectionTitle() {
  return featuredSectionCopy[featuredEventsMode].heading
}

export function getFeaturedSectionCopy() {
  return featuredSectionCopy[featuredEventsMode].copy
}

export function getFeaturedEvents() {
  const visible = getPublicUpcomingEvents()

  if (featuredEventsMode === 'orientation') {
    const selected = visible.filter(
      (item) => item.orientationWeek && item.featured,
    )
    return selected.length > 0
      ? selected
      : visible.filter((item) => item.orientationWeek)
  }

  return visible
}

export function getHomepageEvents(limit = 2) {
  return getPublicUpcomingEvents().slice(0, limit)
}

export function getEventsByDate(isoDate: string) {
  return getPublicUpcomingEvents().filter((item) => item.date === isoDate)
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
    year: 'numeric',
  })
}

export function formatPublicEventDate(isoDate: string) {
  return parseISODate(isoDate).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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

export function formatEventDateLabel(event: GemaEvent) {
  if (event.date) {
    return formatPublicEventDate(event.date)
  }

  if (event.status === 'planned' && event.approximateTiming) {
    return event.approximateTiming
  }

  return null
}

export function formatMonthLabel(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1).toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric',
  })
}

export function getEventDateSet() {
  return new Set(
    getPublicUpcomingEvents()
      .map((item) => item.date)
      .filter((date): date is string => Boolean(date)),
  )
}
