import { motion } from 'framer-motion'
import goals from '../data/goals.json'
import { useState, useEffect } from 'react'

export default function Goals() {
  const [animatedGoals, setAnimatedGoals] = useState([])
  const [milestones, setMilestones] = useState([])

  useEffect(() => {
    // Animate progress bars on load
    const timer = setTimeout(() => {
      setAnimatedGoals(goals.map(goal => ({
        ...goal,
        animatedProgress: Math.round((goal.currentAmount / goal.targetAmount) * 100)
      })))
    }, 500)

    // Generate milestones
    const newMilestones = goals
      .filter(goal => (goal.currentAmount / goal.targetAmount) >= 0.5)
      .map(goal => ({
        id: goal.goalName,
        title: `${goal.goalName} - 50% Complete`,
        description: `Congratulations! You've reached 50% of your ${goal.goalName} goal.`,
        icon: '🎉',
        date: new Date().toLocaleDateString()
      }))
    setMilestones(newMilestones)

    return () => clearTimeout(timer)
  }, [])

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success'
    if (progress >= 50) return 'warning'
    return 'danger'
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger'
      case 'Medium': return 'warning'
      case 'Low': return 'info'
      default: return 'secondary'
    }
  }

  const getProgressIcon = (progress) => {
    if (progress >= 100) return '🏆'
    if (progress >= 80) return '🎯'
    if (progress >= 50) return '📈'
    if (progress >= 25) return '🌱'
    return '🌱'
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Financial Goals</h3>
        {milestones.length > 0 && (
          <div className="badge bg-success fs-6">
            {milestones.length} Milestone{milestones.length !== 1 ? 's' : ''} Achieved
          </div>
        )}
      </div>

      {/* Milestones Section */}
      {milestones.length > 0 && (
        <motion.div 
          className="row g-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="col-12">
            <div className="card shadow-sm glass-card">
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-0">🎉 Recent Milestones</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      className="col-md-6 col-lg-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="card h-100" style={{ borderLeft: '4px solid var(--cimb-teal)' }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="fs-3 me-2">{milestone.icon}</div>
                            <div>
                              <h6 className="card-title mb-0">{milestone.title}</h6>
                              <small className="text-muted">{milestone.date}</small>
                            </div>
                          </div>
                          <p className="card-text small">{milestone.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Goals Grid */}
      <div className="row g-3">
        {animatedGoals.map((goal, index) => {
          const progress = goal.animatedProgress || Math.round((goal.currentAmount / goal.targetAmount) * 100)
          const remaining = goal.targetAmount - goal.currentAmount
          const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
          
          return (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card shadow-sm h-100 glass-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">{goal.goalName}</h6>
                    <div className="d-flex align-items-center gap-1">
                      <span className={`badge bg-${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                      <div className="fs-4">{getProgressIcon(progress)}</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress" style={{ height: '12px', borderRadius: '6px' }}>
                      <motion.div 
                        className={`progress-bar bg-${getProgressColor(progress)}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="row g-2 small">
                    <div className="col-6">
                      <div className="text-muted">Current</div>
                      <div className="fw-semibold financial-data">${goal.currentAmount.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <div className="text-muted">Target</div>
                      <div className="fw-semibold financial-data">${goal.targetAmount.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <div className="text-muted">Remaining</div>
                      <div className="fw-semibold financial-data text-danger">${remaining.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <div className="text-muted">Days Left</div>
                      <div className="fw-semibold">{daysLeft > 0 ? daysLeft : 'Overdue'}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </small>
                  </div>

                  {/* Progress Animation */}
                  {progress >= 100 && (
                    <motion.div
                      className="mt-2 text-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <div className="badge bg-success fs-6">
                        🏆 Goal Achieved!
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
