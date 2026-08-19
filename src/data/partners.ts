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
    src: '/partners-hero.jpg' as string | null,
    label: 'GEMA partnership and event photography',
    alt: 'Students and professionals connecting at a GEMA event',
  },
  why: {
    src: '/partners-why.jpg' as string | null,
    label: 'GEMA professional event photography',
    alt: 'Professionals networking at a GEMA panel event',
  },
}

export const partnerSupport = [
  {
    title: 'Events & Programming',
    copy: 'Supporting professional, networking, social, and student-facing experiences.',
    accent: 'red' as const,
  },
  {
    title: 'Professional Development',
    copy: 'Helping connect students with speakers, industry knowledge, networking, and career-related opportunities.',
    accent: 'gold' as const,
  },
  {
    title: 'Community Initiatives',
    copy: 'Supporting activities and experiences that strengthen the broader GEMA student community.',
    accent: 'blue' as const,
  },
  {
    title: 'In-Kind Support',
    copy: 'Providing goods, services, merchandise, coupons, resources, or other non-monetary contributions.',
    accent: 'dark' as const,
  },
]

export const partnerBenefits = [
  {
    title: 'Brand Exposure',
    copy: 'Introduce your organization to students through appropriate GEMA communications, programming and partnership opportunities.',
    accent: 'red' as const,
  },
  {
    title: 'Access to Students',
    copy: 'Engage directly with GEM students through relevant programming, events and initiatives.',
    accent: 'gold' as const,
  },
  {
    title: 'Leadership & Engagement',
    copy: 'Contribute to panels, discussions, networking opportunities or other programming where your organization’s experience can provide value to students.',
    accent: 'blue' as const,
  },
  {
    title: 'Community Impact',
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
