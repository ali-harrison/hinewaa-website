# Hinewaa Website

Website for Hinewaa Ltd, an Indigenous-led strategy and governance practice based in Aotearoa New Zealand.

**Live site:** https://hinewaa.com

## Tech Stack

- React 19 + TypeScript, built with Vite
- React Router for the project pages (`/projects/:slug`)
- GSAP for light scroll fade-ins (disabled when the visitor prefers reduced motion)
- Satoshi (headings and body) and IBM Plex Mono (small labels)
- Contact form sends email through a Vercel serverless function (`api/send-email.ts`) using Resend

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

The contact form needs `RESEND_API_KEY` set in the Vercel project's environment variables.

## Design

- **Palette:** the kōwhaiwhai colours — muka (flax-fibre cream), pango (black) and kōkōwai (red ochre). Defined in `src/styles/variables.css`.
- **Headings:** te reo Māori is the headline, with the English as a small label above. All te reo uses Kāi Tahu dialect.
- **Tukutuku images:** `src/components/TukutukuImage.tsx` draws photos as a tukutuku panel — reeds, laths and cross-stitches whose weight follows the photo's brightness. Water areas ripple, and hovering lifts the stitches to show the photo underneath. Source photos live in `src/assets/images/tukutuku/` as WebP, about 960px wide (sharp enough for the hover reveal).
- **Poutama:** the three values climb as a poutama staircase (the line draws itself as you scroll); a poutama band runs along the top of the footer; the cursor is a poutama triangle.
- **Scroll motion:** add `data-reveal`, `data-words`, `data-read`, `data-rule` or `data-parallax` to an element and `src/utils/scrollMotion.ts` animates it. All of it is switched off for visitors who prefer reduced motion.

## Editing Content

- **Contact details, nav labels, founder info:** `src/constants/site.ts`
- **Case studies (Selected Work):** `src/data/projects.ts`
- **Partner logos:** `public/logos/`, listed in `src/components/Collabs.tsx`
- **Section copy:** the matching component in `src/components/`

## Project Structure

```
api/              # Vercel serverless functions
public/           # Static files (favicon, cursor, logos, social share image)
src/
├── components/   # Page sections
├── constants/    # Site-wide content and settings
├── data/         # Case study content
├── pages/        # Project detail page
└── styles/       # CSS: variables, global, layout, per-section
```

## Deployment

Deployed on Vercel with automatic deployments from the `main` branch.
