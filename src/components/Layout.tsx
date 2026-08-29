import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import './Layout.css'

export function Layout() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))

      const scrollToHash = () => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView()
          return true
        }
        return false
      }

      if (scrollToHash()) {
        return
      }

      const frame = window.requestAnimationFrame(() => {
        if (!scrollToHash()) {
          window.scrollTo(0, 0)
        }
      })

      return () => window.cancelAnimationFrame(frame)
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="layout">
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
