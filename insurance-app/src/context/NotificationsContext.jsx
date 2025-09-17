import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const NotificationsContext = createContext(null)

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('notifications')
      return saved ? JSON.parse(saved) : []
    } catch (_) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = (payload) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      type: payload.type || 'info',
      message: payload.message,
      time: payload.time || new Date().toLocaleString(),
      read: false,
    }
    setNotifications(prev => [item, ...prev].slice(0, 50))
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const value = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    markAllRead,
    unreadCount: notifications.filter(n => !n.read).length,
  }), [notifications])

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationsContext)
}


