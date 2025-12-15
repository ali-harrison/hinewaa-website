import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/sections/hero.css'
import './styles/sections/about.css'
import './styles/sections/services.css'
import './styles/sections/approach.css'
import './styles/sections/impact.css'
import './styles/sections/collabs.css'
import './styles/sections/research.css'
import './styles/sections/contact.css'
import './styles/navigation.css'
import './styles/components/page-transition.css'
import './styles/components/custom-cursor.css'
import './styles/components/loading-screen.css'
import 'lenis/dist/lenis.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
