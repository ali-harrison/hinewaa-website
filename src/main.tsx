import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import { SHOW_WORK } from './constants/site'

import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/sections/hero.css'
import './styles/sections/about.css'
import './styles/sections/services.css'
import './styles/sections/values.css'
import './styles/sections/impact.css'
import './styles/sections/work.css'
import './styles/sections/collabs.css'
import './styles/sections/research.css'
import './styles/sections/contact.css'
import './styles/sections/footer.css'
import './styles/pages/project-detail.css'
import './styles/navigation.css'
import './styles/components/custom-cursor.css'
import './styles/components/bilingual.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {SHOW_WORK && <Route path="/projects/:slug" element={<ProjectDetail />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
