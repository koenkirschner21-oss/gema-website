import { aboutMedia } from './about'

export const homeMedia = {
  hero: {
    // Temporary: reuse the About GEMA hero until a dedicated homepage photo is supplied.
    src: aboutMedia.hero.src,
    label: aboutMedia.hero.label,
    alt: aboutMedia.hero.alt,
  },
  involve: {
    src: '/home-get-involved.jpg' as string | null,
    label: 'GEMA students participating in an event',
    alt: 'University of Guelph students participating in the GEMA community',
  },
}

export const homeIntroPoints = [
  {
    title: 'Inspire',
    copy: 'Future leaders to take action toward their goals.',
    accent: 'red' as const,
  },
  {
    title: 'Engage',
    copy: 'The interests of U of G students in all things GEM.',
    accent: 'gold' as const,
  },
  {
    title: 'Build',
    copy: 'Networks and create connections for U of G students.',
    accent: 'blue' as const,
  },
]

export const homePillars = [
  {
    title: 'Representation',
    copy: 'GEMA helps represent the interests and perspectives of GEM students.',
    accent: 'red' as const,
  },
  {
    title: 'Community',
    copy: 'GEMA creates opportunities for students to connect, build relationships, and feel part of the program community.',
    accent: 'gold' as const,
  },
  {
    title: 'Professional Development',
    copy: 'GEMA connects students with experiences, speakers, events, and opportunities that support growth beyond the classroom.',
    accent: 'blue' as const,
  },
  {
    title: 'Leadership',
    copy: 'GEMA gives students opportunities to take responsibility, contribute to the organization, and develop practical leadership experience.',
    accent: 'dark' as const,
  },
]

export const homepageEventPlaceholderCount = 3
