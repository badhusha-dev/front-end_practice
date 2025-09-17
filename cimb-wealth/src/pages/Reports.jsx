import { Line, Pie, Bar } from 'react-chartjs-2'
import { Chart, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from '../store'
import investments from '../data/investments.json'
import growth from '../data/growth.json'
import { exportToPDF, exportToExcel } from '../utils/reportGenerator'

Chart.register(ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function Reports() {
  const allocation = Object.values(investments.reduce((acc, i) => {
    acc[i.asset] = acc[i.asset] || { label: i.asset, value: 0 }
    acc[i.asset].value += i.qty * i.price
    return acc
  }, {}))

  const pieData = {
    labels: allocation.map(a => a.label),
    datasets: [{ data: allocation.map(a => a.value), backgroundColor: ['#0d6efd','#198754','#6610f2','#ffc107','#dc3545'] }]
  }
  const lineData = {
    labels: growth.map(g => g.month),
    datasets: [{ label: 'Portfolio Value', data: growth.map(g => g.value), borderColor: '#0d6efd' }]
  }
  const benchmark = growth.map((g, idx) => ({ month: g.month, value: Math.round(growth[0].value * (1 + 0.008 * idx)) }))
  const comparisonData = {
    labels: growth.map(g => g.month),
    datasets: [
      { label: 'Portfolio', data: growth.map(g => g.value), borderColor: '#0d6efd', backgroundColor: 'rgba(13,110,253,0.1)' },
      { label: 'KLCI Index', data: benchmark.map(b => b.value), borderColor: '#dc3545', backgroundColor: 'rgba(220,53,69,0.1)' }
    ]
  }

  const dispatch = useDispatch()
  useEffect(() => {
    const lastPortfolio = growth[growth.length - 1].value
    const lastBenchmark = benchmark[benchmark.length - 1].value
    if (lastPortfolio < lastBenchmark) {
      dispatch(push({ type: 'warning', message: 'Portfolio underperformed KLCI this period. Consider rebalancing.' }))
    }
  }, [])
  const sectorData = {
    labels: [...new Set(investments.map(i => i.sector))],
    datasets: [{
      label: 'Exposure',
      data: [...new Set(investments.map(i => i.sector))].map(s => investments.filter(i => i.sector === s).reduce((s2,i)=>s2+i.qty*i.price,0)),
      backgroundColor: '#6610f2'
    }]
  }

  const exportPortfolioPDF = () => exportToPDF('Portfolio Report', ['asset','ticker','qty','price','sector'], investments)
  const exportPortfolioExcel = () => exportToExcel('Portfolio Report', ['asset','ticker','qty','price','sector'], investments)

  return (
    <div className="row g-3">
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">Asset Allocation</div>
          <div className="card-body"><Pie data={pieData} /></div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">Portfolio Growth</div>
          <div className="card-body"><Line data={lineData} /></div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">Sector Exposure
            <div className="btn-group">
              <button className="btn btn-outline-secondary btn-sm" onClick={exportPortfolioPDF}>PDF</button>
              <button className="btn btn-cimb-success btn-sm" onClick={exportPortfolioExcel}>Excel</button>
            </div>
          </div>
          <div className="card-body"><Bar data={sectorData} /></div>
        </div>
      </div>
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">Benchmark Comparison (Portfolio vs KLCI)</div>
          <div className="card-body"><Line data={comparisonData} /></div>
        </div>
      </div>
    </div>
  )
}


