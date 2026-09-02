import { useState, type ImgHTMLAttributes } from 'react'

type SiteImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'loading' | 'fetchPriority'
> & {
  priority?: boolean
}

export function SiteImage({
  priority = false,
  decoding = 'async',
  alt = '',
  onError,
  ...props
}: SiteImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return null
  }

  return (
    <img
      {...props}
      alt={alt}
      decoding={decoding}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
    />
  )
}
