import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAuditLogs } from '../utils/audit'

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')
  const [logs, setLogs] = useState([])
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showProfileModal, setShowProfileModal] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  useEffect(() => {
    document.body.dataset.bsTheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    setLogs(getAuditLogs())
  }, [])

  const validateProfileForm = () => {
    const newErrors = {}
    if (!profileForm.name.trim()) newErrors.name = 'Name is required'
    if (!profileForm.email.trim()) newErrors.email = 'Email is required'
    if (!profileForm.email.includes('@')) newErrors.email = 'Invalid email format'
    if (profileForm.newPassword && profileForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    if (!validateProfileForm()) return

    const updates = {
      name: profileForm.name,
      email: profileForm.email
    }

    if (profileForm.newPassword) {
      updates.password = profileForm.newPassword
    }

    updateProfile(updates)
    setShowProfileModal(false)
    setProfileForm({
      name: updates.name,
      email: updates.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setErrors({})
  }

  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const isAdmin = user?.role === 'Admin'

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Settings</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowProfileModal(true)}
        >
          <i className="bi bi-person-gear me-2"></i>Edit Profile
        </button>
      </div>

      <div className="row g-4">
        {/* Theme Settings */}
        <div className="col-lg-6">
    <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Appearance</h5>
            </div>
      <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-semibold">Theme</label>
                <div className="btn-group w-100" role="group">
                  <button 
                    className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setTheme('light')}
                  >
                    <i className="bi bi-sun me-2"></i>Light
                  </button>
                  <button 
                    className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <i className="bi bi-moon me-2"></i>Dark
                  </button>
                </div>
                <div className="form-text">Switch between light and dark mode</div>
              </div>

          <div>
                <label className="form-label fw-semibold">Language</label>
                <select 
                  className="form-select" 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <div className="form-text">Select your preferred language</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">User Profile</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
                     style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4 fw-bold">{user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
                </div>
                <h6 className="mb-1">{user?.name || 'User Name'}</h6>
                <div className="text-muted small">{user?.email}</div>
                <span className={`badge bg-${
                  user?.role === 'Admin' ? 'danger' :
                  user?.role === 'Agent' ? 'warning' : 'info'
                } mt-2`}>
                  {user?.role}
                </span>
              </div>
              
              <div className="row g-2">
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fw-bold text-primary">Active</div>
                    <div className="small text-muted">Status</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fw-bold text-success">Online</div>
                    <div className="small text-muted">Connection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role Management (Admin Only) */}
        {isAdmin && (
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Role Management</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card border-danger">
                      <div className="card-body text-center">
                        <i className="bi bi-shield-check text-danger fs-1 mb-2"></i>
                        <h6>Admin</h6>
                        <div className="text-muted small">Full system access</div>
                        <div className="mt-2">
                          <span className="badge bg-danger">2 Users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-warning">
                      <div className="card-body text-center">
                        <i className="bi bi-person-badge text-warning fs-1 mb-2"></i>
                        <h6>Agent</h6>
                        <div className="text-muted small">Policy & claims management</div>
                        <div className="mt-2">
                          <span className="badge bg-warning">5 Users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-info">
                      <div className="card-body text-center">
                        <i className="bi bi-person text-info fs-1 mb-2"></i>
                        <h6>Customer</h6>
                        <div className="text-muted small">View own policies & claims</div>
                        <div className="mt-2">
                          <span className="badge bg-info">10 Users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-plus-circle me-2"></i>Add New User
                  </button>
                  <button className="btn btn-outline-secondary ms-2">
                    <i className="bi bi-gear me-2"></i>Manage Permissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Information */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-primary">v1.0.0</div>
                    <div className="text-muted small">App Version</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-success">99.9%</div>
                    <div className="text-muted small">Uptime</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-info">2.5GB</div>
                    <div className="text-muted small">Storage Used</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-warning">127</div>
                    <div className="text-muted small">Active Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Audit Logs</h5>
            </div>
            <div className="card-body">
              {logs.length === 0 ? (
                <div className="text-muted small">No recent activity</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {logs.map((l, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between">
                      <span className="small">{l.message}</span>
                      <span className="text-muted small">{l.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowProfileModal(false)}
                  aria-label="Close"
                />
              </div>
              <form onSubmit={handleProfileUpdate}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={profileForm.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                        placeholder="Enter your full name"
                        required 
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={profileForm.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)} 
                        placeholder="Enter your email"
                        required 
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-12">
                      <hr />
                      <h6 className="mb-3">Change Password (Optional)</h6>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Current Password</label>
                      <input 
                        type="password"
                        className="form-control"
                        value={profileForm.currentPassword} 
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)} 
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">New Password</label>
                      <input 
                        type="password"
                        className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                        value={profileForm.newPassword} 
                        onChange={(e) => handleInputChange('newPassword', e.target.value)} 
                        placeholder="Enter new password"
                      />
                      {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Confirm Password</label>
                      <input 
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={profileForm.confirmPassword} 
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                        placeholder="Confirm new password"
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={() => setShowProfileModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


