export type OpportunityStatus = 'open' | 'closed'

export type Opportunity = {
  id: string
  title: string
  category: string
  description: string
  eligibility: string | null
  applicationUrl: string | null
  deadline: string | null
  ctaLabel: string | null
  status: OpportunityStatus
  active: boolean
}

/**
 * Opportunity data for /get-involved.
 *
 * Current Opportunities stays hidden while this array is empty.
 * Add a confirmed role with `active: true` and `status: 'open'` to
 * show it. Do not invent eligibility, deadlines, or apply links.
 *
 * Brand Ambassador is currently filled. Do not list it as open.
 *
 * Example:
 * {
 *   id: 'first-year-rep',
 *   title: 'First Year Representative',
 *   category: 'Executive',
 *   description: 'One or two sentences about the role.',
 *   eligibility: 'Open to first-year GEM students.',
 *   applicationUrl: 'https://example.com/apply',
 *   deadline: 'September 15, 2026',
 *   ctaLabel: 'Apply Now',
 *   status: 'open',
 *   active: true,
 * }
 */
export const opportunities: Opportunity[] = []

export function getActiveOpportunities() {
  return opportunities.filter((item) => item.active && item.status === 'open')
}
