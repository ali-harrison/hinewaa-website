// ── Section IDs ──────────────────────────────────────────────────────────────

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  services: 'services',
  impact: 'impact',
  work: 'work',
  research: 'research',
  contact: 'contact',
} as const

// ── Navigation Links ──────────────────────────────────────────────────────────
// Used by Navigation.tsx (top nav) and Contact.tsx (footer nav).

export const NAV_LINKS = [
  {
    id: SECTION_IDS.hero,
    reo: '',
    english: 'Home',
    href: `#${SECTION_IDS.hero}`,
  },
  {
    id: SECTION_IDS.about,
    reo: 'Ko wai mātou?',
    english: 'Who we are',
    href: `#${SECTION_IDS.about}`,
  },
  {
    id: SECTION_IDS.services,
    reo: 'Kā Mahi',
    english: 'Services',
    href: `#${SECTION_IDS.services}`,
  },
  {
    id: SECTION_IDS.impact,
    reo: 'Kā pūtaka',
    english: 'Impact',
    href: `#${SECTION_IDS.impact}`,
  },
  {
    id: SECTION_IDS.research,
    reo: 'Rakahau',
    english: 'Research',
    href: `#${SECTION_IDS.research}`,
  },
  {
    id: SECTION_IDS.contact,
    reo: 'Kōrero',
    english: 'Contact',
    href: `#${SECTION_IDS.contact}`,
  },
]

export const CTA_PRIMARY = {
  reo: 'Whakapā mai',
  english: 'Contact us',
  href: `#${SECTION_IDS.contact}`,
} as const

// ── Site Metadata ─────────────────────────────────────────────────────────────
// Keep title in sync with <title> in index.html.

export const SITE_META = {
  title: 'Hinewaa | Indigenous Strategies Shaping Global Futures',
} as const

// Selected Work section and /projects pages. Hidden until the case studies
// in src/data/projects.ts are written — set to true to show them.
export const SHOW_WORK = false

export const COMPANY = {
  name: 'Hinewaa Ltd',
} as const

export const FOUNDER = {
  name: 'Aimee Kaio',
  role: 'Founder & Lead Strategist',
} as const

export const CONTACT_INFO = {
  email: 'aimee@hinewaa.com',
  phone: '021 408 174',
  phoneHref: '+6421408174',
  location: 'Aotearoa New Zealand',
  linkedin: 'https://linkedin.com/company/hinewaa',
} as const
