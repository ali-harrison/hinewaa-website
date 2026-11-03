import antarctica from '../assets/images/hero-antarctic.webp'
import TukutukuImage from './TukutukuImage'
import Bilingual from './Bilingual'
import Words from './Words'
import { SECTION_IDS, CTA_PRIMARY } from '../constants/site'

function Hero() {
  return (
    <section className="hero" id={SECTION_IDS.hero}>
      <div className="container">
        <div className="hero-top">
          <div className="hero-heading">
            <span className="eyebrow" data-reveal>Māori-owned strategic advisory · Aotearoa</span>
            <h1 className="hero-title" data-words>
              <Words text="Indigenous strategy for" />{' '}
              <span className="word">
                <span className="word-inner"><span className="hero-underline">complex systems</span>.</span>
              </span>
            </h1>
          </div>

          <div className="hero-aside" data-reveal>
            <p className="hero-subtitle">
              Strategy and governance advice across climate, taiao and Indigenous economies. We help
              organisations bring mātauraka Māori, science and commercial realities together to make
              decisions that last.
            </p>
            <a href={CTA_PRIMARY.href} className="btn">
              <Bilingual reo={CTA_PRIMARY.reo} english={CTA_PRIMARY.english} />
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero-panel" data-reveal>
          <TukutukuImage
            src={antarctica}
            cell={11}
            water={{ from: 0.51, to: 1 }}
            alt="Antarctic mountains reflected in still water at sunset, drawn as tukutuku stitches"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
