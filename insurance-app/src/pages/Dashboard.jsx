import { useEffect, useRef, useState } from 'react'
import { policies, claims, customers } from '../data/dummyData'
import { mountShield } from '../three/insurance3D'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useEffect as useReactDnD } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function Dashboard() {
  const shieldRef = useRef(null)
  const [layout, setLayout] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dash_layout')||'{}') } catch { return {} }
  })
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Premium due for POL-1001', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Claim CLM-2001 approved', time: '1 day ago' },
    { id: 3, type: 'success', message: 'New policy POL-1020 created', time: '2 days ago' },
    { id: 4, type: 'danger', message: 'Policy POL-1005 expired', time: '3 days ago' },
  ])

  useEffect(() => {
    if (shieldRef.current) {
      const cleanup = mountShield(shieldRef.current)
      return cleanup
    }
  }, [])

  const totalPolicies = policies.length
  const activePolicies = policies.filter(p => p.status === 'Active').length
  const activeClaims = claims.filter(c => c.status !== 'Rejected').length
  const pendingClaims = claims.filter(c => c.status === 'Open').length
  const totalCustomers = customers.length

  // Premium collection trend data
  const premiumTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Premium Collection ($)',
        data: [12000, 15000, 18000, 16000, 20000, 22000],
        backgroundColor: 'rgba(13, 110, 253, 0.8)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 2,
      },
    ],
  }

  // Claims approval vs rejection data
  const claimsData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [
          claims.filter(c => c.status === 'Approved').length,
          claims.filter(c => c.status === 'Rejected').length,
          claims.filter(c => c.status === 'Open').length,
        ],
        backgroundColor: [
          'rgba(25, 135, 84, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(25, 135, 84, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="text-muted small">Total Policies</div>
                  <div className="fs-3 fw-bold text-primary">{totalPolicies}</div>
                </div>
                <div className="text-primary">
                  <i className="bi bi-shield-check fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="text-muted small">Active Policies</div>
                  <div className="fs-3 fw-bold text-success">{activePolicies}</div>
                </div>
                <div className="text-success">
                  <i className="bi bi-check-circle fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="text-muted small">Pending Claims</div>
                  <div className="fs-3 fw-bold text-warning">{pendingClaims}</div>
                </div>
                <div className="text-warning">
                  <i className="bi bi-clock fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="text-muted small">Total Customers</div>
                  <div className="fs-3 fw-bold text-info">{totalCustomers}</div>
                </div>
                <div className="text-info">
                  <i className="bi bi-people fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* 3D Logo */}
        <div className="col-lg-4" draggable onDragEnd={(e)=>{ localStorage.setItem('dash_layout', JSON.stringify({ ...layout, lastDrag: Date.now() })) }}>
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Insurance 3D Logo</h5>
            </div>
            <div className="card-body">
              <div ref={shieldRef} style={{ width: '100%', height: 240 }} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-lg-4" draggable onDragEnd={(e)=>{ localStorage.setItem('dash_layout', JSON.stringify({ ...layout, lastDrag: Date.now() })) }}>
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Notifications</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {notifications.map(notification => (
                  <div key={notification.id} className="list-group-item px-0 border-0">
                    <div className="d-flex align-items-start">
                      <div className={`badge bg-${notification.type} me-2 mt-1`}>
                        {notification.type === 'warning' && '⚠️'}
                        {notification.type === 'info' && 'ℹ️'}
                        {notification.type === 'success' && '✅'}
                        {notification.type === 'danger' && '❌'}
                      </div>
                      <div className="flex-grow-1">
                        <div className="small">{notification.message}</div>
                        <div className="text-muted small">{notification.time}</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => removeNotification(notification.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Claims Status Chart */}
        <div className="col-lg-4" draggable onDragEnd={(e)=>{ localStorage.setItem('dash_layout', JSON.stringify({ ...layout, lastDrag: Date.now() })) }}>
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Claims Status</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 240 }}>
                <Doughnut data={claimsData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Trend Chart */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Premium Collection Trend</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 300 }}>
                <Bar data={premiumTrendData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


