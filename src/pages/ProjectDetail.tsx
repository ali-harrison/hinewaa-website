import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { getProjectBySlug } from '../data/projects'
import { SECTION_IDS, CONTACT_INFO } from '../constants/site'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) {
      document.title = `${project.title} — Hinewaa`
    }
    return () => {
      document.title = 'Hinewaa | Indigenous Strategies Shaping Global Futures'
    }
  }, [slug, project])

  if (!project) {
    return (
      <div className="project-page">
        <Navigation />
        <div className="project-not-found">
          <p>Project not found.</p>
          <Link to={`/#${SECTION_IDS.work}`} className="project-back-link">
            ← All work
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="project-page">
      <Navigation />

      {/* ── Hero ── */}
      <div className="project-hero">
        <div className="project-hero-overlay" />
        <div className="project-hero-content">
          <span className="project-hero-category">{project.category}</span>
          <h1 className="project-hero-title">{project.title}</h1>
        </div>
      </div>

      {/* ── Back link ── */}
      <div className="project-back-wrap">
        <Link to={`/#${SECTION_IDS.work}`} className="project-back-link">
          ← All work
        </Link>
      </div>

      {/* ── Two-column body ── */}
      <div className="project-body">
        <main className="project-main">
          <div className="project-section">
            <p className="project-section-label">Challenge</p>
            <p className="project-section-text">{project.challenge}</p>
          </div>

          <div className="project-section">
            <p className="project-section-label">Approach</p>
            <p className="project-section-text">{project.approach}</p>
          </div>

          <div className="project-section">
            <p className="project-section-label">Outcome</p>
            <p className="project-section-text">{project.outcome}</p>
          </div>

          {/* ── Pull quote ── */}
          <blockquote className="project-pull-quote">
            <p>"{project.pullQuote}"</p>
          </blockquote>
        </main>

        {/* ── Sticky sidebar ── */}
        <aside className="project-sidebar">
          <div className="project-details-card">
            <div className="project-detail-item">
              <span className="project-detail-label">Client</span>
              <span className="project-detail-value">{project.client}</span>
            </div>
            <div className="project-detail-item">
              <span className="project-detail-label">Sector</span>
              <span className="project-detail-value">{project.sector}</span>
            </div>
            <div className="project-detail-item">
              <span className="project-detail-label">Year</span>
              <span className="project-detail-value">{project.year}</span>
            </div>
            <div className="project-detail-item">
              <span className="project-detail-label">Services</span>
              <ul className="project-detail-services">
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="project-cta-section">
        <h2 className="project-cta-heading">Interested in working with us?</h2>
        <p className="project-cta-sub">We'd love to hear about your kaupapa.</p>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="project-cta-btn"
        >
          Get in touch →
        </a>
      </div>
    </div>
  )
}

export default ProjectDetail
