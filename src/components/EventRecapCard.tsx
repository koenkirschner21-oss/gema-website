import { useId, useState } from 'react'
import { formatEventDate } from '../data/events'
import type { EventRecap, EventRecapImage } from '../data/eventRecaps'
import { SiteImage } from './SiteImage'
import './EventRecapCard.css'

function RecapPhoto({
  image,
  fit = 'cover',
  priority = false,
}: {
  image: EventRecapImage
  fit?: 'cover' | 'contain'
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className="event-recap__photo">
      {failed ? (
        <span className="visually-hidden">{image.alt}</span>
      ) : (
        <SiteImage
          src={image.src}
          alt={image.alt}
          priority={priority}
          style={{
            objectFit: fit,
            objectPosition: image.objectPosition ?? 'center',
          }}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  )
}

function RecapSlideshow({
  images,
  label,
}: {
  images: EventRecapImage[]
  label: string
}) {
  const [index, setIndex] = useState(0)
  const labelId = useId()
  const count = images.length
  const current = images[index] ?? images[0]

  if (!current) {
    return null
  }

  if (count === 1) {
    return (
      <div className="event-recap__photos event-recap__photos--photos" data-count="1">
        <RecapPhoto image={current} fit="cover" priority />
      </div>
    )
  }

  function goTo(next: number) {
    setIndex(((next % count) + count) % count)
  }

  return (
    <div
      className="event-recap__slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="visually-hidden">
        {label} photos
      </p>
      <div className="event-recap__slideshow-frame" data-count={count}>
        {images.map((image, imageIndex) => (
          <div
            key={image.src}
            className={
              imageIndex === index
                ? 'event-recap__slideshow-slide is-active'
                : 'event-recap__slideshow-slide'
            }
            aria-hidden={imageIndex !== index}
          >
            <RecapPhoto
              image={image}
              fit="cover"
              priority={imageIndex === 0}
            />
          </div>
        ))}

        <div className="event-recap__slideshow-nav">
          <button
            type="button"
            className="event-recap__slideshow-arrow"
            aria-label={`Previous ${label.replace(/\s+\d{4}$/, '')} photo`}
            onClick={() => goTo(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="event-recap__slideshow-arrow"
            aria-label={`Next ${label.replace(/\s+\d{4}$/, '')} photo`}
            onClick={() => goTo(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <div className="event-recap__slideshow-dots" role="tablist" aria-label={`${label} photo pages`}>
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={imageIndex === index}
            aria-label={`Show photo ${imageIndex + 1} of ${count}`}
            className={
              imageIndex === index
                ? 'event-recap__slideshow-dot is-active'
                : 'event-recap__slideshow-dot'
            }
            onClick={() => goTo(imageIndex)}
          />
        ))}
      </div>
    </div>
  )
}

function RecapBody({
  shortRecap,
  moreRecap,
  title,
}: {
  shortRecap: string
  moreRecap?: string | null
  title: string
}) {
  const [expanded, setExpanded] = useState(false)

  if (!moreRecap) {
    return <p className="event-recap__body">{shortRecap}</p>
  }

  return (
    <div className="event-recap__body-block">
      <p className="event-recap__body">{expanded ? moreRecap : shortRecap}</p>
      <button
        type="button"
        className="event-recap__more"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? 'Show less' : 'Read more'}
        <span className="visually-hidden"> about {title}</span>
      </button>
    </div>
  )
}

function RecapIntro({ recap, meta }: { recap: EventRecap; meta: string }) {
  return (
    <>
      <p className="event-recap__date">{formatEventDate(recap.date)}</p>
      {recap.category ? (
        <p className="event-recap__category">{recap.category}</p>
      ) : null}
      <h3>{recap.title}</h3>
      {recap.subtitle ? (
        <p className="event-recap__subtitle">{recap.subtitle}</p>
      ) : null}
      {meta ? <p className="event-recap__meta">{meta}</p> : null}
    </>
  )
}

function RecapGalleryLink({ recap }: { recap: EventRecap }) {
  if (!recap.galleryUrl) {
    return null
  }

  return (
    <a
      className="event-recap__gallery"
      href={recap.galleryUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Photo Gallery
      <span className="visually-hidden">
        {' '}
        for {recap.title} (opens in a new tab)
      </span>
    </a>
  )
}

export function EventRecapCard({ recap }: { recap: EventRecap }) {
  const photos = recap.featuredImages.slice(0, 4)
  const photoCount = photos.length
  const visualMode = recap.visualMode ?? (photoCount > 1 ? 'photos' : 'graphic')
  const meta = [recap.time, recap.location, recap.cost].filter(Boolean).join(' · ')

  if (visualMode === 'photos') {
    return (
      <article className="event-recap event-recap--photos">
        <div className="event-recap__copy">
          <div className="event-recap__intro">
            <RecapIntro recap={recap} meta={meta} />
          </div>
          <div className="event-recap__details">
            <RecapBody
              shortRecap={recap.shortRecap}
              moreRecap={recap.moreRecap}
              title={recap.title}
            />
            <RecapGalleryLink recap={recap} />
          </div>
        </div>
        {photoCount > 0 ? (
          <div className="event-recap__media">
            <RecapSlideshow images={photos} label={recap.title} />
          </div>
        ) : null}
      </article>
    )
  }

  return (
    <article className="event-recap">
      <div className="event-recap__copy">
        <RecapIntro recap={recap} meta={meta} />
        <RecapBody
          shortRecap={recap.shortRecap}
          moreRecap={recap.moreRecap}
          title={recap.title}
        />
        <RecapGalleryLink recap={recap} />
      </div>
      {photoCount > 0 ? (
        <div
          className="event-recap__photos event-recap__photos--graphic"
          data-count={photoCount}
        >
          {photos.map((image) => (
            <RecapPhoto key={image.src} image={image} fit="contain" />
          ))}
        </div>
      ) : null}
    </article>
  )
}
