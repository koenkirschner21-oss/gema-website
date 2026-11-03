const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false
let lastTrackedPath: string | null = null

/**
 * Public GA4 measurement ID from VITE_GA_MEASUREMENT_ID.
 * Leave unset in local development so analytics never load there.
 */
export function getGaMeasurementId(): string | null {
  const configured = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (typeof configured !== 'string') {
    return null
  }

  const value = configured.trim()
  if (!value || !GA_MEASUREMENT_ID_PATTERN.test(value)) {
    return null
  }

  return value
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }
}

/**
 * Load gtag once when a measurement ID is configured.
 * Automatic first page_view is disabled so SPA navigations own page tracking.
 */
export function initGoogleAnalytics(): string | null {
  const measurementId = getGaMeasurementId()
  if (!measurementId || initialized || typeof document === 'undefined') {
    return measurementId
  }

  ensureGtag()

  const scriptId = 'gema-ga4-gtag'
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })
  initialized = true

  return measurementId
}

/** Send a single page_view for the current SPA location. */
export function trackPageView(path: string) {
  const measurementId = getGaMeasurementId()
  if (!measurementId || !initialized || typeof window.gtag !== 'function') {
    return
  }

  if (path === lastTrackedPath) {
    return
  }

  lastTrackedPath = path

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  })
}
