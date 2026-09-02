import type { ImgHTMLAttributes } from 'react'

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
  ...props
}: SiteImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      decoding={decoding}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
