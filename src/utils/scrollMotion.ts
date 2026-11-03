import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Elements that enter together are staggered, but a fast scroll or jump can enter
// dozens at once. Anything already scrolled past is shown instantly, and the
// stagger for what's on screen is capped so nothing waits long.
function enterTogether(batch: Element[], to: gsap.TweenVars) {
  const passed = batch.filter((el) => el.getBoundingClientRect().bottom <= 0)
  const showing = batch.filter((el) => el.getBoundingClientRect().bottom > 0)
  gsap.set(passed, { ...to, duration: 0, ease: 'none' })
  gsap.to(showing, { ...to, stagger: Math.min(0.08, 0.4 / Math.max(1, showing.length)) })
}

// Scroll animations, switched on by data attributes so components stay declarative:
//   data-reveal    fades and rises into place; neighbours entering together are staggered
//   data-words     words slide up from behind a mask (wrap the text in <Words>)
//   data-read      words darken from faint to full as the paragraph is scrolled through
//   data-rule      a hairline draws in from the left ("bottom" puts it under the element)
//   data-parallax  an image drifts slightly within its frame
// Nothing animates for visitors who prefer reduced motion; everything is simply shown.
export function initScrollMotion() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.set('[data-reveal]', { opacity: 0, y: 24 })
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => enterTogether(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
    })

    gsap.utils.toArray<HTMLElement>('[data-words]').forEach((el) => {
      gsap.from(el.querySelectorAll('.word-inner'), {
        yPercent: 140,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-read]').forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll('.word-inner'),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
        },
      )
    })

    gsap.set('[data-rule]', { '--draw': 0 })
    ScrollTrigger.batch('[data-rule]', {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => enterTogether(batch, { '--draw': 1, duration: 1.2, ease: 'expo.inOut' }),
    })

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  })

  // Text reflows when the web fonts arrive, which moves every trigger point
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => mm.revert()
}
