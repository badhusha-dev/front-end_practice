import { Routes, Route, Navigate } from 'react-router-dom'
import CimbLayout from './components/CimbLayout'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Investments from './pages/Investments'
import Reports from './pages/Reports'
import Goals from './pages/Goals'
import Settings from './pages/Settings'

export default function CimbApp() {
  return (
    <CimbLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/cimb" replace />} />
      </Routes>
    </CimbLayout>
  )
}


