import { useState, useEffect } from 'react'
import logoImage from '../assets/images/Vector.png'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <button
              onClick={() => scrollToSection('hero')}
              className="logo-button"
            >
              <img
                src={logoImage}
                alt="Hinewaa Ltd"
                className="logo-image"
              />
            </button>
          </div>

          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection('about')}>
                <span className="nav-reo">Ko wai mātou?</span><span className="nav-en"> | Who are we?</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')}>
                <span className="nav-reo">Kā mahi</span><span className="nav-en"> | Our services</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('impact')}>
                <span className="nav-reo">Kā pūtaka</span><span className="nav-en"> | Our impact</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('research')}>
                <span className="nav-reo">Rangahau</span><span className="nav-en"> | Research</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-cta"
              >
                Whakapā mai | Contact us
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation
