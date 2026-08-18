import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { TeamMemberCard } from '../components/TeamMemberCard'
import { getTeamByLevel } from '../data/team'
import './Team.css'

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
          <p className="team-eyebrow">OUR TEAM</p>
          <h1>Meet the Team</h1>
          <p className="team-lede">
            GEMA is led by a team of University of Guelph students working
            together to represent the GEM community, organize programming,
            build partnerships and create opportunities for students throughout
            the year.
          </p>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2>Executive Leadership</h2>
          <p className="team-section__intro">
            Meet the students leading GEMA and helping guide the association
            throughout the academic year.
          </p>
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
          <p className="team-section__intro">
            GEMA’s directors lead the portfolios responsible for the
            association’s programming, operations, communications, partnerships
            and student experience.
          </p>
          <div className="team-directors">
            {directors.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="team-cta">
        <Container>
          <h2>Interested in joining the team?</h2>
          <p>
            GEMA offers students opportunities to contribute, build experience
            and take on leadership roles throughout the year. Explore current
            opportunities and find out how you can get involved.
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
