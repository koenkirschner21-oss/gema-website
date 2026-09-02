/**
 * Normalize VITE_SITE_URL into an origin (`https://example.com`).
 *
 * Returns empty until a real production origin is configured.
 * Preview hosts (`*.vercel.app`) are ignored so they cannot become
 * canonical/sitemap URLs. Leave the env var unset on preview builds.
 */
export function normalizeSiteUrl(value: string | undefined) {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmed = value.trim()
  if (!trimmed || trimmed === '/') {
    return ''
  }

  try {
    const parsed = new URL(trimmed)
    const hostname = parsed.hostname.toLowerCase()
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return ''
    }

    if (parsed.protocol === 'http:' && !isLocalhost) {
      return ''
    }

    if (hostname === 'vercel.app' || hostname.endsWith('.vercel.app')) {
      return ''
    }

    if (parsed.username || parsed.password) {
      return ''
    }

    if (parsed.pathname !== '/' && parsed.pathname !== '') {
      return ''
    }

    if (parsed.search || parsed.hash) {
      return ''
    }

    return parsed.origin
  } catch {
    return ''
  }
}
