import { useEffect } from 'react'
import { Container } from './Container'
import './PageHero.css'

type PageHeroProps = {
  title: string
  description: string
}

export function PageHero({ title, description }: PageHeroProps) {
  useEffect(() => {
    document.title = `${title} | GEMA`
  }, [title])

  return (
    <section className="page-hero">
      <Container>
        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    </section>
  )
}
