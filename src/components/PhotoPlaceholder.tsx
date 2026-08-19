import { useState } from 'react'
import './PhotoPlaceholder.css'

type PhotoPlaceholderProps = {
  label: string
  alt: string
  src?: string | null
  ratio: 'wide' | 'square' | 'editorial'
}

export function PhotoPlaceholder({
  label,
  alt,
  src,
  ratio,
}: PhotoPlaceholderProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <figure className={`photo-placeholder photo-placeholder--${ratio}`}>
      {showImage ? (
        <img src={src ?? undefined} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <>
          <span className="visually-hidden">{alt}</span>
          {src ? null : (
            <figcaption className="photo-placeholder__label">{label}</figcaption>
          )}
        </>
      )}
    </figure>
  )
}
