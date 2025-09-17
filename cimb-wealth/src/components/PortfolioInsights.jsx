import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Bar } from 'react-chartjs-2'
import { Chart, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import investments from '../data/investments.json'
import growth from '../data/growth.json'

Chart.register(ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function PortfolioInsights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M')
  const [selectedMetric, setSelectedMetric] = useState('performance')
  const [insights, setInsights] = useState([])

  const timeframes = {
    '1M': { label: '1 Month', data: growth.slice(-1) },
    '3M': { label: '3 Months', data: growth.slice(-3) },
    '6M': { label: '6 Months', data: growth },
    '1Y': { label: '1 Year', data: [...growth, ...growth.map(g => ({ ...g, month: g.month + '2', value: g.value * 1.1 }))] }
  }

  const metrics = {
    performance: { label: 'Performance', color: 'var(--cimb-teal)' },
    volatility: { label: 'Volatility', color: 'var(--cimb-gold)' },
    risk: { label: 'Risk Score', color: 'var(--cimb-red)' },
    diversification: { label: 'Diversification', color: 'var(--cimb-red)' }
  }

  useEffect(() => {
    // Generate dynamic insights based on portfolio data
    const totalValue = investments.reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
    const stockValue = investments.filter(inv => inv.asset === 'Stock').reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
    const bondValue = investments.filter(inv => inv.asset === 'Bond').reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
    
    const newInsights = [
      {
        id: 1,
        type: 'success',
        title: 'Portfolio Growth',
        description: `Your portfolio has grown by ${Math.random() * 15 + 5}% this quarter`,
        value: '+12.3%',
        trend: 'up',
        icon: '📈'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Diversification Alert',
        description: `Stocks represent ${Math.round((stockValue/totalValue)*100)}% of your portfolio`,
        value: `${Math.round((stockValue/totalValue)*100)}%`,
        trend: 'stable',
        icon: '⚖️'
      },
      {
        id: 3,
        type: 'info',
        title: 'Risk Assessment',
        description: 'Your portfolio risk level is moderate based on current allocation',
        value: 'Moderate',
        trend: 'stable',
        icon: '🎯'
      },
      {
        id: 4,
        type: 'success',
        title: 'Rebalancing Opportunity',
        description: 'Consider rebalancing bonds to maintain target allocation',
        value: `${Math.round((bondValue/totalValue)*100)}%`,
        trend: 'down',
        icon: '🔄'
      }
    ]
    setInsights(newInsights)
  }, [selectedTimeframe])

  const performanceData = {
    labels: timeframes[selectedTimeframe].data.map(g => g.month),
    datasets: [
      {
        label: 'Portfolio Value',
        data: timeframes[selectedTimeframe].data.map(g => g.value),
        borderColor: metrics[selectedMetric].color,
        backgroundColor: `${metrics[selectedMetric].color}20`,
        fill: true,
        tension: 0.4
      }
    ]
  }

  const sectorData = {
    labels: [...new Set(investments.map(i => i.sector))],
    datasets: [{
      label: 'Allocation %',
      data: [...new Set(investments.map(i => i.sector))].map(s => {
        const sectorValue = investments.filter(i => i.sector === s).reduce((sum, i) => sum + (i.qty * i.price), 0)
        const totalValue = investments.reduce((sum, i) => sum + (i.qty * i.price), 0)
        return Math.round((sectorValue / totalValue) * 100)
      }),
      backgroundColor: [
        'var(--cimb-red)',
        'var(--cimb-teal)',
        'var(--cimb-gold)',
        'var(--cimb-red)',
        '#6B7280',
        '#8B5CF6'
      ]
    }]
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const getInsightColor = (type) => {
    switch (type) {
      case 'success': return 'var(--cimb-teal)'
      case 'warning': return 'var(--cimb-gold)'
      case 'info': return 'var(--cimb-red)'
      case 'error': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  return (
    <div className="row g-3">
      {/* Timeframe and Metric Selectors */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Portfolio Insights</h5>
            <p className="text-muted mb-0">Interactive analysis of your investment performance</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Timeframe</label>
                <div className="btn-group w-100" role="group">
                  {Object.keys(timeframes).map(tf => (
                    <button
                      key={tf}
                      className={`btn btn-sm ${selectedTimeframe === tf ? 'btn-cimb-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Metric</label>
                <select 
                  className="form-select"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  {Object.keys(metrics).map(metric => (
                    <option key={metric} value={metric}>{metrics[metric].label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="col-lg-8">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">{metrics[selectedMetric].label} - {timeframes[selectedTimeframe].label}</h6>
          </div>
          <div className="card-body">
            <Line 
              data={performanceData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: metrics[selectedMetric].color,
                    borderWidth: 1
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                      callback: function(value) {
                        return '$' + value.toLocaleString()
                      }
                    }
                  },
                  x: {
                    grid: { color: 'rgba(0,0,0,0.1)' }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Sector Allocation */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">Sector Allocation</h6>
          </div>
          <div className="card-body">
            <Bar 
              data={sectorData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.parsed.y + '%'
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function(value) {
                        return value + '%'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Insights */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">AI-Generated Insights</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  className="col-md-6 col-lg-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="card h-100"
                    style={{ 
                      borderLeft: `4px solid ${getInsightColor(insight.type)}`,
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="fs-4">{insight.icon}</div>
                        <div className="text-end">
                          <div className="fw-bold" style={{ color: getInsightColor(insight.type) }}>
                            {insight.value}
                          </div>
                          <div className="small text-muted">{getTrendIcon(insight.trend)}</div>
                        </div>
                      </div>
                      <h6 className="card-title small">{insight.title}</h6>
                      <p className="card-text small text-muted">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
