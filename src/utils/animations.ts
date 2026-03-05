import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Standard motion config */
export const MOTION = {
  duration: { fast: 0.6, normal: 1.0, slow: 1.5 },
  ease: 'power2.out',
  easeSmooth: 'power3.out',
  easeSnap: 'back.out(1.5)',
  stagger: 0.025,
  scrollStart: 'top 80%',
} as const

/** Fade in + translate up on scroll */
export function fadeInOnScroll(
  element: gsap.TweenTarget,
  options?: {
    y?: number
    duration?: number
    delay?: number
    start?: string
  }
) {
  const { y = 40, duration = MOTION.duration.normal, delay = 0, start = MOTION.scrollStart } = options ?? {}

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: MOTION.ease,
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/** Staggered fade in for arrays of elements */
export function staggerFadeIn(
  elements: gsap.TweenTarget,
  options?: {
    y?: number
    duration?: number
    stagger?: number
    start?: string
    trigger?: gsap.DOMTarget
  }
) {
  const {
    y = 30,
    duration = MOTION.duration.fast,
    stagger = 0.1,
    start = MOTION.scrollStart,
    trigger,
  } = options ?? {}

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: MOTION.ease,
      scrollTrigger: {
        trigger: trigger ?? (elements as gsap.DOMTarget),
        start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/** Staggered fade in with rotation for organic card reveals */
export function staggerFadeInWithRotation(
  elements: gsap.TweenTarget,
  options?: {
    y?: number
    rotation?: number
    duration?: number
    stagger?: number
    start?: string
    trigger?: gsap.DOMTarget
  }
) {
  const {
    y = 40,
    rotation = 2,
    duration = MOTION.duration.fast,
    stagger = 0.12,
    start = MOTION.scrollStart,
    trigger,
  } = options ?? {}

  return gsap.fromTo(
    elements,
    { opacity: 0, y, rotation },
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration,
      stagger,
      ease: MOTION.easeSmooth,
      scrollTrigger: {
        trigger: trigger ?? (elements as gsap.DOMTarget),
        start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/** ScrollTrigger-based parallax */
export function createParallax(
  element: gsap.DOMTarget,
  options?: {
    speed?: number
    direction?: 'up' | 'down'
  }
) {
  const { speed = 0.3, direction = 'up' } = options ?? {}
  const yPercent = direction === 'up' ? -speed * 100 : speed * 100

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/** Pin a section and scroll its inner track horizontally */
export function createHorizontalScroll(
  section: gsap.DOMTarget,
  track: gsap.DOMTarget,
  options?: {
    ease?: string
    endPadding?: number
  }
) {
  const { ease = 'none', endPadding = 0 } = options ?? {}
  const trackEl = track as HTMLElement

  const getScrollAmount = () => {
    return -(trackEl.scrollWidth - window.innerWidth + endPadding)
  }

  return gsap.to(track, {
    x: getScrollAmount,
    ease,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${trackEl.scrollWidth - window.innerWidth + endPadding}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  })
}

/** Cleanup all ScrollTrigger instances */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}