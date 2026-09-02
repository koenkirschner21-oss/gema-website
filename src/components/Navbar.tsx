import { useEffect, useId, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gemaLogo from '../assets/gema-logo.webp'
import { isDropdownItem, navigation } from '../data/navigation'
import { Container } from './Container'
import './Navbar.css'

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [menuPathname, setMenuPathname] = useState(location.pathname)
  const headerRef = useRef<HTMLElement>(null)
  const aboutItemRef = useRef<HTMLLIElement>(null)
  const aboutButtonRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef(0)
  const openedByHover = useRef(false)
  const aboutMenuId = useId()
  const mobileMenuId = useId()

  function closeMenus() {
    setMobileOpen(false)
    setAboutOpen(false)
    openedByHover.current = false
  }

  useEffect(() => {
    function getHeaderFocusable() {
      if (!headerRef.current) {
        return [] as HTMLElement[]
      }

      return [
        ...headerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ].filter((element) => !element.closest('[hidden]'))
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false)
          toggleRef.current?.focus()
          return
        }

        if (aboutOpen) {
          setAboutOpen(false)
          aboutButtonRef.current?.focus()
        }
        return
      }

      if (event.key !== 'Tab' || !mobileOpen) {
        return
      }

      const focusable = getHeaderFocusable()
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [aboutOpen, mobileOpen])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setAboutOpen(false)
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current)
  }, [])

  if (location.pathname !== menuPathname) {
    setMenuPathname(location.pathname)
    setMobileOpen(false)
    setAboutOpen(false)
  }

  function openAbout() {
    window.clearTimeout(closeTimer.current)
    setAboutOpen(true)
  }

  function scheduleCloseAbout() {
    if (!canHover()) {
      return
    }

    openedByHover.current = false
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setAboutOpen(false), 180)
  }

  function handleAboutMouseEnter() {
    if (!canHover()) {
      return
    }

    openedByHover.current = true
    openAbout()
  }

  function handleAboutClick() {
    if (openedByHover.current) {
      openedByHover.current = false
      return
    }

    setAboutOpen((open) => !open)
  }

  function handleAboutBlur(event: FocusEvent<HTMLLIElement>) {
    const next = event.relatedTarget
    if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
      setAboutOpen(false)
    }
  }

  function handleAboutKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setAboutOpen(true)
      window.requestAnimationFrame(() => {
        const links = aboutItemRef.current?.querySelectorAll('a')
        if (!links || links.length === 0) {
          return
        }
        const target =
          event.key === 'ArrowUp' ? links[links.length - 1] : links[0]
        target.focus()
      })
    }
  }

  const aboutActive = location.pathname.startsWith('/about')

  return (
    <header className="navbar" ref={headerRef}>
      <Container>
        <div className="navbar__inner">
          <Link
            to="/"
            className="navbar__brand"
            onClick={closeMenus}
            aria-label="GEMA home"
          >
            <img src={gemaLogo} alt="" width={465} height={200} decoding="async" />
          </Link>

          <button
            ref={toggleRef}
            className="navbar__toggle"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            onClick={() => {
              setMobileOpen((open) => !open)
              setAboutOpen(false)
            }}
          >
            <span className="visually-hidden">
              {mobileOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span
              className={mobileOpen ? 'navbar__icon is-open' : 'navbar__icon'}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>

          <nav
            id={mobileMenuId}
            className={mobileOpen ? 'navbar__nav is-open' : 'navbar__nav'}
            aria-label="Primary"
          >
            <ul className="navbar__list">
              {navigation.map((item) => {
                if (isDropdownItem(item)) {
                  return (
                    <li
                      key={item.label}
                      ref={aboutItemRef}
                      className="navbar__item navbar__item--dropdown"
                      onMouseEnter={handleAboutMouseEnter}
                      onMouseLeave={scheduleCloseAbout}
                      onBlur={handleAboutBlur}
                    >
                      <button
                        ref={aboutButtonRef}
                        type="button"
                        className={
                          aboutActive ? 'navbar__link is-active' : 'navbar__link'
                        }
                        aria-expanded={aboutOpen}
                        aria-haspopup="true"
                        aria-controls={aboutMenuId}
                        onClick={handleAboutClick}
                        onKeyDown={handleAboutKeyDown}
                      >
                        {item.label}
                        <svg
                          className="navbar__chevron"
                          viewBox="0 0 12 8"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M1 1.5 6 6.5 11 1.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                      <ul
                        id={aboutMenuId}
                        hidden={!aboutOpen}
                        className="navbar__dropdown"
                      >
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={closeMenus}
                              className={({ isActive }) =>
                                isActive
                                  ? 'navbar__dropdown-link is-active'
                                  : 'navbar__dropdown-link'
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                }

                return (
                  <li key={item.to} className="navbar__item">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        isActive ? 'navbar__link is-active' : 'navbar__link'
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
