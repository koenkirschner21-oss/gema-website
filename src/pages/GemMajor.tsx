import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  gemFacets,
  gemMedia,
  gemOfficialCoopUrl,
  gemOfficialProgramUrl,
} from '../data/gemMajor'
import './GemMajor.css'

export function GemMajor() {
  useEffect(() => {
    document.title = 'GEM Major | GEMA'
  }, [])

  return (
    <article className="gem">
      <section className="gem-hero">
        <Container>
          <div className="gem-hero__grid">
            <div className="gem-hero__copy">
              <p className="gem-eyebrow">GEM Major</p>
              <h1>Government, Economics & Management</h1>
              <p className="gem-lede">
                Government, Economics & Management (GEM) is a Bachelor of
                Commerce major at the University of Guelph that brings together
                business, economics, government and public policy. The program
                gives students the opportunity to understand how organizations,
                markets and governments interact while developing the business
                foundation of a Lang commerce degree.
              </p>
              <div className="gem-hero__actions">
                <a
                  className="gem-button gem-button--primary"
                  href={gemOfficialProgramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the Official Program
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                <Link
                  className="gem-button gem-button--secondary"
                  to="/get-involved"
                >
                  Get Involved with GEMA
                </Link>
              </div>
            </div>
            <div className="gem-hero__media">
              <PhotoPlaceholder
                src={gemMedia.hero.src}
                label={gemMedia.hero.label}
                alt={gemMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="gem-what">
        <Container>
          <div className="gem-what__grid">
            <div className="gem-what__copy">
              <h2>What is GEM?</h2>
              <p>
                GEM combines the core areas of a business education with a
                deeper understanding of economics, government and public policy.
              </p>
              <p>
                Students explore how decisions are made across the public and
                private sectors, how economic forces shape organizations and
                communities, and how government and business interact.
              </p>
              <p>
                This interdisciplinary approach gives students exposure to
                multiple perspectives while developing skills in analysis,
                communication, decision-making and management.
              </p>
            </div>
            <ul className="gem-what__facets">
              {gemFacets.map((item) => (
                <li key={item.title} data-accent={item.accent}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="gem-coop">
        <Container>
          <div className="gem-coop__grid">
            <div className="gem-coop__media">
              <PhotoPlaceholder
                src={gemMedia.coop.src}
                label={gemMedia.coop.label}
                alt={gemMedia.coop.alt}
                ratio="editorial"
              />
            </div>
            <div className="gem-coop__copy">
              <h2>Co-op & Career Development</h2>
              <p>
                GEM students can pursue the co-op stream to combine their
                academic studies with professional work experience.
              </p>
              <p>
                Co-op gives students the opportunity to apply what they learn in
                the classroom, develop workplace skills and gain exposure to
                different organizations and industries before graduating.
              </p>
              <a
                className="gem-button gem-button--primary"
                href={gemOfficialCoopUrl}
                target="_blank"
                rel="noreferrer"
              >
                Learn About GEM Co-op
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="gem-official">
        <Container>
          <div className="gem-official__panel">
            <h2>Explore the Official GEM Program</h2>
            <p>
              For official information on curriculum, courses, admissions, co-op
              requirements and program details, visit the University of
              Guelph’s Government, Economics & Management program page.
            </p>
            <a
              className="gem-button gem-button--primary"
              href={gemOfficialProgramUrl}
              target="_blank"
              rel="noreferrer"
            >
              View the Official GEM Program
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="gem-cta">
        <Container>
          <h2>Make the most of your GEM experience.</h2>
          <p>
            Your program is only one part of your university experience. GEMA
            gives GEM students more ways to meet people, attend events, build
            experience and get involved outside the classroom.
          </p>
          <div className="gem-cta__actions">
            <Link className="gem-button gem-button--primary" to="/get-involved">
              Get Involved
            </Link>
            <Link className="gem-button gem-button--secondary" to="/about">
              About GEMA
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
