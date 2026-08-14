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
              <h1>Built to connect, represent, and grow the GEM community.</h1>
              <p className="about-lede">
                GEMA is the student association representing students in the
                Government, Economics and Management major at the Gordon S. Lang
                School of Business and Economics, University of Guelph. We bring
                GEM students together, represent their interests, and help build
                a stronger community around the program.
              </p>
            </div>
            <div className="about-hero__media">
              {/* Replace with current GEMA student/team photo */}
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
              {/* Replace with GEMA event or community photo */}
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
                GEMA represents students in Government, Economics and Management
                at the Gordon S. Lang School of Business and Economics. We exist
                so the major feels like a community — a group of people you can
                meet, learn with, and stay connected to.
              </p>
              <p>
                That means creating space for students to connect with one
                another, and supporting professional and personal development
                alongside coursework.
              </p>
              <p>
                From events and conversations to student representation, GEMA
                helps strengthen the GEM experience beyond the classroom.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-values">
        <Container>
          <div className="about-values__intro">
            <h2>Our Purpose & Values</h2>
            <p>Four ideas guide how GEMA shows up for students in the major.</p>
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
              {/* Replace with GEMA event photography */}
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
            Attend an event, meet other students in the major, or find a way to
            get involved with the association.
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
