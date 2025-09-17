import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { logout } from '../store'
import RiskCalculator from '../components/RiskCalculator.jsx'

export default function Settings() {
  const [name, setName] = useState(localStorage.getItem('name') || 'CIMB Customer')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const user = useSelector(s => s.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.dataset.bsTheme = theme
  }, [theme])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <motion.div 
          className="card shadow-sm glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Profile Settings</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Display Name</label>
              <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input className="form-control" value={user?.account || 'CIMB-0000'} readOnly />
              <small className="text-muted">Account number is masked for security</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input className="form-control" value={user?.role || 'customer'} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Risk Profile</label>
              <input className="form-control" value={user?.risk || 'Moderate'} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Theme</label>
              <div className="d-flex align-items-center gap-3">
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="themeToggle"
                    checked={theme === 'dark'}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                  />
                  <label className="form-check-label" htmlFor="themeToggle">
                    {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-cimb-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </motion.div>
      </div>
      <div className="col-lg-6">
        <RiskCalculator />
      </div>
    </div>
  )
}