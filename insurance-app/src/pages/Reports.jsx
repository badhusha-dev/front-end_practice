import { useMemo } from 'react'
import { policies, claims, customers } from '../data/dummyData'
import { exportToPDF, exportToExcel, exportToCSV } from '../utils/reportGenerator'
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
import { Bar, Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function Reports() {
  const exportPoliciesPDF = () => exportToPDF('Policies Report', ['policyNo','holderName','type','premium','startDate','status'], policies)
  const exportPoliciesExcel = () => exportToExcel('Policies Report', ['policyNo','holderName','type','premium','startDate','status'], policies)
  const exportPoliciesCSV = () => exportToCSV('Policies Report', ['policyNo','holderName','type','premium','startDate','status'], policies)
  const exportClaimsPDF = () => exportToPDF('Claims Report', ['claimId','policyNo','amount','status','date','description'], claims)
  const exportClaimsExcel = () => exportToExcel('Claims Report', ['claimId','policyNo','amount','status','date','description'], claims)
  const exportClaimsCSV = () => exportToCSV('Claims Report', ['claimId','policyNo','amount','status','date','description'], claims)
  const exportCustomersPDF = () => exportToPDF('Customers Report', ['id','name','email','phone','address','joinDate'], customers)
  const exportCustomersExcel = () => exportToExcel('Customers Report', ['id','name','email','phone','address','joinDate'], customers)
  const exportCustomersCSV = () => exportToCSV('Customers Report', ['id','name','email','phone','address','joinDate'], customers)

  // Policy distribution by type
  const policyTypeData = useMemo(() => {
    const typeCount = policies.reduce((acc, policy) => {
      acc[policy.type] = (acc[policy.type] || 0) + 1
      return acc
    }, {})

    return {
      labels: Object.keys(typeCount),
      datasets: [
        {
          data: Object.values(typeCount),
          backgroundColor: [
            'rgba(13, 110, 253, 0.8)',
            'rgba(25, 135, 84, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(220, 53, 69, 0.8)',
            'rgba(111, 66, 193, 0.8)',
          ],
          borderColor: [
            'rgba(13, 110, 253, 1)',
            'rgba(25, 135, 84, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(111, 66, 193, 1)',
          ],
          borderWidth: 2,
        },
      ],
    }
  }, [])

  // Claims approval vs rejection
  const claimsStatusData = useMemo(() => {
    const statusCount = claims.reduce((acc, claim) => {
      acc[claim.status] = (acc[claim.status] || 0) + 1
      return acc
    }, {})

    return {
      labels: Object.keys(statusCount),
      datasets: [
        {
          data: Object.values(statusCount),
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
  }, [])

  // Premium collection trend (simulated)
  const premiumTrendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const trendData = months.slice(0, currentMonth + 1).map((month, index) => ({
      month,
      amount: Math.floor(Math.random() * 10000) + 15000
    }))

    return {
      labels: trendData.map(d => d.month),
      datasets: [
        {
          label: 'Premium Collection ($)',
          data: trendData.map(d => d.amount),
          backgroundColor: 'rgba(13, 110, 253, 0.2)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    }
  }, [])

  // Customer acquisition trend
  const customerTrendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const trendData = months.map((month, index) => ({
      month,
      customers: Math.floor(Math.random() * 5) + 2
    }))

    return {
      labels: trendData.map(d => d.month),
      datasets: [
        {
          label: 'New Customers',
          data: trendData.map(d => d.customers),
          backgroundColor: 'rgba(25, 135, 84, 0.8)',
          borderColor: 'rgba(25, 135, 84, 1)',
          borderWidth: 2,
        },
      ],
    }
  }, [])

  // Dummy map data by region (counts)
  const regionCounts = [
    { region: 'North', claims: Math.floor(Math.random()*10)+5 },
    { region: 'South', claims: Math.floor(Math.random()*10)+5 },
    { region: 'East', claims: Math.floor(Math.random()*10)+5 },
    { region: 'West', claims: Math.floor(Math.random()*10)+5 },
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Reports & Analytics</h2>
        <div className="text-muted">
          Generate comprehensive reports and view analytics
        </div>
      </div>

      {/* Export Reports Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Policies Report</span>
              <div className="btn-group">
                <button className="btn btn-outline-primary btn-sm" onClick={exportPoliciesPDF}>📄 PDF</button>
                <button className="btn btn-outline-success btn-sm" onClick={exportPoliciesExcel}>📊 Excel</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={exportPoliciesCSV}>🧾 CSV</button>
              </div>
            </div>
            <div className="card-body">
              <div className="text-muted small mb-2">Export all policy data</div>
              <div className="d-flex justify-content-between">
                <span className="small">Total Policies:</span>
                <span className="fw-semibold">{policies.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small">Active Policies:</span>
                <span className="fw-semibold">{policies.filter(p => p.status === 'Active').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Claims Report</span>
            <div className="btn-group">
              <button className="btn btn-outline-primary btn-sm" onClick={exportClaimsPDF}>📄 PDF</button>
              <button className="btn btn-outline-success btn-sm" onClick={exportClaimsExcel}>📊 Excel</button>
              <button className="btn btn-outline-secondary btn-sm" onClick={exportClaimsCSV}>🧾 CSV</button>
            </div>
            </div>
            <div className="card-body">
              <div className="text-muted small mb-2">Export all claims data</div>
              <div className="d-flex justify-content-between">
                <span className="small">Total Claims:</span>
                <span className="fw-semibold">{claims.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small">Pending Claims:</span>
                <span className="fw-semibold">{claims.filter(c => c.status === 'Open').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Customers Report</span>
              <div className="btn-group">
                <button className="btn btn-outline-primary btn-sm" onClick={exportCustomersPDF}>📄 PDF</button>
                <button className="btn btn-outline-success btn-sm" onClick={exportCustomersExcel}>📊 Excel</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={exportCustomersCSV}>🧾 CSV</button>
              </div>
          </div>
          <div className="card-body">
              <div className="text-muted small mb-2">Export all customer data</div>
              <div className="d-flex justify-content-between">
                <span className="small">Total Customers:</span>
                <span className="fw-semibold">{customers.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small">Avg Policies/Customer:</span>
                <span className="fw-semibold">
                  {(policies.length / customers.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Policy Distribution by Type</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 300 }}>
                <Doughnut data={policyTypeData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Claims Status Overview</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 300 }}>
                <Doughnut data={claimsStatusData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Premium Collection Trend</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 300 }}>
                <Line data={premiumTrendData} options={lineChartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
        <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Customer Acquisition</h5>
            </div>
            <div className="card-body">
              <div style={{ height: 300 }}>
                <Bar data={customerTrendData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dummy Claims by Region */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Claims by Region (Dummy)</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {regionCounts.map(r => (
                  <div key={r.region} className="col-6 col-md-3">
                    <div className="p-3 border rounded text-center bg-light">
                      <div className="fw-semibold">{r.region}</div>
                      <div className="display-6 text-primary">{r.claims}</div>
                      <div className="text-muted small">claims</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Key Performance Indicators</h5>
          </div>
          <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-primary">
                      ${policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString()}
                    </div>
                    <div className="text-muted small">Total Premium Value</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-success">
                      {((claims.filter(c => c.status === 'Approved').length / claims.length) * 100).toFixed(1)}%
                    </div>
                    <div className="text-muted small">Claims Approval Rate</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-info">
                      ${(claims.reduce((sum, c) => sum + c.amount, 0) / claims.length).toFixed(0)}
                    </div>
                    <div className="text-muted small">Average Claim Amount</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-warning">
                      {policies.filter(p => p.status === 'Active').length}
                    </div>
                    <div className="text-muted small">Active Policies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


