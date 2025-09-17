import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { push } from '../store'
import investments from '../data/investments.json'
import transactions from '../data/transactions.json'
import goals from '../data/goals.json'

const WIDGET_TYPES = {
  wealth: { id: 'wealth', name: 'Total Wealth', icon: '💰', col: 'col-6 col-md-3' },
  customers: { id: 'customers', name: 'Customers', icon: '👥', col: 'col-6 col-md-3' },
  recent: { id: 'recent', name: 'Recent Transactions', icon: '📋', col: 'col-12 col-md-6' },
  performance: { id: 'performance', name: 'Performance', icon: '📈', col: 'col-6 col-md-3' },
  goals: { id: 'goals', name: 'Goals Progress', icon: '🎯', col: 'col-6 col-md-3' },
  alerts: { id: 'alerts', name: 'Market Alerts', icon: '🔔', col: 'col-6 col-md-3' },
  news: { id: 'news', name: 'Market News', icon: '📰', col: 'col-6 col-md-3' }
}

export default function DashboardWidgets() {
  const [widgets, setWidgets] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dashboard_widgets'))
      return Array.isArray(saved) ? saved : ['wealth', 'customers', 'recent']
    } catch { return ['wealth', 'customers', 'recent'] }
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [draggedWidget, setDraggedWidget] = useState(null)
  const dispatch = useDispatch()
  const notifications = useSelector(s => s.notifications.items)

  useEffect(() => {
    localStorage.setItem('dashboard_widgets', JSON.stringify(widgets))
  }, [widgets])

  const totalWealth = investments.reduce((s, i) => s + i.qty * i.price, 0)
  const recent = transactions.slice(0, 5)
  const completedGoals = goals.filter(g => (g.currentAmount / g.targetAmount) >= 1).length
  const totalGoals = goals.length
  const performance = Math.random() * 20 - 10 // Simulated performance

  const onDragStart = (e, id) => {
    setDraggedWidget(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (e, targetId) => {
    e.preventDefault()
    if (!draggedWidget || draggedWidget === targetId) return
    
    const newWidgets = [...widgets]
    const from = newWidgets.indexOf(draggedWidget)
    const to = newWidgets.indexOf(targetId)
    
    if (from !== -1 && to !== -1) {
      newWidgets.splice(to, 0, ...newWidgets.splice(from, 1))
      setWidgets(newWidgets)
    }
    setDraggedWidget(null)
  }

  const addWidget = (widgetId) => {
    if (!widgets.includes(widgetId)) {
      setWidgets([...widgets, widgetId])
      dispatch(push({ type: 'success', message: `Added ${WIDGET_TYPES[widgetId].name} widget` }))
    }
  }

  const removeWidget = (widgetId) => {
    setWidgets(widgets.filter(id => id !== widgetId))
    dispatch(push({ type: 'info', message: `Removed ${WIDGET_TYPES[widgetId].name} widget` }))
  }

  const renderWidget = (widgetId) => {
    const widget = WIDGET_TYPES[widgetId]
    if (!widget) return null

    const commonProps = {
      key: widgetId,
      className: `${widget.col} ${isEditing ? 'editing' : ''}`,
      draggable: isEditing,
      onDragStart: (e) => onDragStart(e, widgetId),
      onDragOver: onDragOver,
      onDrop: (e) => onDrop(e, widgetId)
    }

    switch (widgetId) {
      case 'wealth':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className="fs-3 fw-bold financial-data">${totalWealth.toLocaleString()}</div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'customers':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className="fs-3 fw-bold financial-data">1,247</div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'recent':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card h-100" whileHover={{ scale: 1.01 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="fw-semibold">{widget.name}</div>
                  <div className="fs-4">{widget.icon}</div>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead><tr><th>Date</th><th>Description</th><th className="text-end">Amount</th></tr></thead>
                    <tbody>
                      {recent.map((t, idx) => (
                        <tr key={idx}>
                          <td>{t.date}</td>
                          <td>{t.description}</td>
                          <td className="text-end financial-data">{t.credit || t.debit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'performance':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className={`fs-3 fw-bold ${performance >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                      {performance >= 0 ? '+' : ''}{performance.toFixed(1)}%
                    </div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'goals':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className="fs-3 fw-bold financial-data">{completedGoals}/{totalGoals}</div>
                    <div className="small text-muted">Completed</div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'alerts':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className="fs-3 fw-bold financial-data">{notifications.length}</div>
                    <div className="small text-muted">Active</div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'news':
        return (
          <div {...commonProps}>
            <motion.div className="card shadow-sm glass-card" whileHover={{ scale: 1.02 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted">{widget.name}</div>
                    <div className="small">Market Update</div>
                    <div className="small text-muted">KLCI +0.5%</div>
                  </div>
                  <div className="fs-2">{widget.icon}</div>
                </div>
                {isEditing && (
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeWidget(widgetId)}>
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  const availableWidgets = Object.keys(WIDGET_TYPES).filter(id => !widgets.includes(id))

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Dashboard</h4>
        <div className="d-flex gap-2">
          <button 
            className={`btn btn-sm ${isEditing ? 'btn-cimb-primary' : 'btn-outline-secondary'}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Done Editing' : 'Customize'}
          </button>
          {isEditing && availableWidgets.length > 0 && (
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                Add Widget
              </button>
              <ul className="dropdown-menu">
                {availableWidgets.map(id => (
                  <li key={id}>
                    <button className="dropdown-item" onClick={() => addWidget(id)}>
                      {WIDGET_TYPES[id].icon} {WIDGET_TYPES[id].name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <AnimatePresence>
          {widgets.map(renderWidget)}
        </AnimatePresence>
      </div>

      {isEditing && (
        <motion.div 
          className="alert alert-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>Customize your dashboard:</strong> Drag widgets to reorder, click "Remove" to hide widgets, or add new ones from the dropdown.
        </motion.div>
      )}
    </div>
  )
}
