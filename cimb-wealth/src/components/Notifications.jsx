import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { push, remove } from '../store'

export default function Notifications() {
  const notifications = useSelector(s => s.notifications.items)
  const dispatch = useDispatch()

  useEffect(() => {
    // Simulate notifications
    const interval = setInterval(() => {
      const messages = [
        { type: 'success', message: 'Portfolio value increased by 2.3% this week' },
        { type: 'info', message: 'New dividend payment received from CIMB' },
        { type: 'warning', message: 'Goal "Emergency Fund" is 70% complete' },
        { type: 'success', message: 'Investment in PETRONAS showing 15% returns' },
        { type: 'info', message: 'Monthly report is ready for download' }
      ]
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      dispatch(push(randomMsg))
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`alert alert-${notification.type} alert-dismissible fade show mb-2`}
            style={{ minWidth: '300px' }}
          >
            <small>{notification.message}</small>
            <button
              type="button"
              className="btn-close btn-close-sm"
              onClick={() => dispatch(remove(notification.id))}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
