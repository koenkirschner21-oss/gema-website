/**
 * Team roster for /about/team.
 *
 * Team portraits live in `public/team/`. Keep `image: null` until an
 * official headshot is supplied. When a photo arrives, add the file and
 * set only that member's `image` path. Do not change names, titles, or
 * card order.
 *
 * Remaining director files:
 * - `/team/reshawn-norbert.webp`
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
    id: 'rachel',
    name: 'Rachel',
    role: 'Co-President',
    portfolio: null,
    image: '/team/rachel-copresident.webp',
    linkedin: null,
    level: 'leadership',
  },
  {
    id: 'rodeen',
    name: 'Rodeen',
    role: 'Co-President',
    portfolio: null,
    image: '/team/rodeen-copresident.webp',
    linkedin: null,
    level: 'leadership',
  },
  {
    id: 'eivina-stavickyte',
    name: 'Eivina Stavickyte',
    role: 'Director of Marketing',
    portfolio: 'Marketing',
    image: '/team/eivina-stavickyte.webp',
    linkedin: null,
    level: 'director',
  },
  {
    id: 'reshawn-norbert',
    name: 'Reshawn Norbert',
    role: 'Director of Brand Ambassadors',
    portfolio: 'Brand Ambassadors',
    image: null,
    linkedin: null,
    level: 'director',
  },
  {
    id: 'lilian-lorenzo-rebollar',
    name: 'Lilian Lorenzo Rebollar',
    role: 'Director of Finance',
    portfolio: 'Finance',
    image: '/team/lilian-lorenzo-rebollar.webp',
    linkedin: null,
    level: 'director',
  },
  {
    id: 'simran-aujla',
    name: 'Simran Aujla',
    role: 'Director of Events',
    portfolio: 'Events',
    image: '/team/simran-aujla.webp',
    linkedin: null,
    level: 'director',
  },
  {
    id: 'lama-alqasem',
    name: 'Lama Alqasem',
    role: 'Director of Human Resources',
    portfolio: 'Human Resources',
    image: '/team/lama-alqasem.webp',
    linkedin: null,
    level: 'director',
  },
  {
    id: 'samantha-van-wees',
    name: 'Samantha Van Wees',
    role: 'Director of Corporate',
    portfolio: 'Corporate',
    image: '/team/samantha-van-wees.webp',
    linkedin: null,
    level: 'director',
  },
  {
    id: 'koen',
    name: 'Koen Kirschner',
    role: 'Director of Web and Design',
    portfolio: 'Web and Design',
    image: '/team/koen-kirschner.webp',
    linkedin: null,
    level: 'director',
  },
]

export function getTeamByLevel(level: TeamLevel) {
  return team.filter((member) => member.level === level)
}

export function formatTeamTitle(member: TeamMember) {
  return member.role
}

export function isPlaceholderMember(member: TeamMember) {
  return member.name === 'Name' && member.image === null
}
