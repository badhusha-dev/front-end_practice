import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../store'

export default function Navbar() {
  const dispatch = useDispatch()
  return (
    <nav className="navbar navbar-expand-lg navbar-cimb">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm d-inline-flex d-lg-none" onClick={()=>dispatch(toggleSidebar())}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="d-flex align-items-center">
            <div className="me-2" style={{ width: 28, height: 28, background: 'var(--cimb-red)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>C</div>
            <Link className="navbar-brand mb-0 fw-bold" to="/" style={{ color: 'var(--cimb-red)' }}>CIMB Wealth</Link>
          </div>
        </div>
        <div className="ms-auto text-muted small">Modern Wealth Dashboard</div>
      </div>
    </nav>
  )
}


