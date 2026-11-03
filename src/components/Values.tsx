import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Words from './Words'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Knowledge integrity',
    text: 'Grounded in whakapapa and informed by science. We honour mātauraka Māori and bring evidence and careful analysis to every problem.',
  },
  {
    title: 'Strategic rigour',
    text: 'Clear thinking, sound governance and meaningful measures, so strategy turns into decisions and action.',
  },
  {
    title: 'Intergenerational impact',
    text: 'Designed for those who come next. We focus on lasting outcomes for people, planet and prosperity.',
  },
]

// The three values climb left to right like a poutama, the stairway of
// growth and knowledge. On wide screens one kōkōwai line traces the stairs,
// drawing itself upwards as the section is scrolled through, and each value
// appears as the line reaches its step.
function Values() {
  const listRef = useRef<HTMLOListElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const list = listRef.current
    const svg = svgRef.current
    const path = pathRef.current
    if (!list || !svg || !path) return

    // Trace the stairs through the top edge of each step
    const trace = () => {
      const box = list.getBoundingClientRect()
      const steps = Array.from(list.querySelectorAll('.poutama-step'), (s) => s.getBoundingClientRect())
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
      path.setAttribute(
        'd',
        steps
          .map((s, i) => {
            const x0 = s.left - box.left
            const x1 = s.right - box.left
            const y = s.top - box.top + 1
            return i === 0 ? `M ${x0} ${y} H ${x1}` : `H ${x0} V ${y} H ${x1}`
          })
          .join(' '),
      )
    }
    trace()
    const resize = new ResizeObserver(trace)
    resize.observe(list)

    const stepContents = Array.from(list.querySelectorAll('.poutama-step'), (s) => s.children)
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px)', () => {
      const climb = gsap.timeline({
        scrollTrigger: { trigger: list, start: 'top 80%', end: 'bottom 65%', scrub: 0.8 },
      })
      climb.fromTo(path, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      stepContents.forEach((children, i) => {
        climb.from(children, { opacity: 0, y: 16, stagger: 0.04, duration: 0.2 }, 0.05 + i * 0.33)
      })
    })

    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 900px)', () => {
      list.querySelectorAll('.poutama-step').forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 88%', once: true },
        })
      })
    })

    return () => {
      resize.disconnect()
      mm.revert()
    }
  }, [])

  return (
    <section className="values section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow" data-reveal>Our values</span>
          <h2 className="section-title" data-words><Words text="Kā Mātāpono" /></h2>
        </div>

        <div className="poutama">
          <svg className="poutama-line" ref={svgRef} aria-hidden="true">
            <path ref={pathRef} pathLength={1000} />
          </svg>
          <ol className="poutama-steps" ref={listRef}>
            {values.map((value, i) => (
              <li key={value.title} className="poutama-step">
                <span className="eyebrow">0{i + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Values
