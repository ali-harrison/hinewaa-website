# Hinewaa

Website for Hinewaa Ltd, a Māori-owned strategy and governance practice in Aotearoa. Designed and built by me, Ali Werahiko Te Wairama Harrison (Te Wairama Digital).

Live at https://hinewaa.com

Built with React 19, TypeScript and Vite, with GSAP for scroll motion and a Vercel function that sends the contact form through Resend.

## Design notes

The palette comes from kōwhaiwhai: muka (flax cream), pango (black) and kōkōwai (red ochre). Headings lead with te reo Māori in Kāi Tahu dialect, with the English as a small label.

Photos are drawn as tukutuku panels in `src/components/TukutukuImage.tsx`. The stitches follow the brightness of the photo, water areas ripple, and hovering lifts the stitches to show the photo underneath.

The values climb as a poutama that draws itself as you scroll. The same pattern runs along the top of the footer, and the cursor is a poutama triangle.

Scroll animations are switched on with data attributes (`data-reveal`, `data-words`, `data-read`, `data-rule`, `data-parallax`) and handled in `src/utils/scrollMotion.ts`. They're off for anyone who prefers reduced motion.

## Running it

```bash
npm install
npm run dev
```

The contact form needs `RESEND_API_KEY` set in the Vercel project's environment variables.

## Updating content

- Contact details, nav labels and founder info: `src/constants/site.ts`
- Case studies: `src/data/projects.ts`. They stay hidden until `SHOW_WORK` is set to `true` in `src/constants/site.ts`.
- Partner logos: `public/logos/`, listed in `src/components/Collabs.tsx`
- Section copy: the matching component in `src/components/`

Deploys to Vercel from `main`.
