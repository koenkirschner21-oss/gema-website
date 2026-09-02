import { useState } from 'react'
import { formatEventDate } from '../data/events'
import type { EventRecap, EventRecapImage } from '../data/eventRecaps'
import './EventRecapCard.css'

function RecapPhoto({ image }: { image: EventRecapImage }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className="event-recap__photo">
      {failed ? (
        <span className="visually-hidden">{image.alt}</span>
      ) : (
        <img src={image.src} alt={image.alt} onError={() => setFailed(true)} />
      )}
    </figure>
  )
}

export function EventRecapCard({ recap }: { recap: EventRecap }) {
  const photos = recap.featuredImages.slice(0, 4)
  const photoCount = photos.length

  return (
    <article className="event-recap">
      <div className="event-recap__copy">
        <p className="event-recap__date">{formatEventDate(recap.date)}</p>
        {recap.category ? (
          <p className="event-recap__category">{recap.category}</p>
        ) : null}
        <h3>{recap.title}</h3>
        {recap.location ? (
          <p className="event-recap__meta">{recap.location}</p>
        ) : null}
        <p className="event-recap__body">{recap.shortRecap}</p>
        {recap.galleryUrl ? (
          <a
            className="event-recap__gallery"
            href={recap.galleryUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Photo Gallery
            <span className="visually-hidden">
              {' '}
              for {recap.title} (opens in a new tab)
            </span>
          </a>
        ) : null}
      </div>
      {photoCount > 0 ? (
        <div
          className="event-recap__photos"
          data-count={photoCount}
        >
          {photos.map((image) => (
            <RecapPhoto key={image.src} image={image} />
          ))}
        </div>
      ) : null}
    </article>
  )
}
