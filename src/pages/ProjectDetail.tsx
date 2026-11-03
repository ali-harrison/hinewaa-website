import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { getProjectBySlug } from '../data/projects'
import { SECTION_IDS, SITE_META } from '../constants/site'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = project ? `${project.title} | Hinewaa` : SITE_META.title
    return () => {
      document.title = SITE_META.title
    }
  }, [project])

  const backLink = (
    <Link to={`/#${SECTION_IDS.work}`} className="project-back-link">
      ← All work
    </Link>
  )

  if (!project) {
    return (
      <div className="project-page">
        <Navigation />
        <main className="project-not-found">
          <p>Project not found.</p>
          {backLink}
        </main>
      </div>
    )
  }

  return (
    <div className="project-page">
      <Navigation />

      <main>
        <header className="project-header">
          {backLink}
          <span className="project-category">{project.category}</span>
          <h1 className="project-title">{project.title}</h1>
        </header>

        <div className="project-body">
          <div className="project-main">
            <section className="project-section">
              <h2 className="project-section-label">Challenge</h2>
              <p>{project.challenge}</p>
            </section>

            <section className="project-section">
              <h2 className="project-section-label">Approach</h2>
              <p>{project.approach}</p>
            </section>

            <section className="project-section">
              <h2 className="project-section-label">Outcome</h2>
              <p>{project.outcome}</p>
            </section>
          </div>

          <aside className="project-sidebar">
            <dl className="project-details">
              <div className="project-detail-item">
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div className="project-detail-item">
                <dt>Sector</dt>
                <dd>{project.sector}</dd>
              </div>
              <div className="project-detail-item">
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="project-detail-item">
                <dt>Services</dt>
                <dd>
                  <ul>
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="project-cta-section">
          <h2 className="project-cta-heading">Interested in working with us?</h2>
          <p>We'd love to hear about your kaupapa.</p>
          <Link to={`/#${SECTION_IDS.contact}`} className="project-cta-btn">
            Get in touch →
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ProjectDetail
