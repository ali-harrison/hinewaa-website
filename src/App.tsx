import { useEffect } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import About from './components/About'
import Hero from './components/Hero'
import Services from './components/Services'
import Approach from './components/Approach'
import Impact from './components/Impact'
import Collabs from './components/Collabs'
import Research from './components/Research'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

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
      <Approach />
      <Impact />
      <Collabs />
      <Research />
      <Contact />
    </div>
  )
}

export default App
