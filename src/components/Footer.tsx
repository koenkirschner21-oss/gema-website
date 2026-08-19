import { Link } from 'react-router-dom'
import gemaCrest from '../assets/gema-crest.png'
import { site } from '../data/site'
import { Container } from './Container'
import './Footer.css'

const footerLinks = [
  { label: 'About GEMA', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Partner With GEMA', to: '/partners' },
  { label: 'Contact', to: '/contact' },
]

function InstagramIcon() {
  return (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="12"
        cy="12"
        r="4.15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S.02 4.88.02 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.15h4.6V23H.2zM8.34 8.15h4.4v2.02h.06c.61-1.16 2.12-2.38 4.36-2.38 4.66 0 5.52 3.07 5.52 7.06V23h-4.6v-8.12c0-1.94-.03-4.43-2.7-4.43-2.7 0-3.12 2.11-3.12 4.29V23h-4.6z"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.2 2h2.72c.22 1.7 1.12 3.18 2.7 3.98A7.4 7.4 0 0 0 22.2 6.7v2.78a9.4 9.4 0 0 1-5.28-1.66v7.55A6.63 6.63 0 1 1 8.4 9.04v2.9a3.75 3.75 0 1 0 2.52 3.55V2z"
      />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [site.instagram, site.linkedin, site.tiktok]

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={gemaCrest} alt="" />
            <p className="footer__full-name">{site.fullName}</p>
            <p className="footer__meta">{site.school}</p>
            <p className="footer__meta">{site.university}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <p className="footer__heading">Quick Links</p>
            <ul>
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__connect">
            <p className="footer__heading">Connect</p>
            <ul>
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    className="footer__social"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label === 'Instagram' ? <InstagramIcon /> : null}
                    {item.label === 'LinkedIn' ? <LinkedInIcon /> : null}
                    {item.label === 'TikTok' ? <TikTokIcon /> : null}
                    <span>{item.label}</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {site.email ? (
                <li>
                  <a className="footer__email" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.fullName} · {site.university}
          </p>
        </div>
      </Container>
    </footer>
  )
}
