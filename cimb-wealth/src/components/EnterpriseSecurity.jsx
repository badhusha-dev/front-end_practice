import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function EnterpriseSecurity() {
  const [securityLogs, setSecurityLogs] = useState([])
  const [accessAttempts, setAccessAttempts] = useState([])
  const [securityMetrics, setSecurityMetrics] = useState({})
  const [alerts, setAlerts] = useState([])
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    // Generate security logs
    const logs = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        event: 'Login Success',
        user: user?.name || 'Current User',
        ip: '192.168.1.100',
        location: 'Kuala Lumpur, Malaysia',
        risk: 'low',
        details: 'Successful authentication via web portal'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        event: 'Portfolio Access',
        user: user?.name || 'Current User',
        ip: '192.168.1.100',
        location: 'Kuala Lumpur, Malaysia',
        risk: 'low',
        details: 'Viewed portfolio holdings'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        event: 'Failed Login Attempt',
        user: 'Unknown',
        ip: '203.123.45.67',
        location: 'Singapore',
        risk: 'high',
        details: 'Multiple failed password attempts'
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        event: 'Data Export',
        user: user?.name || 'Current User',
        ip: '192.168.1.100',
        location: 'Kuala Lumpur, Malaysia',
        risk: 'medium',
        details: 'Exported portfolio report to PDF'
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        event: 'Settings Change',
        user: user?.name || 'Current User',
        ip: '192.168.1.100',
        location: 'Kuala Lumpur, Malaysia',
        risk: 'medium',
        details: 'Updated risk profile settings'
      },
      {
        id: 6,
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        event: 'Suspicious Activity',
        user: 'Unknown',
        ip: '45.123.78.90',
        location: 'Unknown',
        risk: 'critical',
        details: 'Unusual access pattern detected'
      }
    ]
    setSecurityLogs(logs)

    // Generate access attempts
    const attempts = [
      { ip: '192.168.1.100', attempts: 1, success: 1, lastAttempt: new Date() },
      { ip: '203.123.45.67', attempts: 5, success: 0, lastAttempt: new Date(Date.now() - 1000 * 60 * 30) },
      { ip: '45.123.78.90', attempts: 12, success: 0, lastAttempt: new Date(Date.now() - 1000 * 60 * 90) },
      { ip: '10.0.0.15', attempts: 2, success: 1, lastAttempt: new Date(Date.now() - 1000 * 60 * 120) }
    ]
    setAccessAttempts(attempts)

    // Generate security metrics
    const metrics = {
      totalLogins: Math.floor(Math.random() * 100) + 50,
      failedAttempts: Math.floor(Math.random() * 20) + 5,
      suspiciousActivities: Math.floor(Math.random() * 5) + 1,
      dataExports: Math.floor(Math.random() * 10) + 2,
      securityScore: Math.floor(Math.random() * 20) + 80
    }
    setSecurityMetrics(metrics)

    // Generate security alerts
    const alerts = [
      {
        id: 1,
        type: 'critical',
        title: 'Multiple Failed Login Attempts',
        description: 'Detected 5+ failed login attempts from IP 203.123.45.67',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        action: 'IP temporarily blocked'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Unusual Access Pattern',
        description: 'Login from new location detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        action: 'Email verification sent'
      },
      {
        id: 3,
        type: 'info',
        title: 'Data Export Completed',
        description: 'Portfolio report exported successfully',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        action: 'Logged for audit'
      }
    ]
    setAlerts(alerts)
  }, [user])

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'var(--cimb-teal)'
      case 'medium': return 'var(--cimb-gold)'
      case 'high': return 'var(--cimb-red)'
      case 'critical': return '#DC2626'
      default: return 'var(--cimb-red)'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return '✅'
      case 'medium': return '⚠️'
      case 'high': return '🚨'
      case 'critical': return '🔴'
      default: return 'ℹ️'
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'danger'
      case 'warning': return 'warning'
      case 'info': return 'info'
      default: return 'secondary'
    }
  }

  return (
    <div className="row g-3">
      {/* Security Overview */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">🔒 Enterprise Security Dashboard</h5>
            <p className="text-muted mb-0">Monitor security events and access patterns</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {securityMetrics.totalLogins}
                  </div>
                  <div className="text-muted">Total Logins</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {securityMetrics.failedAttempts}
                  </div>
                  <div className="text-muted">Failed Attempts</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {securityMetrics.suspiciousActivities}
                  </div>
                  <div className="text-muted">Suspicious Activities</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {securityMetrics.securityScore}%
                  </div>
                  <div className="text-muted">Security Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🚨 Security Alerts</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`alert alert-${getAlertColor(alert.type)} alert-dismissible fade show`}
                >
                  <div className="d-flex align-items-start">
                    <div className="me-2 fs-5">
                      {alert.type === 'critical' ? '🔴' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="alert-heading small mb-1">{alert.title}</h6>
                      <p className="mb-1 small">{alert.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{alert.timestamp.toLocaleTimeString()}</small>
                        <small className="fw-semibold">{alert.action}</small>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Access Attempts */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🌐 Access Attempts</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>Attempts</th>
                    <th>Success</th>
                    <th>Last Attempt</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {accessAttempts.map((attempt, index) => (
                    <motion.tr
                      key={attempt.ip}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="font-monospace small">{attempt.ip}</td>
                      <td className="financial-data">{attempt.attempts}</td>
                      <td className="financial-data">{attempt.success}</td>
                      <td className="small">{attempt.lastAttempt.toLocaleTimeString()}</td>
                      <td>
                        <span className={`badge ${
                          attempt.success > 0 ? 'bg-success' : 
                          attempt.attempts > 5 ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {attempt.success > 0 ? 'Success' : 
                           attempt.attempts > 5 ? 'Blocked' : 'Monitoring'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📋 Security Audit Log</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Event</th>
                    <th>User</th>
                    <th>IP Address</th>
                    <th>Location</th>
                    <th>Risk Level</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {securityLogs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="small font-monospace">{log.timestamp.toLocaleString()}</td>
                      <td className="fw-semibold small">{log.event}</td>
                      <td className="small">{log.user}</td>
                      <td className="small font-monospace">{log.ip}</td>
                      <td className="small">{log.location}</td>
                      <td>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getRiskColor(log.risk) }}
                        >
                          {getRiskIcon(log.risk)} {log.risk}
                        </span>
                      </td>
                      <td className="small text-muted">{log.details}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">⚙️ Security Settings</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="twoFactor" defaultChecked />
                  <label className="form-check-label" htmlFor="twoFactor">
                    Two-Factor Authentication
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="emailAlerts" defaultChecked />
                  <label className="form-check-label" htmlFor="emailAlerts">
                    Email Security Alerts
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="sessionTimeout" defaultChecked />
                  <label className="form-check-label" htmlFor="sessionTimeout">
                    Auto Session Timeout
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="ipWhitelist" />
                  <label className="form-check-label" htmlFor="ipWhitelist">
                    IP Address Whitelist
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="auditLogging" defaultChecked />
                  <label className="form-check-label" htmlFor="auditLogging">
                    Enhanced Audit Logging
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="encryption" defaultChecked />
                  <label className="form-check-label" htmlFor="encryption">
                    Data Encryption at Rest
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
