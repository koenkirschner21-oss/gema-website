import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  getActivePartners,
  partnerBenefits,
  partnerMedia,
  partnershipPackageUrl,
  partnerSupport,
  type Partner,
} from '../data/partners'
import './Partners.css'

function PartnerCard({ partner }: { partner: Partner }) {
  const logo = (
    <div className="partners-logo">
      {partner.logo ? (
        <img src={partner.logo} alt="" />
      ) : (
        <span className="visually-hidden">Logo to be added</span>
      )}
    </div>
  )

  const body = (
    <>
      {logo}
      <div className="partners-card__body">
        <h3>{partner.name}</h3>
        {partner.type ? <p className="partners-card__type">{partner.type}</p> : null}
        {partner.description ? <p>{partner.description}</p> : null}
      </div>
    </>
  )

  if (partner.url) {
    return (
      <a className="partners-card" href={partner.url} target="_blank" rel="noreferrer">
        {body}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    )
  }

  return <article className="partners-card">{body}</article>
}

export function Partners() {
  const activePartners = getActivePartners()
  const packageHref = partnershipPackageUrl ?? '/contact'

  useEffect(() => {
    document.title = 'Partners & Sponsors | GEMA'
  }, [])

  return (
    <article className="partners">
      <section className="partners-hero">
        <Container>
          <div className="partners-hero__grid">
            <div className="partners-hero__copy">
              <p className="partners-eyebrow">PARTNERS & SPONSORS</p>
              <h1>Building opportunities through partnership.</h1>
              <p className="partners-lede">
                GEMA works with organizations and professionals to create
                opportunities, experiences, and connections for students.
                Partnerships help bring events, professional development, and
                community initiatives to life.
              </p>
            </div>
            <div className="partners-hero__media">
              <PhotoPlaceholder
                src={partnerMedia.hero.src}
                label={partnerMedia.hero.label}
                alt={partnerMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="partners-current">
        <Container>
          <h2>Current Partners</h2>
          {activePartners.length > 0 ? (
            <div className="partners-current__grid">
              {activePartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="partners-current__empty">
              <p className="partners-current__empty-title">
                Partner organizations will be listed here.
              </p>
              <p>
                GEMA works with companies, alumni, and community partners
                throughout the year. Check back as current collaborations are
                confirmed, or start a conversation about working together.
              </p>
              <Link
                className="partners-button partners-button--primary"
                to="/contact"
              >
                Start a Conversation
              </Link>
            </div>
          )}
        </Container>
      </section>

      <section className="partners-support">
        <Container>
          <h2>How Partners Support GEMA</h2>
          <ul className="partners-support__grid">
            {partnerSupport.map((item) => (
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="partners-why">
        <Container>
          <h2>Why Partner With GEMA?</h2>
          <div className="partners-why__grid">
            <div className="partners-why__media">
              <PhotoPlaceholder
                src={partnerMedia.why.src}
                label={partnerMedia.why.label}
                alt={partnerMedia.why.alt}
                ratio="editorial"
              />
            </div>
            <ol className="partners-why__list">
              {partnerBenefits.map((item, index) => (
                <li key={item.title} data-accent={item.accent}>
                  <span className="partners-why__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="partners-invite">
        <Container>
          <div className="partners-invite__panel">
            <h2>Partner With GEMA</h2>
            <p>
              Organizations, alumni, professionals, and community partners are
              invited to discuss sponsorships, collaboration, event
              participation, or other ways of working with GEMA.
            </p>
            <div className="partners-invite__actions">
              <Link
                className="partners-button partners-button--on-red"
                to="/contact"
              >
                Start a Conversation
              </Link>
              {partnershipPackageUrl ? (
                <a
                  className="partners-button partners-button--on-red-secondary"
                  href={packageHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Partnership Information
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  className="partners-button partners-button--on-red-secondary"
                  to="/contact"
                >
                  View Partnership Information
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="partners-cta">
        <Container>
          <h2>See GEMA in action.</h2>
          <p>
            Explore current programming to see the kinds of student experiences
            partnerships can help support.
          </p>
          <div className="partners-cta__actions">
            <Link className="partners-button partners-button--primary" to="/events">
              Explore Events
            </Link>
            <Link
              className="partners-button partners-button--secondary"
              to="/contact"
            >
              Contact GEMA
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
