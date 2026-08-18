import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { aboutMedia, aboutValues, aboutWork } from '../data/about'
import './About.css'

export function About() {
  useEffect(() => {
    document.title = 'About GEMA | GEMA'
  }, [])

  return (
    <article className="about">
      <section className="about-hero">
        <Container>
          <div className="about-hero__grid">
            <div className="about-hero__copy">
              <p className="about-eyebrow">About GEMA</p>
              <h1>About GEMA</h1>
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
              <PhotoPlaceholder
                src={aboutMedia.hero.src}
                label={aboutMedia.hero.label}
                alt={aboutMedia.hero.alt}
                ratio="wide"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="about-who">
        <Container>
          <div className="about-who__grid">
            <div className="about-who__media">
              <PhotoPlaceholder
                src={aboutMedia.community.src}
                label={aboutMedia.community.label}
                alt={aboutMedia.community.alt}
                ratio="square"
              />
            </div>
            <div className="about-who__copy">
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
            {aboutValues.map((item, index) => (
              <li
                key={item.title}
                className="about-values__item"
                data-accent={item.accent}
              >
                <span className="about-values__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
              <PhotoPlaceholder
                src={aboutMedia.events.src}
                label={aboutMedia.events.label}
                alt={aboutMedia.events.alt}
                ratio="editorial"
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
          <h2>Be part of the GEMA community.</h2>
          <p>
            Whether you want to attend an event, meet other GEM students or take
            on a larger role within the association, there are plenty of ways to
            get involved.
          </p>
          <div className="about-cta__actions">
            <Link className="about-button about-button--primary" to="/get-involved">
              Get Involved
            </Link>
            <Link className="about-button about-button--secondary" to="/events">
              Explore Events
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
