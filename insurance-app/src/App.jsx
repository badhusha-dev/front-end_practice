import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Policies from './pages/Policies.jsx'
import Claims from './pages/Claims.jsx'
import Customers from './pages/Customers.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import CimbApp from './cimb/CimbApp.jsx'

import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { ProtectedRoute, RoleRoute } from './components/RouteGuards.jsx'

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container py-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
            <Route path="/claims" element={<ProtectedRoute><Claims /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><RoleRoute roles={['Admin']}><Settings /></RoleRoute></ProtectedRoute>} />
            <Route path="/cimb/*" element={<ProtectedRoute><CimbApp /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
