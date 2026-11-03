import { useState } from 'react'
import lighthouse from '../assets/images/tukutuku/lighthouse.webp'
import piopiotahi from '../assets/images/tukutuku/piopiotahi.webp'
import oysters from '../assets/images/tukutuku/oysters.webp'
import TukutukuImage from './TukutukuImage'
import Words from './Words'
import { SECTION_IDS } from '../constants/site'

const services = [
  {
    title: 'Strategic Design & Governance',
    description:
      'Strategies and governance frameworks that align iwi, Crown and regional systems, and turn into clear decisions and accountability.',
    includes: [
      'Strategy development and transformation roadmaps',
      'Governance design and advisory',
      'Aligning policy, delivery and investment',
      'Impact frameworks and performance measures',
    ],
    image: lighthouse,
    imageAlt: 'Lighthouse on a rocky coastline, drawn as tukutuku stitches',
    water: { from: 0.5, to: 0.62, blueOnly: true },
  },
  {
    title: 'Climate & Taiao Systems',
    description:
      'Bringing mātauraka Māori into climate adaptation, environmental governance and natural resource management.',
    includes: [
      'Climate strategy and adaptation planning',
      'Taiao governance frameworks',
      'Integrating Indigenous knowledge into policy and science',
      'Working across commercial and environmental interests',
    ],
    image: piopiotahi,
    imageAlt: 'Piopiotahi mountains reflected in the fiord, drawn as tukutuku stitches',
    water: { from: 0.51, to: 1 },
  },
  {
    title: 'Indigenous Economies & Global Governance',
    description:
      'Strengthening Indigenous participation in regional, national and international systems.',
    includes: [
      'Indigenous bioeconomy and food–ocean transition strategy',
      'Regional economic development advice',
      'Commercial partnership design',
      'Antarctic and Southern Ocean governance research',
    ],
    image: oysters,
    imageAlt: 'A basket of fresh oysters, drawn as tukutuku stitches',
  },
]

function Services() {
  const [open, setOpen] = useState(0)
  const active = services[open]

  return (
    <section className="services section" id={SECTION_IDS.services}>
      <div className="container services-layout">
        <div className="services-side">
          <div className="section-heading">
            <span className="eyebrow" data-reveal>Our services</span>
            <h2 className="section-title" data-words><Words text="Kā Mahi" /></h2>
          </div>

          <div className="services-image" data-reveal>
            <TukutukuImage
              key={active.title}
              src={active.image}
              alt={active.imageAlt}
              cell={9}
              water={active.water}
            />
          </div>
        </div>

        <ul className="services-list" data-rule>
          {services.map((service, i) => {
            const isOpen = open === i
            return (
              <li
                key={service.title}
                className={`service-item${isOpen ? ' is-open' : ''}`}
                data-rule="bottom"
                data-reveal
              >
                <h3>
                  <button
                    type="button"
                    className="service-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${i}`}
                    onClick={() => setOpen(i)}
                  >
                    <span className="eyebrow">0{i + 1}</span>
                    <span className="service-title">{service.title}</span>
                    <span className="service-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="service-panel" id={`service-panel-${i}`} hidden={!isOpen}>
                  <p>{service.description}</p>
                  <ul className="service-includes">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Services
