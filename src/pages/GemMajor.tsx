import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  gemCoopPoints,
  gemFacets,
  gemMedia,
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
                GEM combines perspectives from business, economics, government,
                management, and public policy at the Gordon S. Lang School of
                Business and Economics. It is a major for students who want to
                understand how organizations, markets, and public decisions
                connect.
              </p>
            </div>
            <div className="gem-hero__media">
              {/* Replace with relevant GEM / University of Guelph photo */}
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
              <h2>What Is GEM?</h2>
              <p>
                GEM brings economics, business and management, and government
                and public policy into one major. The focus is how decisions
                get made — and how those decisions move across public and
                private sectors.
              </p>
              <p>
                It sits inside the Bachelor of Commerce at Lang, with a mix
                that is more than a single discipline. Students look at
                markets, institutions, and organizations together, rather than
                in isolation.
              </p>
              <p>
                That combination is the point of GEM: learning how the pieces
                fit, and how to work with them.
              </p>
            </div>
            <ul className="gem-what__facets">
              {gemFacets.map((item) => (
                <li key={item.title} data-accent={item.accent}>
                  {item.title}
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
              {/* Replace with co-op / professional development photo */}
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
                GEM includes a co-op option, so students can move between
                academic study and professional settings while they complete
                the major.
              </p>
              <p>
                Work-integrated learning is a practical part of the program.
                Co-op terms give students a chance to build experience, try
                different environments, and see how GEM ideas show up in real
                workplaces.
              </p>
              <ul className="gem-coop__points">
                {gemCoopPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="gem-official">
        <Container>
          <div className="gem-official__panel">
            <h2>Explore the Official Program</h2>
            <p>
              Curriculum, course requirements, admissions, co-op details, and
              other academic information are maintained by the University of
              Guelph. Use the official program page for the current details.
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
            GEMA is the student community around the major — a place to
            connect, get involved, and make GEM more than coursework.
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
