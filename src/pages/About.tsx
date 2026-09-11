import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandLockup } from '../components/BrandMark'
import { Container } from '../components/Container'
import { SiteImage } from '../components/SiteImage'
import { aboutMedia, aboutValues, aboutWork } from '../data/about'
import './About.css'

function AboutMedia({
  src,
  alt,
  ratio,
  priority = false,
  width,
  height,
}: {
  src: string | null
  alt: string
  ratio: 'wide' | 'square' | 'editorial'
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

export function About() {
  return (
    <article className="about">
      <section className="about-hero">
        <Container>
          <div className="about-hero__grid">
            <div className="about-hero__copy">
              <p className="about-eyebrow">About GEMA</p>
              <h1>Built to connect, represent, and grow the GEM community.</h1>
              <p className="about-lede">
                The Government, Economics & Management Association is the
                student association representing the GEM community at the
                University of Guelph. GEMA creates opportunities for students to
                connect, get involved, develop professionally and strengthen
                their university experience beyond the classroom.
              </p>
              <div className="about-hero__actions">
                <Link
                  className="about-button about-button--primary"
                  to="/get-involved"
                >
                  Get Involved
                </Link>
              </div>
            </div>
            <div className="about-hero__media">
              <AboutMedia
                src={aboutMedia.hero.src}
                alt={aboutMedia.hero.alt}
                ratio="wide"
                priority
                width={1600}
                height={1066}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="about-who">
        <Container>
          <div className="about-who__grid">
            <div className="about-who__media">
              <AboutMedia
                src={aboutMedia.community.src}
                alt={aboutMedia.community.alt}
                ratio="square"
                width={1600}
                height={1066}
              />
            </div>
            <div className="about-who__copy">
              <BrandLockup className="about-who__lockup" />
              <h2>Who We Are</h2>
              <p>
                GEMA represents students in the Government, Economics &
                Management major within the Gordon S. Lang School of Business
                and Economics.
              </p>
              <p>
                Our role extends beyond organizing events. We help create a
                stronger GEM community by connecting students with one another,
                providing opportunities to participate outside the classroom and
                helping ensure students have a voice within their program.
              </p>
              <p>
                GEMA is led by students and built around the experiences,
                interests and opportunities that matter to the GEM community.
              </p>
              <Link className="about-text-link" to="/about/team">
                Meet the Team
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-values">
        <Container>
          <div className="about-values__intro">
            <h2>Our Purpose & Values</h2>
            <p>
              Everything GEMA does is built around creating a stronger, more
              connected and more valuable experience for GEM students.
            </p>
          </div>
          <ul className="about-values__grid">
            {aboutValues.map((item) => (
              <li key={item.title} data-accent={item.accent}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="about-work">
        <Container>
          <h2>What We Do</h2>
          <div className="about-work__grid">
            <div className="about-work__media">
              <AboutMedia
                src={aboutMedia.events.src}
                alt={aboutMedia.events.alt}
                ratio="editorial"
                width={1200}
                height={1600}
              />
            </div>
            <ol className="about-work__list">
              {aboutWork.map((item, index) => (
                <li
                  key={item.title}
                  className="about-work__item"
                  data-accent={item.accent}
                >
                  <span className="about-work__index">
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

      <section className="about-cta">
        <Container>
          <div className="about-cta__grid">
            <div className="about-cta__copy">
              <h2>Be part of the GEMA community.</h2>
              <p>
                Whether you want to attend an event, meet other GEM students or
                take on a larger role within the association, there are plenty
                of ways to get involved.
              </p>
            </div>
            <div className="about-cta__actions">
              <Link
                className="about-button about-button--on-red"
                to="/get-involved"
              >
                Get Involved
              </Link>
              <Link
                className="about-button about-button--on-red-secondary"
                to="/events"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
