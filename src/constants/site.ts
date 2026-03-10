// ── Section IDs ──────────────────────────────────────────────────────────────
// Single source of truth for all section href targets and id attributes.

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  services: 'services',
  impact: 'impact',
  research: 'research',
  contact: 'contact',
} as const

// ── Navigation Links ──────────────────────────────────────────────────────────
// Used by Navigation.tsx (top nav) and Contact.tsx (footer nav).
// reo   = te reo Māori label (used in footer, and as accent in section headings)
// english = English label (used in nav subtitle spans and footer Home link)

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
    english: 'Who are we?',
    href: `#${SECTION_IDS.about}`,
  },
  {
    id: SECTION_IDS.services,
    reo: 'Kā Mahi',
    english: 'Our services',
    href: `#${SECTION_IDS.services}`,
  },
  {
    id: SECTION_IDS.impact,
    reo: 'Kā pūtaka',
    english: 'Our impact',
    href: `#${SECTION_IDS.impact}`,
  },
  {
    id: SECTION_IDS.research,
    reo: 'Rangahau',
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

// ── Primary CTA ───────────────────────────────────────────────────────────────
// The main call-to-action button used in Navigation and Hero.

export const CTA_PRIMARY = {
  label: 'Whakapā mai | Contact us',
  href: `#${SECTION_IDS.contact}`,
} as const

// ── Site Metadata ─────────────────────────────────────────────────────────────
// NOTE: The page <title> and the hero h1 have drifted (audit issue #1).
// title matches the current index.html value. tagline matches the current Hero h1.
// Resolve with the client before aligning these.

export const SITE_META = {
  title: 'Hinewaa | Indigenous Strategies Shaping Global Futures',
  tagline: 'Indigenous Strategy for Complex Systems',
  description:
    'Advisory and governance expertise across climate, taiao and intergenerational development.',
} as const

// ── Company ───────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Hinewaa Ltd',
  founded: 2025,
} as const

// ── Founder ───────────────────────────────────────────────────────────────────

export const FOUNDER = {
  name: 'Aimee Kaio',
  role: 'Founder & Lead Strategist',
  shortBio:
    'Hinewaa is led by Aimee Kaio and works alongside trusted collaborators and whānau where specialist expertise is required.',
} as const

// ── Contact Information ───────────────────────────────────────────────────────

export const CONTACT_INFO = {
  email: 'aimee@hinewaa.com',
  phone: '021 408 174',
  phoneHref: '021408174',
  location: 'Aotearoa New Zealand',
  linkedin: 'https://linkedin.com/company/hinewaa',
} as const
