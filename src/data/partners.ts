export type Partner = {
  id: string
  name: string
  logo: string | null
  url: string | null
  description: string | null
  type: string | null
  year: string | null
  active: boolean
}

/**
 * Confirmed current partners and sponsors, if a live cycle is in place.
 * Do not invent organization names or logos. The Partners page currently
 * showcases past relationships, not a current sponsorship cycle.
 */
export const partners: Partner[] = []

export function getActivePartners() {
  return partners.filter((item) => item.active)
}

export function getPartnersWithLogos() {
  return getActivePartners().filter(
    (item): item is Partner & { logo: string } => item.logo !== null,
  )
}

/**
 * Confirmed past partners and sponsors. These are previous relationships,
 * not a current sponsorship cycle. Add organization names, logos, website
 * URLs, and optional year/initiative details when assets are supplied.
 */
export const pastPartners: Partner[] = []

export function getPastPartners() {
  return pastPartners
}

export function getPastPartnersWithLogos() {
  return pastPartners.filter(
    (item): item is Partner & { logo: string } => item.logo !== null,
  )
}

/** Neutral logo slots shown on /partners until confirmed past partners are added. */
export const pastPartnerPagePlaceholderCount = 8

export const partnerMedia = {
  hero: {
    src: null as string | null,
    label: 'Replace with students networking with professionals',
    alt: 'GEMA students networking with professionals',
  },
  why: {
    src: null as string | null,
    label: 'Replace with panel, speaker, or employer networking photo',
    alt: 'GEMA panel, speaker, or employer networking',
  },
}

export const partnerSupport = [
  {
    title: 'Events & Programming',
    copy: 'Support events, panels, networking opportunities and other programming designed to bring students together and expand their experiences beyond the classroom.',
    accent: 'red' as const,
  },
  {
    title: 'Professional Development',
    copy: 'Help create opportunities for students to engage with professionals, explore different perspectives and build connections beyond the university.',
    accent: 'gold' as const,
  },
  {
    title: 'Student Engagement',
    copy: 'Connect with the GEM community through relevant initiatives, conversations and experiences throughout the academic year.',
    accent: 'blue' as const,
  },
  {
    title: 'In-Kind Support',
    copy: 'Organizations can also support GEMA through products, services, resources or other non-monetary contributions that strengthen student programming.',
    accent: 'dark' as const,
  },
]

export const partnerBenefits = [
  {
    title: 'Connect With Students',
    copy: 'Engage directly with GEM students through relevant programming, events and initiatives.',
    accent: 'red' as const,
  },
  {
    title: 'Build Campus Visibility',
    copy: 'Introduce your organization to students through appropriate GEMA communications, programming and partnership opportunities.',
    accent: 'gold' as const,
  },
  {
    title: 'Share Your Experience',
    copy: 'Contribute to panels, discussions, networking opportunities or other programming where your organization’s experience can provide value to students.',
    accent: 'blue' as const,
  },
  {
    title: 'Support Student Development',
    copy: "Help GEMA create opportunities that contribute to students' professional growth, involvement and university experience.",
    accent: 'dark' as const,
  },
]

export const partnershipOpportunities = [
  {
    title: 'Speakers & Panels',
    copy: 'Share professional experience, industry perspectives or subject-matter knowledge with students.',
    accent: 'red' as const,
  },
  {
    title: 'Events & Networking',
    copy: 'Work with GEMA on programming that creates meaningful opportunities for students to connect and learn.',
    accent: 'gold' as const,
  },
  {
    title: 'Sponsorship Opportunities',
    copy: "Support GEMA programming and student initiatives through opportunities outlined in GEMA's Corporate Partnership Package.",
    accent: 'blue' as const,
  },
  {
    title: 'In-Kind Contributions',
    copy: 'Support events or initiatives through relevant products, services or resources.',
    accent: 'dark' as const,
  },
  {
    title: 'Other Collaborations',
    copy: "Have another idea? GEMA is open to discussing opportunities that provide meaningful value to students and align with the association's programming.",
    accent: 'red' as const,
  },
]
