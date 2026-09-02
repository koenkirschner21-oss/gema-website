import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { SiteImage } from '../components/SiteImage'
import {
  gemCoopPoints,
  gemFacets,
  gemMedia,
  gemOfficialCoopUrl,
  gemOfficialProgramUrl,
} from '../data/gemMajor'
import './GemMajor.css'

function GemMedia({
  src,
  alt,
  ratio,
  priority = false,
  width,
  height,
}: {
  src: string | null
  alt: string
  ratio: 'wide' | 'editorial'
  priority?: boolean
  width?: number
  height?: number
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure className={`photo-placeholder photo-placeholder--${ratio}`}>
      {showImage ? (
        <SiteImage
          src={src ?? undefined}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="visually-hidden">{alt}</span>
      )}
    </figure>
  )
}

export function GemMajor() {
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
                {gemOfficialProgramUrl ? (
                  <a
                    className="gem-button gem-button--primary"
                    href={gemOfficialProgramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore the Official Program
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="gem-button gem-button--primary">
                    Explore the Official Program
                  </span>
                )}
                <Link
                  className="gem-button gem-button--secondary"
                  to="/get-involved"
                >
                  Get Involved with GEMA
                </Link>
              </div>
            </div>
            <div className="gem-hero__media">
              <GemMedia
                src={gemMedia.hero.src}
                alt={gemMedia.hero.alt}
                ratio="wide"
                priority
                width={1440}
                height={560}
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
              <GemMedia
                src={gemMedia.coop.src}
                alt={gemMedia.coop.alt}
                ratio="editorial"
                width={858}
                height={570}
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
              <ul className="gem-coop__points">
                {gemCoopPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {gemOfficialCoopUrl ? (
                <a
                  className="gem-button gem-button--primary"
                  href={gemOfficialCoopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn About GEM Co-op
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="gem-official">
        <Container>
          <div className="gem-official__grid">
            <div className="gem-official__copy">
              <p className="gem-official__label">Official Program Information</p>
              <h2>Explore the official GEM program.</h2>
              <p className="gem-official__body">
                For curriculum, course requirements, admissions, co-op
                requirements and other formal academic details, use the
                University of Guelph’s official Government, Economics &
                Management program page.
              </p>
            </div>
            <div className="gem-official__action">
              {gemOfficialProgramUrl ? (
                <a
                  className="gem-button gem-button--primary"
                  href={gemOfficialProgramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Official GEM Program
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="gem-button gem-button--primary">
                  View Official GEM Program
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="gem-cta">
        <Container>
          <div className="gem-cta__grid">
            <div className="gem-cta__copy">
              <h2>Make the most of your GEM experience.</h2>
              <p>
                Your program is only one part of your university experience. GEMA
                gives GEM students more ways to meet people, attend events, build
                experience and get involved outside the classroom.
              </p>
            </div>
            <div className="gem-cta__actions">
              <Link className="gem-button gem-button--on-red" to="/get-involved">
                Get Involved
              </Link>
              <Link className="gem-button gem-button--on-red-secondary" to="/about">
                About GEMA
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
