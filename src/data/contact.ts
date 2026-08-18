/**
 * Contact page content and form configuration.
 *
 * Set `contactFormEndpoint` to a Formspree URL when available,
 * for example: 'https://formspree.io/f/xxxxxxxx'
 * Do not commit secrets. Formspree form IDs are public endpoints.
 * Do not expose the Corporate Partnership Package as a public download.
 */
export const contactFormEndpoint: string | null = null

export const contactReasons = [
  'General Inquiry',
  'Events',
  'Get Involved',
  'Partnerships & Sponsorships',
  'Request Corporate Partnership Package',
  'GEM Major Question',
  'Other',
] as const

export type ContactReason = (typeof contactReasons)[number]

/**
 * Maps public /contact?reason= values to form subjects.
 * Partnership package requests stay gated through this form.
 */
export const contactReasonFromQuery: Record<string, ContactReason> = {
  partnership: 'Partnerships & Sponsorships',
  'corporate-package': 'Request Corporate Partnership Package',
}

export function getContactReasonFromQuery(reason: string | null): ContactReason | '' {
  if (!reason) {
    return ''
  }

  return contactReasonFromQuery[reason] ?? ''
}

export const contactHero = {
  eyebrow: 'CONTACT',
  headline: 'Contact GEMA',
  copy: "Have a question, partnership idea or want to learn more about GEMA? Reach out and we'll help connect you with the right person.",
}

export const contactChannels = {
  general: {
    title: 'General Inquiries',
    copy: 'For general questions about GEMA, our events, involvement or the GEM community.',
    emailPlaceholder: 'General GEMA email to be added',
  },
  partnerships: {
    title: 'Partnerships & Sponsorships',
    copy: 'Interested in partnering with GEMA, supporting an event or exploring sponsorship opportunities? Send us an inquiry and our team can follow up with more information.',
    cta: 'Partnership Inquiry',
    to: '/contact?reason=partnership#send-message',
  },
  social: {
    title: 'Social Media',
    copy: 'For current announcements, events and updates, connect with GEMA through our social channels.',
  },
}

export const contactFormCopy = {
  heading: 'Send Us a Message',
  copy: "Tell us what you're reaching out about and we'll make sure your message gets to the right place.",
  disconnected:
    'Form submissions are not connected yet. This will be enabled before launch.',
  blockedSubmit:
    'This form is not connected yet. It will be enabled before launch, and your message was not sent.',
  error:
    'Your message could not be sent. Please try again or use another contact option on this page.',
}

export const contactSuccess = {
  heading: 'Thanks for reaching out.',
  copy: 'Your message has been sent to GEMA. A member of our team will follow up where appropriate.',
}

export const contactRoutes = [
  {
    title: 'Events',
    cta: 'Explore Events',
    to: '/events',
  },
  {
    title: 'Get Involved',
    cta: 'Get Involved',
    to: '/get-involved',
  },
  {
    title: 'Partnerships',
    cta: 'Explore Partnerships',
    to: '/partners',
  },
  {
    title: 'GEM Major',
    cta: 'Explore the GEM Major',
    to: '/gem-major',
  },
]
