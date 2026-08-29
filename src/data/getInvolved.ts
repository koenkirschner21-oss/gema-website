export const involveMedia = {
  hero: {
    src: '/get-involved-hero.jpg' as string | null,
    label: 'GEMA student/community photo',
    alt: 'GEMA students and community',
  },
  why: {
    src: '/get-involved-why.jpg' as string | null,
    label: 'GEMA team or event photo',
    alt: 'GEMA team or event',
  },
  social: {
    src: '/get-involved-backup.jpg' as string | null,
    label: 'GEMA community photo',
    alt: 'GEMA students connecting at a community event',
  },
}

export const involvementPaths = [
  {
    title: 'Attend Events',
    copy: 'Join professional, social, networking, and community events throughout the year.',
    accent: 'red' as const,
    to: '/events',
  },
  {
    title: 'Join the Executive Team',
    copy: 'Apply for leadership roles when recruitment opportunities are available.',
    accent: 'gold' as const,
    to: '#get-connected',
  },
  {
    title: 'Support GEMA Initiatives',
    copy: 'Contribute to events, projects, outreach, and other student-focused initiatives.',
    accent: 'blue' as const,
    to: '#get-connected',
  },
  {
    title: 'Stay Connected',
    copy: 'Follow GEMA and stay aware of upcoming events, opportunities, and announcements.',
    accent: 'dark' as const,
    to: '#get-connected',
  },
]

export const involvementBenefits = [
  {
    title: 'Leadership Experience',
    copy: 'Take ownership, work with others and build practical leadership experience outside the classroom.',
    accent: 'red' as const,
  },
  {
    title: 'Professional Development',
    copy: 'Put skills into practice through real events, projects, responsibilities and student-led initiatives.',
    accent: 'gold' as const,
  },
  {
    title: 'Community',
    copy: 'Connect with other GEM students and build relationships with people across the program.',
    accent: 'blue' as const,
  },
  {
    title: 'Connections',
    copy: 'Engage with students, faculty, alumni, professionals and organizations through GEMA programming and involvement.',
    accent: 'dark' as const,
  },
]

export const involveSocial = [
  {
    platform: 'instagram' as const,
    title: 'Instagram',
    copy: 'Primary channel for event updates, recruitment, and announcements.',
    linkLabel: 'Instagram',
  },
  {
    platform: 'linkedin' as const,
    title: 'LinkedIn',
    copy: 'Professional updates, organization news, and community highlights.',
    linkLabel: 'LinkedIn',
  },
  {
    platform: 'tiktok' as const,
    title: 'TikTok',
    copy: 'Community highlights and short-form updates.',
    linkLabel: 'TikTok',
  },
]

export const openingsEmptyState = {
  heading: 'There are no open applications at the moment.',
  copy: 'Recruitment is announced when roles open. Follow GEMA for updates, or start by getting involved through events and community opportunities.',
  linkLabel: 'Explore Events',
  linkTo: '/events',
}

/** Retained for future hiring cycles if placeholder cards are needed. */
export const opportunityPlaceholderCount = 3

export const opportunityPlaceholder = {
  title: 'Role details coming soon',
  status: 'Applications are not currently open',
  description: 'Future opportunities will appear here.',
  note: 'No active application',
  action: 'Coming Soon',
}
