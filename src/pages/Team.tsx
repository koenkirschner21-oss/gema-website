import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { TeamMemberCard } from '../components/TeamMemberCard'
import { getTeamByLevel } from '../data/team'
import './Team.css'

export function Team() {
  const leadership = getTeamByLevel('leadership')
  const directors = getTeamByLevel('director')
  const managers = getTeamByLevel('manager')

  useEffect(() => {
    document.title = 'Meet the Team | GEMA'
  }, [])

  return (
    <article className="team">
      <section className="team-hero">
        <Container>
          <p className="team-eyebrow">OUR TEAM</p>
          <h1>Meet the Team</h1>
          <p className="team-lede">
            GEMA is led by students who organize programming, represent the GEM
            community, build partnerships, and keep the association running
            throughout the year.
          </p>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2>Executive Leadership</h2>
          <div className="team-leadership">
            {leadership.map((member) => (
              <TeamMemberCard key={member.id} member={member} featured />
            ))}
          </div>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2>Directors</h2>
          <div className="team-directors">
            {directors.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2>Managers & Team Members</h2>
          <div className="team-managers">
            {managers.map((member) => (
              <TeamMemberCard key={member.id} member={member} compact />
            ))}
          </div>
        </Container>
      </section>

      <section className="team-cta">
        <Container>
          <h2>Interested in joining the team?</h2>
          <p>
            Watch for current opportunities, or get involved with GEMA through
            events and student leadership.
          </p>
          <div className="team-cta__actions">
            <Link className="team-button team-button--primary" to="/get-involved">
              Get Involved
            </Link>
            <Link className="team-button team-button--secondary" to="/events">
              Explore Events
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
