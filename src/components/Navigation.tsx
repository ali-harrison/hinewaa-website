import { useState, useEffect } from 'react'

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
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <button
              onClick={() => scrollToSection('hero')}
              className="logo-button"
            >
              <img
                src="/src/assets/images/Vector.png"
                alt="Hinewaa Ltd"
                className="logo-image"
              />
            </button>
          </div>

          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')}>
                Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('impact')}>Impact</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('research')}>
                Research
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-cta"
              >
                Share Your Kaupapa
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation
