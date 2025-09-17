import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import ThreeScene from '../three/ThreeScene.jsx'
import { siteData } from '../data/siteData'
import { Experience, Projects, Skills, Education } from './Sections.jsx'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="position-relative" style={{ height: '100vh' }}>
        <Canvas camera={{ position: [0, 1.2, 4], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />
          <ThreeScene />
        </Canvas>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-3" style={{ maxWidth: 900 }}>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-5 fw-bold">
            {siteData.name}
          </motion.h1>
          <motion.p className="lead mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {siteData.headline}
          </motion.p>
          <div className="d-flex justify-content-center gap-3">
            <a className="btn btn-primary" href="/cv/shahul-hameed-cv.pdf" target="_blank" rel="noreferrer">Download Resume</a>
            <a className="btn btn-outline-light" href="#contact">Contact Me</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-5 bg-body">
        <div className="container">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="mb-3">About</h3>
              <p className="mb-0">{siteData.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <Experience />
      <Projects />
      <Skills />
      <Education />
    </div>
  )
}


