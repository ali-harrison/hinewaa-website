import { Link } from 'react-router-dom'
import { SECTION_IDS } from '../constants/site'
import { projects } from '../data/projects'

function Work() {
  return (
    <section className="work section" id={SECTION_IDS.work}>
      <div className="container">
        <div className="work-header" data-reveal>
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">He Mahi Whakahirahira</h2>
          <p className="section-intro">
            Recent engagements across iwi, Crown and environmental governance.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="work-card"
              data-reveal
            >
              <span className="work-card-category">{project.category}</span>
              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-summary">{project.summary}</p>
              <span className="work-card-link">View project →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
