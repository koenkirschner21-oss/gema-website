/**
 * Team roster for /about/team.
 *
 * Replace every `name: 'Name'`, `image: null`, and `linkedin: null`
 * with current team details. Add a real `portfolio` for directors.
 * Photo paths can live in `public/team/`.
 *
 * The public page renders Co-Presidents (`leadership`) and Directors
 * only. `level: 'manager'` may remain in this file for future use and
 * is not shown on /about/team.
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
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-2',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-3',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-4',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-5',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-6',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-7',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'director-8',
    name: 'Name',
    role: 'Director',
    portfolio: null,
    image: null,
    linkedin: null,
    level: 'director',
  },
]

export function getTeamByLevel(level: TeamLevel) {
  return team.filter((member) => member.level === level)
}

export function formatTeamTitle(member: TeamMember) {
  return member.portfolio ? `${member.role}, ${member.portfolio}` : member.role
}

export function isPlaceholderMember(member: TeamMember) {
  return member.name === 'Name' && member.image === null
}
