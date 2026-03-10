import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_META } from './constants/site'
import Navigation from './components/Navigation'
import About from './components/About'
import Hero from './components/Hero'
import Services from './components/Services'
import Impact from './components/Impact'
import Collabs from './components/Collabs'
import Research from './components/Research'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

function App() {
  useEffect(() => {
    document.title = SITE_META.title
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP's ticker for ScrollTrigger compatibility
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app">
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Impact />
      <Collabs />
      <Research />
      <Contact />
    </div>
  )
}

export default App
