import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SOCIAL_IMAGE_PATH,
  getPageSeo,
} from '../data/seo'
import { getAbsoluteUrl, getSiteOrigin } from '../lib/siteUrl'
import { site } from '../data/site'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.getElementById(id) as HTMLScriptElement | null

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

function getOrganizationSchema(origin: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.fullName,
    alternateName: site.name,
    description: site.affiliation,
    sameAs: [site.instagram.href, site.linkedin.href, site.tiktok.href],
  }

  if (site.email) {
    schema.email = site.email
  }

  if (origin) {
    schema.url = `${origin}/`
    schema.logo = `${origin}${SOCIAL_IMAGE_PATH}`
  }

  return schema
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = getPageSeo(pathname)
    const canonical = getAbsoluteUrl(page.index === false ? pathname : page.path)
    const origin = getSiteOrigin()
    const imageUrl = origin ? `${origin}${SOCIAL_IMAGE_PATH}` : SOCIAL_IMAGE_PATH
    const robots = page.index === false ? 'noindex, follow' : 'index, follow'

    document.title = page.title

    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', site.fullName)
    upsertMeta('property', 'og:locale', 'en_CA')
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', `${site.fullName} logo`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', imageUrl)

    if (canonical) {
      upsertLink('canonical', canonical)
      upsertMeta('property', 'og:url', canonical)
    }

    upsertJsonLd('gema-organization-schema', getOrganizationSchema(origin))
  }, [pathname])

  return null
}
