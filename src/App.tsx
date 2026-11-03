import { useEffect } from 'react'
import { SITE_META, SHOW_WORK } from './constants/site'
import Navigation from './components/Navigation'
import About from './components/About'
import Hero from './components/Hero'
import Services from './components/Services'
import Values from './components/Values'
import Impact from './components/Impact'
import Work from './components/Work'
import Collabs from './components/Collabs'
import Research from './components/Research'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initScrollMotion } from './utils/scrollMotion'

function App() {
  useEffect(() => {
    document.title = SITE_META.title

    // Arriving from a project page via /#section — scroll once the sections exist
    const hash = window.location.hash.slice(1)
    if (hash) document.getElementById(hash)?.scrollIntoView()

    return initScrollMotion()
  }, [])

  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Values />
        <Impact />
        {SHOW_WORK && <Work />}
        <Collabs />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
