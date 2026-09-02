import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Seo } from './Seo'
import './Layout.css'

export function Layout() {
  const location = useLocation()

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(location.hash.slice(1))
    let cancelled = false

    const scrollToHash = () => {
      if (cancelled) {
        return true
      }

      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView()
        return true
      }

      return false
    }

    scrollToHash()

    const frame = window.requestAnimationFrame(() => {
      if (!scrollToHash()) {
        window.scrollTo(0, 0)
      }
    })

    // Browser restoration can overwrite the first scroll after a full load.
    const timeout = window.setTimeout(scrollToHash, 50)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="layout">
      <Seo />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
