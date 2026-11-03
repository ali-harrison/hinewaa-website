import Words from './Words'
import { SECTION_IDS } from '../constants/site'

const impacts = [
  {
    metric: '20+ years',
    label: 'Senior leadership',
    description: 'Shaping strategy, investment and governance across iwi, Crown and regional organisations.',
  },
  {
    metric: 'Multi-sector',
    label: 'Depth of practice',
    description: 'Working across commercial, taiao and regulatory settings: climate, Indigenous economies, public policy and environmental governance.',
  },
  {
    metric: 'Aotearoa & global',
    label: 'Reach',
    description: 'Bringing an Indigenous voice to regional and international forums, from Te Waipounamu to Antarctic governance.',
  },
]

function Impact() {
  return (
    <section className="impact section section-dark" id={SECTION_IDS.impact}>
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow" data-reveal>Our impact</span>
          <h2 className="section-title" data-words><Words text="Kā pūtaka" /></h2>
        </div>

        <div className="impact-stats" data-rule>
          {impacts.map((impact) => (
            <div key={impact.label} className="impact-stat" data-reveal>
              <span className="eyebrow">{impact.label}</span>
              <p className="impact-metric">{impact.metric}</p>
              <p className="impact-description">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact
