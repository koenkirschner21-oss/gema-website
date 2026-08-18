export type Partner = {
  id: string
  name: string
  logo: string | null
  url: string | null
  description: string | null
  type: string | null
  active: boolean
}

/**
 * Current partners and sponsors shown on /partners.
 *
 * Replace placeholder entries with real organization names, logos,
 * and website URLs. Set `active: false` to hide an organization
 * without deleting it. Logo files can live in `public/partners/`
 * (for example `/partners/organization.svg`).
 *
 * Do not invent sponsor names or logos.
 */
export const partners: Partner[] = [
  {
    id: 'placeholder-1',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-2',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-3',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-4',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-5',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-6',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-7',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
  {
    id: 'placeholder-8',
    name: 'Organization',
    logo: null,
    url: null,
    description: null,
    type: null,
    active: true,
  },
]

export function getActivePartners() {
  return partners.filter((item) => item.active)
}

export function getPartnersWithLogos() {
  return getActivePartners().filter(
    (item): item is Partner & { logo: string } => item.logo !== null,
  )
}

/**
 * When the current corporate package PDF or page is available, set this
 * to that URL. Until then, "View Partnership Information" goes to Contact.
 * Do not hardcode historical Gold / Silver / Bronze prices here.
 */
export const partnershipPackageUrl: string | null = null

export const partnerMedia = {
  hero: {
    src: '/partners-hero.jpg',
    label: 'GEMA partnership and event photography',
    alt: 'Students and professionals connecting at a GEMA event',
  },
  why: {
    src: '/partners-why.jpg',
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
    copy: 'Opportunities for partner organizations to be recognized through relevant GEMA programming and communications.',
    accent: 'red' as const,
  },
  {
    title: 'Access to Students',
    copy: 'Connect with students interested in government, economics, management, public policy, business, and related career paths.',
    accent: 'gold' as const,
  },
  {
    title: 'Leadership & Engagement',
    copy: 'Participate in panels, speaking opportunities, networking activities, and other student-facing experiences where appropriate.',
    accent: 'blue' as const,
  },
  {
    title: 'Community Impact',
    copy: 'Support student development, professional growth, and meaningful opportunities within the University of Guelph community.',
    accent: 'dark' as const,
  },
]
