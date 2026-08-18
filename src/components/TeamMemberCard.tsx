import { formatTeamTitle, isPlaceholderMember, type TeamMember } from '../data/team'
import './TeamMemberCard.css'

type TeamMemberCardProps = {
  member: TeamMember
  featured?: boolean
  compact?: boolean
}

export function TeamMemberCard({
  member,
  featured = false,
  compact = false,
}: TeamMemberCardProps) {
  const placeholder = isPlaceholderMember(member)
  const className = [
    'team-card',
    featured ? 'team-card--featured' : '',
    compact ? 'team-card--compact' : '',
    placeholder ? 'team-card--placeholder' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      aria-label={placeholder ? 'Team member placeholder' : undefined}
    >
      <div className="team-card__photo">
        {member.image ? (
          <img src={member.image} alt={member.name} />
        ) : (
          <span className="visually-hidden">Photo to be added</span>
        )}
      </div>
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
