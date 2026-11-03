import aboutImage from '../assets/images/about-aimee.jpg'
import Words from './Words'
import { SECTION_IDS, FOUNDER } from '../constants/site'

function About() {
  return (
    <section className="about section" id={SECTION_IDS.about}>
      <div className="container">
        <span className="eyebrow about-label" data-reveal>Ko wai mātou? · Who we are</span>

        <p className="about-statement" data-read>
          <Words text="Hinewaa is a Māori-owned strategic advisory practice. We work where iwi, Crown, research and industry meet, bringing mātauraka Māori and evidence to the same table and turning complex problems into strategy people can act on." />
        </p>

        <div className="about-grid">
          <figure className="about-portrait" data-reveal>
            <div className="about-photo">
              <img
                src={aboutImage}
                alt={FOUNDER.name}
                loading="lazy"
                width={1434}
                height={770}
                data-parallax
              />
            </div>
            <figcaption>
              <span className="about-name">{FOUNDER.name}</span>
              <span className="eyebrow">{FOUNDER.role}</span>
            </figcaption>
          </figure>

          <div className="about-notes">
            <div className="about-note" data-reveal data-rule>
              <span className="eyebrow">Our reach</span>
              <p>
                We work at the interface of policy, science and community. Our work ranges from
                regional economic development to Antarctic governance.
              </p>
            </div>
            <div className="about-note" data-reveal data-rule>
              <span className="eyebrow">Our people</span>
              <p>
                Hinewaa is led by {FOUNDER.name}, working alongside trusted collaborators and whānau
                where specialist expertise is needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
