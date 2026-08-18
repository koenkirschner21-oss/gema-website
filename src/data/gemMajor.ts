export const gemOfficialProgramUrl =
  'https://www.uoguelph.ca/programs/government-economics-and-management/'

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
    title: 'Government & Public Policy',
    copy: 'Explore the role of government, institutions and policy in shaping economic and business environments.',
    accent: 'red' as const,
  },
  {
    title: 'Economics',
    copy: 'Develop an understanding of markets, incentives and the economic forces that influence decision-making.',
    accent: 'gold' as const,
  },
  {
    title: 'Business & Management',
    copy: 'Build a foundation in the core areas of business while learning how organizations operate and make decisions.',
    accent: 'blue' as const,
  },
]
