const FORMSPREE_ENDPOINT_PATTERN =
  /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/

export type FormspreeDevMock = 'success' | 'error'

/**
 * Public Formspree form URL from VITE_FORMSPREE_ENDPOINT.
 * Keep the URL in environment config so it can be changed without code edits.
 * Never hardcode a fallback form URL in application code.
 */
export function getFormspreeEndpoint() {
  const configured = import.meta.env.VITE_FORMSPREE_ENDPOINT
  if (typeof configured !== 'string') {
    return null
  }

  const value = configured.trim()
  if (!value) {
    return null
  }

  if (!FORMSPREE_ENDPOINT_PATTERN.test(value)) {
    return null
  }

  return value.replace(/\/+$/, '')
}

/**
 * Local-only success/error simulation. Ignored in production builds.
 * Set VITE_FORMSPREE_MOCK to "success" or "error" while developing.
 */
export function getFormspreeDevMock(): FormspreeDevMock | null {
  if (!import.meta.env.DEV) {
    return null
  }

  const mock = import.meta.env.VITE_FORMSPREE_MOCK?.trim()
  if (mock === 'success' || mock === 'error') {
    return mock
  }

  return null
}
