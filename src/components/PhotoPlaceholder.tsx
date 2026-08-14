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
  return (
    <figure className={`photo-placeholder photo-placeholder--${ratio}`}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <figcaption className="photo-placeholder__label">{label}</figcaption>
      )}
    </figure>
  )
}
