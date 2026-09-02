import { stripTrailingSlash } from '../data/seo'
import { normalizeSiteUrl } from './normalizeSiteUrl'

/** Build-time origin from VITE_SITE_URL. Empty until the production domain is set. */
export function getConfiguredSiteUrl() {
  return normalizeSiteUrl(import.meta.env.VITE_SITE_URL)
}

/**
 * Absolute origin for canonical/OG URLs.
 * Prefers VITE_SITE_URL; otherwise uses the current host so preview builds
 * do not invent a domain.
 */
export function getSiteOrigin() {
  const configured = getConfiguredSiteUrl()
  if (configured) {
    return configured
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return stripTrailingSlash(window.location.origin)
  }

  return ''
}

export function getAbsoluteUrl(pathname: string) {
  const origin = getSiteOrigin()
  if (!origin) {
    return ''
  }

  if (pathname === '/') {
    return `${origin}/`
  }

  return `${origin}${pathname}`
}
