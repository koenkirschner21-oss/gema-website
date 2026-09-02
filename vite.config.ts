import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { publicPagePaths } from './src/data/seo.ts'
import { normalizeSiteUrl } from './src/lib/normalizeSiteUrl.ts'

function configuredSiteUrl() {
  return normalizeSiteUrl(process.env.VITE_SITE_URL)
}

function robotsTxt(siteUrl: string) {
  const lines = ['User-agent: *', 'Allow: /']

  if (siteUrl) {
    lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  }

  return `${lines.join('\n')}\n`
}

function sitemapXml(siteUrl: string) {
  const urls = publicPagePaths
    .map((path) => {
      const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function gemaSeoFilesPlugin(): Plugin {
  return {
    name: 'gema-seo-files',
    transformIndexHtml(html) {
      const siteUrl = configuredSiteUrl()
      if (!siteUrl) {
        return html
      }

      const homeUrl = `${siteUrl}/`
      const imageUrl = `${siteUrl}/og-image.png`
      let next = html.replaceAll('content="/og-image.png"', `content="${imageUrl}"`)

      if (!next.includes('rel="canonical"')) {
        next = next.replace(
          '</title>',
          `</title>\n    <link rel="canonical" href="${homeUrl}" />\n    <meta property="og:url" content="${homeUrl}" />`,
        )
      }

      return next
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const siteUrl = configuredSiteUrl()
        const url = request.url?.split('?')[0]

        if (url === '/robots.txt') {
          response.setHeader('Content-Type', 'text/plain; charset=utf-8')
          response.end(robotsTxt(siteUrl))
          return
        }

        if (url === '/sitemap.xml') {
          if (!siteUrl) {
            response.statusCode = 404
            response.end('Sitemap is generated when VITE_SITE_URL is set.\n')
            return
          }

          response.setHeader('Content-Type', 'application/xml; charset=utf-8')
          response.end(sitemapXml(siteUrl))
          return
        }

        next()
      })
    },
    generateBundle() {
      const siteUrl = configuredSiteUrl()
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt(siteUrl),
      })

      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemapXml(siteUrl),
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), gemaSeoFilesPlugin()],
})
