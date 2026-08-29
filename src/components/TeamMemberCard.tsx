import { useState } from 'react'
import { formatTeamTitle, isPlaceholderMember, type TeamMember } from '../data/team'
import './TeamMemberCard.css'

type TeamMemberCardProps = {
  member: TeamMember
  featured?: boolean
}

function TeamPhoto({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className="team-card__photo">
      {showImage ? (
        <img src={src ?? undefined} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <span className="visually-hidden">Photo to be added</span>
      )}
    </div>
  )
}

export function TeamMemberCard({
  member,
  featured = false,
}: TeamMemberCardProps) {
  const placeholder = isPlaceholderMember(member)
  const className = [
    'team-card',
    featured ? 'team-card--featured' : '',
    placeholder ? 'team-card--placeholder' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      aria-label={placeholder ? 'Team member placeholder' : undefined}
    >
      <TeamPhoto
        src={member.image}
        alt={member.image ? `${member.name}, GEMA ${member.role}` : ''}
      />
      <div className="team-card__body">
        <h3>{member.name}</h3>
        <p>{formatTeamTitle(member)}</p>
        {member.linkedin ? (
          <a
            className="team-card__linkedin"
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
