export type OpportunityStatus = 'open' | 'closed'

export type Opportunity = {
  id: string
  title: string
  category: string
  description: string
  applicationUrl: string | null
  deadline: string | null
  status: OpportunityStatus
  active: boolean
}

/**
 * Current GEMA opportunities shown on /get-involved.
 *
 * Add real roles here when recruitment opens. The page renders every
 * entry with `active: true` and `status: 'open'`. If none are active,
 * it shows the empty state.
 *
 * Brand Ambassador is currently filled. Do not list it as open.
 *
 * Example:
 * {
 *   id: 'example-role',
 *   title: 'Role title',
 *   category: 'Executive',
 *   description: 'One or two sentences about the role.',
 *   applicationUrl: 'https://example.com/apply',
 *   deadline: 'September 15, 2026',
 *   status: 'open',
 *   active: true,
 * }
 */
export const opportunities: Opportunity[] = []

export function getActiveOpportunities() {
  return opportunities.filter((item) => item.active && item.status === 'open')
}
