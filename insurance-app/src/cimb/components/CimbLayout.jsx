import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CimbLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1f1f1f,#2a2a2a)' }}>
      <aside className="bg-dark text-white" style={{ width: 240 }}>
        <div className="p-3 border-bottom border-secondary d-flex align-items-center gap-2">
          <span className="bg-danger rounded-circle" style={{ width: 10, height: 10 }} />
          <span className="fw-bold">CIMB Wealth</span>
        </div>
        <nav className="nav flex-column p-2">
          <NavLink className="nav-link text-white-50" to="/cimb">Dashboard</NavLink>
          <NavLink className="nav-link text-white-50" to="/cimb/portfolio">Portfolio</NavLink>
          <NavLink className="nav-link text-white-50" to="/cimb/investments">Investments</NavLink>
          <NavLink className="nav-link text-white-50" to="/cimb/reports">Reports</NavLink>
          <NavLink className="nav-link text-white-50" to="/cimb/goals">Goals</NavLink>
          <NavLink className="nav-link text-white-50" to="/cimb/settings">Settings</NavLink>
        </nav>
      </aside>

      <div className="flex-grow-1">
        <nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
          <div className="container-fluid">
            <Link to="/cimb" className="navbar-brand">CIMB Wealth</Link>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-light btn-sm">Dark/Light</button>
              <div className="dropdown">
                <button className="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">User</button>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link className="dropdown-item" to="/cimb/settings">Settings</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <motion.main
          className="p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}


