import { useLocation } from 'react-router-dom'
import logoImage from '../assets/images/logo.png'
import Bilingual from './Bilingual'
import { NAV_LINKS, SECTION_IDS, CTA_PRIMARY, COMPANY } from '../constants/site'

function Navigation() {
  const { pathname } = useLocation()

  // In-page anchors on the home page; elsewhere, link back to the home page section
  const toSection = (hash: string) => (pathname === '/' ? hash : `/${hash}`)

  return (
    <nav className="navigation" aria-label="Main navigation">
      <div className="container nav-container">
        <a href={toSection(`#${SECTION_IDS.hero}`)} className="nav-logo">
          <img
            src={logoImage}
            alt={COMPANY.name}
            className="logo-image"
            width={574}
            height={410}
          />
        </a>

        <ul className="nav-links">
          {NAV_LINKS
            .filter(link => link.id !== SECTION_IDS.hero && link.id !== SECTION_IDS.contact)
            .map(link => (
              <li key={link.id}>
                <a href={toSection(link.href)}>
                  <Bilingual reo={link.reo} english={link.english} />
                </a>
              </li>
            ))}
        </ul>

        <a href={toSection(CTA_PRIMARY.href)} className="btn nav-cta">
          <Bilingual reo={CTA_PRIMARY.reo} english={CTA_PRIMARY.english} />
          <span className="btn-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  )
}

export default Navigation
