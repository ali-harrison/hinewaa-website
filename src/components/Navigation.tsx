import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logoImage from '../assets/images/Vector.png'
import { NAV_LINKS, SECTION_IDS, CTA_PRIMARY, COMPANY } from '../constants/site'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <button
              onClick={() => scrollToSection(SECTION_IDS.hero)}
              className="logo-button"
            >
              <img
                src={logoImage}
                alt={COMPANY.name}
                className="logo-image"
                width={1000}
                height={1000}
              />
            </button>
          </div>

          <ul className="nav-links">
            {NAV_LINKS
              .filter(link => link.id !== SECTION_IDS.hero && link.id !== SECTION_IDS.contact)
              .map(link => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)}>
                    <span className="nav-reo">{link.reo}</span><span className="nav-en"> | {link.english}</span>
                  </button>
                </li>
              ))
            }
            <li>
              <button
                onClick={() => scrollToSection(SECTION_IDS.contact)}
                className="nav-cta"
              >
                {CTA_PRIMARY.label}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation
