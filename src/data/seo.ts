/**
 * Central SEO configuration for public routes.
 *
 * Production origin: set `VITE_SITE_URL` to the https origin in the
 * Vercel Production environment when the custom domain is confirmed.
 * Do not put an unconfirmed domain in source control.
 *
 * Preview builds stay safe by resolving absolute URLs from the current
 * origin at runtime and by omitting sitemap.xml until `VITE_SITE_URL`
 * is set at build time. Do not point this variable at *.vercel.app.
 */
export const SOCIAL_IMAGE_PATH = '/og-image.png'

export type PageSeo = {
  path: string
  title: string
  description: string
  index?: boolean
}

export const homeSeo: PageSeo = {
  path: '/',
  title: 'GEMA | Government, Economics & Management Association',
  description:
    'GEMA is the student association for Government, Economics & Management at the University of Guelph’s Gordon S. Lang School of Business and Economics.',
}

export const publicPageSeo: PageSeo[] = [
  homeSeo,
  {
    path: '/about',
    title: 'About GEMA | University of Guelph',
    description:
      'Learn about GEMA, the Government, Economics & Management Association representing GEM students at the University of Guelph.',
  },
  {
    path: '/about/team',
    title: 'Meet the Team | GEMA',
    description:
      'Meet the University of Guelph students who lead GEMA and represent the Government, Economics & Management community.',
  },
  {
    path: '/gem-major',
    title: 'GEM Major | GEMA',
    description:
      'Learn about the Government, Economics & Management (GEM) major at the University of Guelph and how GEMA supports students in the program.',
  },
  {
    path: '/events',
    title: 'GEMA Events | University of Guelph',
    description:
      'See upcoming GEMA events at the University of Guelph, from professional development and networking to community programming for GEM students.',
  },
  {
    path: '/get-involved',
    title: 'Get Involved | GEMA',
    description:
      'Find ways to get involved with GEMA through events, leadership opportunities, and student initiatives at the University of Guelph.',
  },
  {
    path: '/partners',
    title: 'Partner With GEMA | University of Guelph',
    description:
      'Partner with GEMA to support GEM students at the University of Guelph through sponsorship, events, and community collaboration.',
  },
  {
    path: '/contact',
    title: 'Contact GEMA',
    description:
      'Contact GEMA, the Government, Economics & Management Association at the University of Guelph, about events, involvement, or partnerships.',
  },
]

export const publicPagePaths = publicPageSeo.map((page) => page.path)

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: 'Page Not Found | GEMA',
  description:
    'This page could not be found on the GEMA website. Return to the homepage to keep exploring the association.',
  index: false,
}

export function getPageSeo(pathname: string): PageSeo {
  const exact = publicPageSeo.find((page) => page.path === pathname)
  return exact ?? notFoundSeo
}

export function stripTrailingSlash(value: string) {
  if (value === '/') {
    return value
  }

  return value.replace(/\/+$/, '')
}
