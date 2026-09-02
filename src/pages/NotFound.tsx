import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import './NotFound.css'

export function NotFound() {
  return (
    <article className="not-found">
      <section className="not-found__panel">
        <Container>
          <p className="not-found__eyebrow">Page not found</p>
          <span className="not-found__accent" aria-hidden="true" />
          <h1>This page isn’t available.</h1>
          <p>
            The page you’re looking for doesn’t exist or may have moved. Return
            to the GEMA homepage to keep exploring the association.
          </p>
          <Link className="not-found__button" to="/">
            Back to the GEMA homepage
          </Link>
        </Container>
      </section>
    </article>
  )
}
