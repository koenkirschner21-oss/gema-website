# GEMA Website

The public website for the Government, Economics & Management Association at the University of Guelph's Gordon S. Lang School of Business and Economics. It helps students find events, explore the GEM major, and get involved; it gives the association a place to publish team, partner, and event information.

**Live:** [gemassociation.ca](https://gemassociation.ca/) · [Events](https://gemassociation.ca/events) · [Get involved](https://gemassociation.ca/get-involved)

## How it works

- **React, TypeScript, and Vite:** A single-page application with React Router. Shared layout and components keep the navigation, event cards, dialogs, and team cards consistent across pages.
- **Content in typed modules:** Event listings, recaps, people, and partner information live in [`src/data/`](src/data/) rather than being scattered through page components. Content edits go through the repo and a redeploy; there is no CMS.
- **Routing and search metadata:** [`vercel.json`](vercel.json) routes deep links to the app. The [SEO component](src/components/Seo.tsx) updates titles, descriptions, social metadata, and canonical URLs on route changes; the app is not server-rendered.
- **Analytics and contact:** Optional GA4 handles client-side navigations without counting the initial load twice. The contact form uses an optional Formspree endpoint, and its success and error states can be exercised locally without submitting a real message.

## Run locally

Use Node.js 22.13+ or 24 LTS and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

The site runs without external services for browsing. If you're testing the contact form, create a local env file using [`.env.example`](.env.example) as a reference and set only `VITE_FORMSPREE_MOCK=success` (or `error`) to avoid submitting to the live form. Leave analytics unset for local work.

Vite exposes `VITE_*` variables to the browser, so keep secrets out of them. In production, set the canonical origin, contact endpoint, and analytics ID through the deployment environment as needed.
