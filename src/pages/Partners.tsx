import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import {
  getPastPartners,
  partnerBenefits,
  partnerMedia,
  partnershipOpportunities,
  partnerSupport,
  pastPartnerPagePlaceholderCount,
  type Partner,
} from '../data/partners'
import './Partners.css'

function PartnerCard({ partner }: { partner: Partner }) {
  const logo = (
    <div className="partners-logo">
      {partner.logo ? (
        <img src={partner.logo} alt="" />
      ) : (
        <span>Past partner logo</span>
      )}
    </div>
  )

  const body = (
    <>
      {logo}
      <div className="partners-card__body">
        <h3>{partner.name}</h3>
        {partner.type ? <p className="partners-card__type">{partner.type}</p> : null}
        {partner.year ? <p className="partners-card__type">{partner.year}</p> : null}
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
  const pastPartners = getPastPartners()

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
              <h1>Partner with GEMA.</h1>
              <p className="partners-lede">
                GEMA works with organizations, professionals and community
                partners to create meaningful opportunities for students in
                Government, Economics & Management at the University of Guelph.
              </p>
              <p className="partners-lede">
                Through sponsorships, events and collaborative initiatives, our
                partners can support student development while connecting with
                the GEM community.
              </p>
              <div className="partners-hero__actions">
                <Link
                  className="partners-button partners-button--primary"
                  to="/contact?reason=partnership"
                >
                  Partner With GEMA
                </Link>
                <a
                  className="partners-button partners-button--secondary"
                  href="#partnership-opportunities"
                >
                  Explore Partnership Opportunities
                </a>
              </div>
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

      <section className="partners-past">
        <Container>
          <h2>Past Partners</h2>
          <p className="partners-section-copy">
            GEMA has worked with organizations and community partners to support
            student events, professional development and experiences throughout
            the GEM community.
          </p>
          {pastPartners.length > 0 ? (
            <div className="partners-past__grid">
              {pastPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="partners-past__grid">
              {Array.from({ length: pastPartnerPagePlaceholderCount }, (_, index) => (
                <div
                  key={`past-partner-placeholder-${index}`}
                  className="partners-card"
                >
                  <div className="partners-logo is-placeholder">
                    <span>Past partner logo</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <a
            className="partners-button partners-button--primary partners-past__cta"
            href="#partnership-opportunities"
          >
            Explore Partnership Opportunities
          </a>
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
          <p className="partners-section-copy">
            A partnership with GEMA creates opportunities for organizations to
            engage with University of Guelph students interested in the
            intersection of business, economics, government, management and
            public policy.
          </p>
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

      <section
        className="partners-opportunities"
        id="partnership-opportunities"
      >
        <Container>
          <h2>Explore Partnership Opportunities</h2>
          <p className="partners-section-copy">
            GEMA works with organizations in a variety of ways throughout the
            academic year. From sponsorship and professional programming to
            event collaboration and in-kind support, partnerships can be shaped
            around opportunities that provide meaningful value to students and
            participating organizations.
          </p>
          <ul className="partners-support__grid">
            {partnershipOpportunities.map((item) => (
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
          <div className="partners-opportunities__actions">
            <Link
              className="partners-button partners-button--primary"
              to="/contact?reason=corporate-package"
            >
              Request Corporate Package
            </Link>
            <Link
              className="partners-button partners-button--secondary"
              to="/contact?reason=partnership"
            >
              Start a Conversation
            </Link>
          </div>
        </Container>
      </section>

      <section className="partners-cta">
        <Container>
          <h2>Interested in working with GEMA?</h2>
          <p>
            Tell us about your organization and how you'd like to connect with
            the GEM community. We'd be happy to explore whether there's an
            opportunity to work together.
          </p>
          <div className="partners-cta__actions">
            <Link
              className="partners-button partners-button--primary"
              to="/contact?reason=partnership"
            >
              Contact GEMA
            </Link>
            <Link
              className="partners-button partners-button--secondary"
              to="/contact?reason=corporate-package"
            >
              Request Corporate Package
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
