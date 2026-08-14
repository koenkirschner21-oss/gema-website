/**
 * Placeholder team roster for /about/team.
 *
 * Replace every `name: 'Name'`, `image: null`, `linkedin: null`, and
 * generic `portfolio` value with current team details. Photo paths can
 * live in `public/team/` (for example `/team/co-president-1.jpg`).
 */
export type TeamLevel = 'leadership' | 'director' | 'manager'

export type TeamMember = {
  id: string
  name: string
  role: string
  portfolio: string | null
  image: string | null
  linkedin: string | null
  level: TeamLevel
}

// Replace placeholder entries with current names, photos, roles, and LinkedIn URLs.
export const team: TeamMember[] = [
  {
    id: 'leadership-1',
    name: 'Name',
    role: 'Co-President',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'leadership',
  },
  {
    id: 'leadership-2',
    name: 'Name',
    role: 'Co-President',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'leadership',
  },
  {
    id: 'director-1',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-2',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-3',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-4',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-5',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-6',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-7',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-8',
    name: 'Name',
    role: 'Director',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'manager-1',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-2',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-3',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-4',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-5',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-6',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-7',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
  {
    id: 'manager-8',
    name: 'Name',
    role: 'Manager',
    portfolio: 'Portfolio',
    image: null,
    linkedin: null,
    level: 'manager',
  },
]

export function getTeamByLevel(level: TeamLevel) {
  return team.filter((member) => member.level === level)
}

export function formatTeamTitle(member: TeamMember) {
  return member.portfolio ? `${member.role}, ${member.portfolio}` : member.role
}
