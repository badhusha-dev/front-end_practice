import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationsContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAllRead, removeNotification } = useNotifications()

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">InsureX</Link>
        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="dropdown">
            <button className="btn btn-link position-relative" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-bell fs-5"></i>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="dropdown-menu dropdown-menu-end p-0" style={{ minWidth: 320 }}>
              <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light">
                <span className="small fw-semibold">Notifications</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={markAllRead}>Mark all read</button>
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div className="p-3 text-muted small">No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="dropdown-item d-flex align-items-start gap-2">
                      <span className={`badge mt-1 bg-${n.type}`}>{n.type}</span>
                      <div className="flex-grow-1">
                        <div className="small">{n.message}</div>
                        <div className="text-muted small">{n.time}</div>
                      </div>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => removeNotification(n.id)}>×</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {user?.email && (
            <span className="text-muted small">{user.email} ({user.role})</span>
          )}
          {user?.email ? (
            <button className="btn btn-outline-secondary btn-sm" onClick={() => { logout(); navigate('/login') }}>Logout</button>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )}


