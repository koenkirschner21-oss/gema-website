import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { FeaturedPartner } from '../components/FeaturedPartner'
import { SiteImage } from '../components/SiteImage'
import {
  getCurrentGridPartners,
  getFeaturedPartners,
  partnerBenefits,
  partnerMedia,
  partnerSupport,
  type Partner,
} from '../data/partners'
import './Partners.css'

function PartnersMedia({
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

function PartnerLogo({
  src,
  alt,
}: {
  src: string | null
  alt: string
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={showImage ? 'partners-logo' : 'partners-logo is-placeholder'}>
      {showImage ? (
        <SiteImage
          src={src ?? undefined}
          alt={alt}
          width={512}
          height={512}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="visually-hidden">{alt || 'Partner logo to be added'}</span>
      )}
    </div>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const logo = (
    <PartnerLogo
      src={partner.logo}
      alt={partner.name ? `${partner.name} logo` : 'Partner logo to be added'}
    />
  )

  const body = (
    <>
      {logo}
      <div className="partners-card__body">
        {partner.name ? <h3>{partner.name}</h3> : null}
        {partner.type ? <p className="partners-card__type">{partner.type}</p> : null}
        {partner.year ? <p className="partners-card__type">{partner.year}</p> : null}
      </div>
    </>
  )

  if (partner.url) {
    return (
      <a className="partners-card" href={partner.url} target="_blank" rel="noopener noreferrer">
        {body}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    )
  }

  return <article className="partners-card">{body}</article>
}

export function Partners() {
  const featuredPartners = getFeaturedPartners()
  const gridPartners = getCurrentGridPartners()

  return (
    <article className="partners">
      <section className="partners-hero">
        <Container>
          <div className="partners-hero__grid">
            <div className="partners-hero__copy">
              <p className="partners-eyebrow">PARTNERS & SPONSORS</p>
              <h1>Building opportunities through partnership.</h1>
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
                  to="/contact?reason=partnership#send-message"
                >
                  Partner With GEMA
                </Link>
                <Link
                  className="partners-button partners-button--secondary"
                  to="#partner-with-gema"
                >
                  Explore Partnership Opportunities
                </Link>
              </div>
            </div>
            <div className="partners-hero__media">
              <PartnersMedia
                src={partnerMedia.hero.src}
                alt={partnerMedia.hero.alt}
                ratio="wide"
                priority
                width={1600}
                height={1066}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="partners-current">
        <Container>
          <h2>Current Partners</h2>
          {featuredPartners.length > 0 ? (
            <div className="partners-featured-list">
              {featuredPartners.map((partner) => (
                <FeaturedPartner key={partner.id} partner={partner} />
              ))}
            </div>
          ) : null}
          {gridPartners.length > 0 ? (
            <div className="partners-current__more">
              <div className="partners-current__grid">
                {gridPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          ) : null}
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
          <div className="partners-why__grid">
            <div className="partners-why__media">
              <PartnersMedia
                src={partnerMedia.why.src}
                alt={partnerMedia.why.alt}
                ratio="editorial"
                width={1200}
                height={1600}
              />
            </div>
            <div className="partners-why__content">
              <h2>Why Partner With GEMA?</h2>
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
          </div>
        </Container>
      </section>

      <section className="partners-cta" id="partner-with-gema">
        <Container>
          <div className="partners-cta__grid">
            <div className="partners-cta__copy">
              <p className="partners-cta__label">Work With GEMA</p>
              <h2>Let’s create something valuable for GEM students.</h2>
              <p>
                Whether you’re interested in sponsorship, professional
                programming, event collaboration or another way of supporting
                the GEM community, tell us about your organization and what you
                have in mind.
              </p>
            </div>
            <div className="partners-cta__action">
              <Link
                className="partners-button partners-button--on-red"
                to="/contact?reason=partnership#send-message"
              >
                Start a Partnership Conversation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
