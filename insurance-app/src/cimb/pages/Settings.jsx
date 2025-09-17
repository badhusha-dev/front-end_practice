import { useState, useEffect } from 'react'

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem('cimb-theme') || 'dark')
  useEffect(() => {
    document.body.dataset.bsTheme = theme
    localStorage.setItem('cimb-theme', theme)
  }, [theme])

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">Settings</div>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold">Theme</div>
            <div className="text-muted">Switch between light and dark mode.</div>
          </div>
          <div className="btn-group">
            <button className={`btn btn-sm ${theme==='light'?'btn-danger':'btn-outline-danger'}`} onClick={()=>setTheme('light')}>Light</button>
            <button className={`btn btn-sm ${theme==='dark'?'btn-danger':'btn-outline-danger'}`} onClick={()=>setTheme('dark')}>Dark</button>
          </div>
        </div>
      </div>
    </div>
  )
}


