export const involveMedia = {
  hero: {
    src: '/get-involved-hero.jpg',
    label: 'GEMA student/community photo',
    alt: 'GEMA students and community',
  },
  why: {
    src: '/get-involved-why.jpg',
    label: 'GEMA team or event photo',
    alt: 'GEMA team or event',
  },
}

export const involvementPaths = [
  {
    title: 'Attend Events',
    copy: 'GEMA hosts professional, networking, social and community-focused events throughout the year. Attending an event is one of the easiest ways to meet other students and become more connected to the GEM community.',
    accent: 'red' as const,
    cta: { label: 'Explore Events', to: '/events' },
  },
  {
    title: 'Join the Executive Team',
    copy: "Take on a leadership role and contribute directly to GEMA's programming, operations and student experience. Recruitment opportunities are posted when positions become available.",
    accent: 'gold' as const,
    cta: { label: 'View Current Opportunities', to: '#current-opportunities' },
  },
  {
    title: 'Support GEMA Initiatives',
    copy: 'Get involved with the events, projects and initiatives GEMA runs throughout the year and help contribute to the student experience beyond the classroom.',
    accent: 'blue' as const,
    cta: null,
  },
  {
    title: 'Stay Connected',
    copy: 'Keep up with GEMA announcements, events, recruitment and other opportunities throughout the academic year.',
    accent: 'dark' as const,
    cta: null,
    social: true,
  },
]

export const involvementBenefits = [
  {
    title: 'Build Experience',
    copy: 'Put skills into practice through real events, projects, responsibilities and student-led initiatives.',
    accent: 'red' as const,
  },
  {
    title: 'Develop as a Leader',
    copy: 'Take ownership, work with others and build practical leadership experience outside the classroom.',
    accent: 'gold' as const,
  },
  {
    title: 'Meet Your Community',
    copy: 'Connect with other GEM students and build relationships with people across the program.',
    accent: 'blue' as const,
  },
  {
    title: 'Expand Your Network',
    copy: 'Engage with students, faculty, alumni, professionals and organizations through GEMA programming and involvement.',
    accent: 'dark' as const,
  },
]
