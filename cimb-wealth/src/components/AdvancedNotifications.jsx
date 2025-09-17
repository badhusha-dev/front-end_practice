import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { push, remove, clear } from '../store'

const NOTIFICATION_TYPES = {
  success: { icon: '✅', color: 'var(--cimb-teal)', bg: 'alert-success' },
  warning: { icon: '⚠️', color: 'var(--cimb-gold)', bg: 'alert-warning' },
  error: { icon: '❌', color: 'var(--cimb-red)', bg: 'alert-danger' },
  info: { icon: 'ℹ️', color: 'var(--cimb-red)', bg: 'alert-info' },
  advisor: { icon: '🤖', color: 'var(--cimb-red)', bg: 'alert-primary' }
}

export default function AdvancedNotifications() {
  const notifications = useSelector(s => s.notifications.items)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Simulate various notification types
    const intervals = [
      { type: 'success', message: 'Portfolio value increased by 2.3% this week', interval: 15000 },
      { type: 'info', message: 'New dividend payment received from CIMB', interval: 20000 },
      { type: 'warning', message: 'Goal "Emergency Fund" is 70% complete', interval: 25000 },
      { type: 'advisor', message: 'AI recommends rebalancing your portfolio', interval: 30000 },
      { type: 'error', message: 'Market volatility detected - consider risk management', interval: 35000 }
    ]

    const timers = intervals.map(({ type, message, interval }) => 
      setInterval(() => {
        dispatch(push({ type, message, timestamp: new Date().toLocaleTimeString() }))
      }, interval)
    )

    return () => timers.forEach(clearInterval)
  }, [dispatch])

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || n.type === filter
  )

  const getNotificationCount = (type) => 
    notifications.filter(n => n.type === type).length

  const markAsRead = (id) => {
    // In a real app, you'd update the notification state
    console.log('Marked as read:', id)
  }

  const clearByType = (type) => {
    const toRemove = notifications.filter(n => n.type === type).map(n => n.id)
    toRemove.forEach(id => dispatch(remove(id)))
  }

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {/* Notification Bell */}
      <div className="position-relative">
        <button 
          className="btn btn-outline-secondary btn-sm position-relative"
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderRadius: '50%', width: '40px', height: '40px' }}
        >
          🔔
          {notifications.length > 0 && (
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              style={{ backgroundColor: 'var(--cimb-red)' }}
            >
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            className="card shadow-lg glass-card"
            style={{ 
              minWidth: '350px', 
              maxWidth: '400px',
              maxHeight: '500px',
              overflow: 'hidden'
            }}
          >
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Notifications</h6>
              <div className="d-flex gap-1">
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setFilter(filter === 'all' ? 'success' : 'all')}
                >
                  All ({notifications.length})
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(clear())}
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-3 pb-2">
              <div className="btn-group w-100" role="group">
                {Object.keys(NOTIFICATION_TYPES).map(type => (
                  <button
                    key={type}
                    className={`btn btn-sm ${filter === type ? 'btn-cimb-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setFilter(type)}
                  >
                    {NOTIFICATION_TYPES[type].icon} {getNotificationCount(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="card-body p-0" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <AnimatePresence>
                {filteredNotifications.slice(0, 10).map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`alert ${NOTIFICATION_TYPES[notification.type]?.bg || 'alert-info'} alert-dismissible fade show m-2 mb-1`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <div className="d-flex align-items-start">
                      <div className="me-2 fs-5">
                        {NOTIFICATION_TYPES[notification.type]?.icon || 'ℹ️'}
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold small">{notification.message}</div>
                        {notification.timestamp && (
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {notification.timestamp}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-sm"
                      onClick={() => dispatch(remove(notification.id))}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredNotifications.length === 0 && (
                <div className="text-center p-4 text-muted">
                  <div className="fs-1 mb-2">🔕</div>
                  <div>No notifications</div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card-footer bg-transparent border-0">
              <div className="d-flex justify-content-between">
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => clearByType('info')}
                >
                  Clear Info
                </button>
                <button 
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => clearByType('warning')}
                >
                  Clear Warnings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="position-absolute top-0 end-0" style={{ zIndex: 1060 }}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`alert ${NOTIFICATION_TYPES[notification.type]?.bg || 'alert-info'} alert-dismissible fade show mb-2`}
              style={{ minWidth: '300px', fontSize: '0.9rem' }}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">{NOTIFICATION_TYPES[notification.type]?.icon || 'ℹ️'}</span>
                <span className="flex-grow-1">{notification.message}</span>
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  onClick={() => dispatch(remove(notification.id))}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
