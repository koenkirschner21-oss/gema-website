import { useState } from 'react'
import type { Partner } from '../data/partners'
import { SiteImage } from './SiteImage'
import './FeaturedPartner.css'

export function FeaturedPartner({ partner }: { partner: Partner }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const logoAlt = 'Apply Yourself Global logo'
  const showLogo = Boolean(partner.logo) && !logoFailed

  const mark = showLogo ? (
    <SiteImage
      src={partner.logo ?? undefined}
      alt={logoAlt}
      width={512}
      height={512}
      onError={() => setLogoFailed(true)}
    />
  ) : null

  return (
    <article className="partners-featured">
      {showLogo ? (
        partner.url ? (
          <a
            className="partners-featured__mark"
            href={partner.url}
            target="_blank"
            rel="noreferrer"
          >
            {mark}
            <span className="visually-hidden">
              Apply Yourself Global (opens in a new tab)
            </span>
          </a>
        ) : (
          <div className="partners-featured__mark">{mark}</div>
        )
      ) : null}
      <div className="partners-featured__copy">
        {partner.type ? (
          <p className="partners-featured__type">{partner.type}</p>
        ) : null}
        <h3>
          {partner.url ? (
            <a href={partner.url} target="_blank" rel="noreferrer">
              {partner.name}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            partner.name
          )}
        </h3>
        {partner.description ? <p>{partner.description}</p> : null}
        {partner.url ? (
          <a
            className="partners-featured__cta"
            href={partner.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit Apply Yourself Global
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
