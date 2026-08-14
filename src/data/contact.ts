/**
 * Contact page content and form configuration.
 *
 * Set `contactFormEndpoint` to a Formspree URL when available,
 * for example: 'https://formspree.io/f/xxxxxxxx'
 * Do not commit secrets. Formspree form IDs are public endpoints.
 */
export const contactFormEndpoint: string | null = null

export const contactReasons = [
  'General Inquiry',
  'Events',
  'Get Involved',
  'Partnerships & Sponsorships',
  'GEM Major / Student Question',
  'Other',
] as const

export const contactRoutes = [
  {
    title: 'Partnerships',
    copy: 'Interested in sponsorship or collaboration?',
    to: '/partners',
    accent: 'red' as const,
  },
  {
    title: 'Events',
    copy: 'Looking for upcoming GEMA programming?',
    to: '/events',
    accent: 'gold' as const,
  },
  {
    title: 'Join GEMA',
    copy: 'Interested in opportunities or getting involved?',
    to: '/get-involved',
    accent: 'blue' as const,
  },
  {
    title: 'GEM Major',
    copy: 'Looking for information about the academic program?',
    to: '/gem-major',
    accent: 'dark' as const,
  },
]
