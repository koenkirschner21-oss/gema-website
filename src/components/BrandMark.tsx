import gemaCrest from '../assets/gema-crest.png'
import gemaLogo from '../assets/gema-logo.webp'
import { site } from '../data/site'
import './BrandMark.css'

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'hero'

export function BrandMark({
  size = 'md',
  className = '',
}: {
  size?: BrandMarkSize
  className?: string
}) {
  const classNames = ['brand-mark', `brand-mark--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      className={classNames}
      src={gemaCrest}
      alt=""
      width={205}
      height={256}
      decoding="async"
      aria-hidden="true"
    />
  )
}

export function BrandLockup({ className = '' }: { className?: string }) {
  return (
    <img
      className={['brand-lockup', className].filter(Boolean).join(' ')}
      src={gemaLogo}
      alt={site.fullName}
      width={465}
      height={200}
      decoding="async"
    />
  )
}
