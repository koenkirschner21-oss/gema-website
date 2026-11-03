import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGoogleAnalytics, trackPageView } from '../lib/analytics'

export function GoogleAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const measurementId = initGoogleAnalytics()
    if (!measurementId) {
      return
    }

    trackPageView(`${pathname}${search}`)
  }, [pathname, search])

  return null
}
