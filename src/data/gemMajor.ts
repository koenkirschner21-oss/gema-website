/** Confirmed University of Guelph GEM program page. */
export const gemOfficialProgramUrl =
  'https://www.uoguelph.ca/programs/government-economics-and-management/'

/** Confirmed University of Guelph GEM co-op page. */
export const gemOfficialCoopUrl =
  'https://www.uoguelph.ca/experiential-learning/future-students/co-op-programs/government-economics-and-management'

export const gemMedia = {
  hero: {
    src: '/gem-major-hero.webp' as string | null,
    label: 'GEM major students',
    alt: 'GEM students at the University of Guelph',
  },
  coop: {
    src: '/gem-major-coop.jpg' as string | null,
    label: 'GEM co-op and professional development',
    alt: 'Students participating in a Lang conference or professional development event',
  },
}

export const gemFacets = [
  {
    title: 'Economics',
    copy: 'Develop an understanding of markets, incentives and the economic forces that influence decision-making.',
    accent: 'red' as const,
  },
  {
    title: 'Business & Management',
    copy: 'Build a foundation in the core areas of business while learning how organizations operate and make decisions.',
    accent: 'gold' as const,
  },
  {
    title: 'Government & Public Policy',
    copy: 'Explore the role of government, institutions and policy in shaping economic and business environments.',
    accent: 'blue' as const,
  },
  {
    title: 'Public & Private Sectors',
    copy: 'Explore how government and business interact across the public and private sectors.',
    accent: 'dark' as const,
  },
]

export const gemCoopPoints = [
  'A co-op option is available within the GEM major.',
  'Work-integrated learning sits alongside coursework, not apart from it.',
  'Students can gain experience across government, business, policy, economics, and related fields.',
]
