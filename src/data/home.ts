export const homeMedia = {
  hero: {
    src: '/home-hero.jpg' as string | null,
    label: 'Primary GEMA event photography',
    alt: 'Students attending a GEMA event at the University of Guelph',
  },
  involve: {
    src: '/home-get-involved.jpg' as string | null,
    label: 'GEMA students participating in an event',
    alt: 'University of Guelph students participating in the GEMA community',
  },
}

export const homePillars = [
  {
    title: 'Representation',
    copy: 'GEMA helps represent the interests and perspectives of GEM students.',
    accent: 'red' as const,
  },
  {
    title: 'Community',
    copy: 'GEMA creates opportunities for students to connect, build relationships and feel part of the program community.',
    accent: 'gold' as const,
  },
  {
    title: 'Professional Development',
    copy: 'GEMA connects students with experiences, speakers, events and opportunities that support growth beyond the classroom.',
    accent: 'blue' as const,
  },
  {
    title: 'Leadership',
    copy: 'GEMA gives students opportunities to take responsibility, contribute to the organization and develop practical leadership experience.',
    accent: 'dark' as const,
  },
]

export const homepageEventPlaceholderCount = 3
export const pastPartnerPlaceholderCount = 6
