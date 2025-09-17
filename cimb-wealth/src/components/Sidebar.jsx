import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Sidebar() {
  const collapsed = useSelector(s => s.ui.sidebarCollapsed)
  return (
    <aside className={`sidebar-cimb ${collapsed ? 'd-none d-lg-block' : ''}`} style={{ width: 240, minHeight: '100vh' }}>
      <div className="p-3 fw-bold d-flex align-items-center">
        <div className="me-2" style={{ width: 32, height: 32, background: 'var(--cimb-red)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>C</div>
        <span className={collapsed ? 'd-none' : ''}>CIMB Wealth</span>
      </div>
      <nav className="nav flex-column px-2">
        <NavLink className="nav-link" to="/">
          <span className="me-2">📊</span>
          <span className={collapsed ? 'd-none' : ''}>Dashboard</span>
        </NavLink>
        <NavLink className="nav-link" to="/investments">
          <span className="me-2">💼</span>
          <span className={collapsed ? 'd-none' : ''}>Investments</span>
        </NavLink>
        <NavLink className="nav-link" to="/portfolio">
          <span className="me-2">📈</span>
          <span className={collapsed ? 'd-none' : ''}>Portfolio</span>
        </NavLink>
        <NavLink className="nav-link" to="/goals">
          <span className="me-2">🎯</span>
          <span className={collapsed ? 'd-none' : ''}>Goals</span>
        </NavLink>
        <NavLink className="nav-link" to="/reports">
          <span className="me-2">📋</span>
          <span className={collapsed ? 'd-none' : ''}>Reports</span>
        </NavLink>
        <NavLink className="nav-link" to="/settings">
          <span className="me-2">⚙️</span>
          <span className={collapsed ? 'd-none' : ''}>Settings</span>
        </NavLink>
      </nav>
    </aside>
  )
}


