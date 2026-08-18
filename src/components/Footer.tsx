import { Link } from 'react-router-dom'
import gemaCrest from '../assets/gema-crest.png'
import { flattenNavigation, navigation } from '../data/navigation'
import { site } from '../data/site'
import { Container } from './Container'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()
  const footerLinks = flattenNavigation(navigation)

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={gemaCrest} alt="" />
            <p className="footer__name">{site.shortName}</p>
            <p className="footer__full-name">{site.fullName}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <p className="footer__heading">Explore</p>
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
              <li>
                <a href={site.instagram.href} target="_blank" rel="noreferrer">
                  {site.instagram.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.linkedin.href} target="_blank" rel="noreferrer">
                  {site.linkedin.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{site.affiliation}</p>
          <p>
            © {year} {site.fullName}
          </p>
        </div>
      </Container>
    </footer>
  )
}
