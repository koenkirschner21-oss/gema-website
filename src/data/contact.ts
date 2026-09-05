/**
 * Contact page content and form configuration.
 *
 * The Formspree endpoint is read from `VITE_FORMSPREE_ENDPOINT`.
 * Do not hardcode a form URL here. Formspree form IDs are public endpoints,
 * not secrets, but the value still belongs in environment config so GEMA
 * can point the form at another account later without a code rewrite.
 * Do not expose the Corporate Partnership Package as a public download.
 */

export const contactFieldIds = {
  name: 'contact-name',
  email: 'contact-email',
  reason: 'contact-subject',
  message: 'contact-message',
} as const

export type ContactFieldName = keyof typeof contactFieldIds

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(fields: {
  name: string
  email: string
  reason: string
  message: string
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Enter your name.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!fields.reason.trim()) {
    errors.reason = 'Select a reason for contact.'
  }

  if (!fields.message.trim()) {
    errors.message = 'Enter your message.'
  }

  return errors
}

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
  copy: 'Students, partners, alumni, faculty, and community members are welcome to get in touch. Use the options below to reach the right part of GEMA.',
}

export const contactFormCopy = {
  heading: 'Send Us a Message',
  copy: "Tell us what you're reaching out about and we'll make sure your message gets to the right place.",
  sending: 'Sending...',
  submit: 'Send Message',
  errorLead: 'Your message could not be sent. Please try again, or email GEMA at',
}

export const contactSuccess = {
  heading: 'Thanks for reaching out.',
  copy: 'Your message has been sent to GEMA. A member of our team will follow up where appropriate.',
}

export const contactRoutes = [
  {
    title: 'Partnerships',
    copy: 'Interested in sponsorship or collaboration?',
    to: '/partners',
    accent: 'red' as const,
  },
  {
    title: 'Events',
    copy: 'Looking for upcoming GEMA programming?',
    to: '/events',
    accent: 'gold' as const,
  },
  {
    title: 'Join GEMA',
    copy: 'Interested in opportunities or getting involved?',
    to: '/get-involved',
    accent: 'blue' as const,
  },
  {
    title: 'GEM Major',
    copy: 'Looking for information about the academic program?',
    to: '/gem-major',
    accent: 'dark' as const,
  },
]

export const contactDirect = {
  heading: 'Prefer to connect directly?',
  copy: 'Reach GEMA by email or follow along for events, opportunities and community updates.',
}
