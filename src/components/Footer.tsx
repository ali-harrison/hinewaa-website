import logoImage from '../assets/images/logo.png'
import Bilingual from './Bilingual'
import Words from './Words'
import { SECTION_IDS, NAV_LINKS, COMPANY, CONTACT_INFO } from '../constants/site'

function Footer() {
  return (
    <footer className="footer section-dark">
      <div className="footer-band" aria-hidden="true" />

      <div className="container">
        <blockquote className="footer-whakatauki">
          <p lang="mi" data-words><Words text="Mō tātou, ā, mō kā uri ā muri ake nei." /></p>
          <span className="eyebrow" data-reveal>For us and our children after us</span>
        </blockquote>

        <div className="footer-grid" data-rule>
          <div className="footer-col">
            <span className="eyebrow">Whakapā mai</span>
            <ul>
              <li><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></li>
              <li><a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a></li>
              <li>{CONTACT_INFO.location}</li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <span className="eyebrow">Navigate</span>
            <ul>
              {NAV_LINKS
                .filter(link => link.id !== SECTION_IDS.hero)
                .map(link => (
                  <li key={link.id}>
                    <a href={link.href}>
                      <Bilingual reo={link.reo} english={link.english} align="start" />
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="footer-col">
            <span className="eyebrow">Connect</span>
            <ul>
              <li>
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" data-rule>
          <img
            src={logoImage}
            alt={COMPANY.name}
            className="footer-logo"
            width={574}
            height={410}
          />
          <span className="eyebrow">&copy; {new Date().getFullYear()} {COMPANY.name}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
