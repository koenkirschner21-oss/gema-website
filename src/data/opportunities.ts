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
 * Opportunity data for /get-involved.
 *
 * The Current Opportunities section is currently omitted from the
 * rendered page. Restore it in GetInvolved.tsx when real roles exist.
 * Add entries with `active: true` and `status: 'open'`. Empty-state
 * copy and opening-card styles remain in getInvolved.ts / GetInvolved.css.
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
