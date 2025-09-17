import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="border-end bg-light" style={{ width: 240, minHeight: '100vh' }}>
      <div className="p-3 fw-bold">Menu</div>
      <nav className="nav flex-column px-2">
        <NavLink className="nav-link" to="/">Dashboard</NavLink>
        <NavLink className="nav-link" to="/policies">Policies</NavLink>
        <NavLink className="nav-link" to="/claims">Claims</NavLink>
        <NavLink className="nav-link" to="/customers">Customers</NavLink>
        <NavLink className="nav-link" to="/reports">Reports</NavLink>
        <NavLink className="nav-link" to="/settings">Settings</NavLink>
      </nav>
    </aside>
  )
}


