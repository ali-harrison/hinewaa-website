import seabird from '../assets/images/tukutuku/seabird.webp'
import TukutukuImage from './TukutukuImage'
import Words from './Words'
import { SECTION_IDS } from '../constants/site'

const focusAreas = [
  { title: 'Antarctic Treaty System and Indigenous participation', tag: 'Antarctica' },
  { title: 'Southern Ocean environmental governance', tag: 'Ocean' },
  { title: 'Climate adaptation and food–ocean systems', tag: 'Climate' },
  { title: 'Regional economic transformation', tag: 'Economy' },
  { title: 'Indigenous-led innovation and governance frameworks', tag: 'Governance' },
]

function Research() {
  return (
    <section className="research section" id={SECTION_IDS.research}>
      <div className="container">
        <div className="research-top">
          <div className="section-heading">
            <span className="eyebrow" data-reveal>Research</span>
            <h2 className="section-title" data-words><Words text="Rakahau" /></h2>
          </div>

          <div className="research-intro" data-reveal>
            <p>
              Our research looks at how Indigenous peoples can take a stronger part in international
              governance, including the Antarctic Treaty System. It connects mātauraka Māori with
              environmental law, climate policy and global decision-making.
            </p>
          </div>
        </div>

        <div className="research-body">
          <div className="research-image" data-reveal>
            <TukutukuImage
              src={seabird}
              alt="A seabird gliding low over the ocean, drawn as tukutuku stitches"
              cell={9}
              water={{ from: 0.06, to: 1, blueOnly: true }}
            />
          </div>

          <div className="research-list">
            <span className="eyebrow" data-reveal>Focus areas</span>
            <ul data-rule>
              {focusAreas.map((area) => (
                <li key={area.title} data-rule="bottom" data-reveal>
                  <span className="research-area">{area.title}</span>
                  <span className="eyebrow">{area.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Research
