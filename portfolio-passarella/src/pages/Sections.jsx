import { motion } from 'framer-motion'
import { siteData } from '../data/siteData'

export function Experience() {
  return (
    <section id="experience" className="py-5">
      <div className="container">
        <h3 className="mb-4">Experience</h3>
        <div className="border-start ps-3">
          {siteData.experience.map((exp, idx) => (
            <motion.div key={idx} className="mb-4" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-1">{exp.role} · {exp.company}</h5>
                    <span className="text-muted small">{exp.period}</span>
                  </div>
                  <ul className="mb-0">
                    {exp.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-5 bg-body">
      <div className="container">
        <h3 className="mb-4">Projects</h3>
        <div className="row g-4">
          {siteData.projects.map((p, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <motion.div className="card border-0 shadow-sm h-100" whileHover={{ y: -4, scale: 1.01 }}>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <div>
                    {p.stack.map((t, i) => <span key={i} className="badge text-bg-secondary me-1">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-5">
      <div className="container">
        <h3 className="mb-4">Skills</h3>
        {Object.entries(siteData.skills).map(([cat, items]) => (
          <div key={cat} className="mb-3">
            <div className="fw-semibold mb-1">{cat}</div>
            {items.map((s, i) => <span key={i} className="badge rounded-pill text-bg-primary me-1 mb-1">{s}</span>)}
          </div>
        ))}
      </div>
    </section>
  )
}

export function Education() {
  const e = siteData.education
  return (
    <section id="education" className="py-5 bg-body">
      <div className="container">
        <h3 className="mb-4">Education</h3>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-1">{e.degree}</h5>
            <div className="text-muted">{e.school} · {e.period}</div>
          </div>
        </div>
      </div>
    </section>
  )
}


