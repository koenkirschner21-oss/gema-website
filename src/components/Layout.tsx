import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import './Layout.css'

export function Layout() {
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
