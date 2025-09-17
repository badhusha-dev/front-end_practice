import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => { document.body.dataset.bsTheme = theme }, [theme])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Shahul Hameed</Link>
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
              {theme==='dark' ? 'Light' : 'Dark'} Mode
            </button>
            <a className="btn btn-sm btn-primary" href="#contact">Contact</a>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
