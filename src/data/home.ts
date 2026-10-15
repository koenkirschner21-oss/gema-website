import { aboutMedia } from './about'

export const homeMedia = {
  hero: {
    // Temporary: reuse the About GEMA hero until the official full-team
    // photo is supplied. Then set `src` to that file (for example
    // `/home-hero.webp`) and update `label` / `alt`. Do not change layout.
    src: aboutMedia.hero.src,
    label: aboutMedia.hero.label,
    alt: aboutMedia.hero.alt,
  },
  involve: {
    src: '/home-get-involved.webp' as string | null,
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
    copy: 'Advocating for the interests and perspectives of GEM students.',
    accent: 'red' as const,
  },
  {
    title: 'Community',
    copy: 'Creating opportunities to connect, build relationships, and strengthen the GEM community.',
    accent: 'gold' as const,
  },
  {
    title: 'Professional Development',
    copy: 'Connecting students with experiences, speakers, and opportunities beyond the classroom.',
    accent: 'blue' as const,
  },
  {
    title: 'Leadership',
    copy: 'Giving students opportunities to take ownership, contribute, and build practical leadership experience.',
    accent: 'dark' as const,
  },
]
