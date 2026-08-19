import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { TeamMemberCard } from '../components/TeamMemberCard'
import { getTeamByLevel } from '../data/team'
import './Team.css'

function directorGridClass(count: number) {
  if (count === 6) {
    return 'team-directors team-directors--3'
  }

  if (count === 4 || count === 8) {
    return 'team-directors team-directors--4'
  }

  return 'team-directors team-directors--auto'
}

export function Team() {
  const leadership = getTeamByLevel('leadership')
  const directors = getTeamByLevel('director')

  useEffect(() => {
    document.title = 'Meet the Team | GEMA'
  }, [])

  return (
    <article className="team">
      <section className="team-hero">
        <Container>
          <div className="team-hero__content">
            <p className="team-hero__label">Our Team</p>
            <span className="team-hero__accent" aria-hidden="true" />
            <h1>Meet the Team</h1>
            <p className="team-lede">
              GEMA is led by University of Guelph students working together to
              represent the GEM community, organize programming, build
              partnerships and create opportunities throughout the year.
            </p>
          </div>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2>Co-Presidents</h2>
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
          <div className={directorGridClass(directors.length)}>
            {directors.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="team-cta">
        <Container>
          <div className="team-cta__content">
            <h2>Interested in joining the team?</h2>
            <p>
              GEMA offers students opportunities to contribute, build experience
              and take on leadership roles throughout the year.
            </p>
            <div className="team-cta__actions">
              <Link
                className="team-button team-button--primary"
                to="/get-involved"
              >
                Get Involved
              </Link>
              <Link
                className="team-button team-button--on-dark"
                to="/get-involved#current-opportunities"
              >
                View Current Opportunities
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
