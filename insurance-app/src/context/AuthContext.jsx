import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [sessionTimerId, setSessionTimerId] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('auth')
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch (_) {}
  }, [])

  const login = (email, role) => {
    const payload = { email, role }
    localStorage.setItem('auth', JSON.stringify(payload))
    setUser(payload)
    startSessionTimer()
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setUser(null)
    if (sessionTimerId) {
      clearTimeout(sessionTimerId)
      setSessionTimerId(null)
    }
  }

  const updateProfile = (updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem('auth', JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(() => ({ user, login, logout, updateProfile, isAuthenticated: !!user }), [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// Session timeout: 10 minutes of inactivity
function startSessionTimer() {
  const timeoutMs = 10 * 60 * 1000
  // Store expiry in localStorage to survive reloads
  const expiry = Date.now() + timeoutMs
  localStorage.setItem('session_expiry', String(expiry))
}

// Global activity listener and interval to enforce timeout
if (typeof window !== 'undefined') {
  const reset = () => {
    if (localStorage.getItem('auth')) {
      startSessionTimer()
    }
  }
  ;['click','mousemove','keydown','scroll','touchstart'].forEach(evt => {
    window.addEventListener(evt, reset, { passive: true })
  })
  setInterval(() => {
    const expiryRaw = localStorage.getItem('session_expiry')
    const hasAuth = localStorage.getItem('auth')
    if (!hasAuth || !expiryRaw) return
    const expiry = Number(expiryRaw)
    if (Date.now() > expiry) {
      // expire session
      localStorage.removeItem('auth')
      localStorage.removeItem('session_expiry')
      // Force reload to trigger guards
      window.location.href = '/login'
    }
  }, 30000)
}


