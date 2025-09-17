import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import investments from '../data/investments.json'
import goals from '../data/goals.json'

Chart.register(ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6M')
  const [predictions, setPredictions] = useState({})
  const [riskMetrics, setRiskMetrics] = useState({})
  const [performanceInsights, setPerformanceInsights] = useState([])

  useEffect(() => {
    // Generate predictive analytics
    const totalValue = investments.reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
    const stockAllocation = investments.filter(inv => inv.asset === 'Stock').reduce((sum, inv) => sum + (inv.qty * inv.price), 0) / totalValue
    const bondAllocation = investments.filter(inv => inv.asset === 'Bond').reduce((sum, inv) => sum + (inv.qty * inv.price), 0) / totalValue
    
    // Simulate predictions
    const predictions = {
      nextMonth: totalValue * (1 + (Math.random() * 0.1 - 0.05)),
      nextQuarter: totalValue * (1 + (Math.random() * 0.2 - 0.1)),
      nextYear: totalValue * (1 + (Math.random() * 0.4 - 0.2)),
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    }
    setPredictions(predictions)

    // Calculate risk metrics
    const riskMetrics = {
      sharpeRatio: Math.random() * 2 + 0.5,
      beta: Math.random() * 1.5 + 0.5,
      volatility: Math.random() * 0.3 + 0.1,
      maxDrawdown: Math.random() * 0.2 + 0.05,
      var95: totalValue * (Math.random() * 0.1 + 0.02)
    }
    setRiskMetrics(riskMetrics)

    // Generate performance insights
    const insights = [
      {
        id: 1,
        type: 'success',
        title: 'Portfolio Optimization',
        description: 'Your current allocation shows optimal risk-return balance',
        score: 85,
        recommendation: 'Maintain current allocation'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Diversification Alert',
        description: `Stock allocation at ${Math.round(stockAllocation * 100)}% exceeds recommended 60%`,
        score: 65,
        recommendation: 'Consider increasing bond allocation'
      },
      {
        id: 3,
        type: 'info',
        title: 'Tax Optimization',
        description: 'Tax-loss harvesting opportunities identified',
        score: 78,
        recommendation: 'Review tax-efficient investments'
      },
      {
        id: 4,
        type: 'success',
        title: 'Goal Progress',
        description: 'On track to achieve 3 out of 5 financial goals',
        score: 82,
        recommendation: 'Continue current investment strategy'
      }
    ]
    setPerformanceInsights(insights)
  }, [selectedPeriod])

  const portfolioData = {
    labels: ['Stocks', 'Bonds', 'Cash', 'Alternatives', 'REITs'],
    datasets: [{
      data: [
        investments.filter(inv => inv.asset === 'Stock').reduce((sum, inv) => sum + (inv.qty * inv.price), 0),
        investments.filter(inv => inv.asset === 'Bond').reduce((sum, inv) => sum + (inv.qty * inv.price), 0),
        investments.filter(inv => inv.asset === 'Savings').reduce((sum, inv) => sum + (inv.qty * inv.price), 0),
        investments.filter(inv => inv.asset === 'Crypto').reduce((sum, inv) => sum + (inv.qty * inv.price), 0),
        investments.filter(inv => inv.asset === 'REIT').reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
      ].map(val => val || 0),
      backgroundColor: [
        'var(--cimb-red)',
        'var(--cimb-teal)',
        'var(--cimb-gold)',
        '#8B5CF6',
        '#F59E0B'
      ]
    }]
  }

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio',
        data: [100000, 102000, 105000, 103000, 108000, 112000],
        borderColor: 'var(--cimb-red)',
        backgroundColor: 'rgba(227, 24, 55, 0.1)',
        fill: true
      },
      {
        label: 'Benchmark',
        data: [100000, 101000, 102500, 101500, 104000, 106000],
        borderColor: 'var(--cimb-teal)',
        backgroundColor: 'rgba(47, 191, 113, 0.1)',
        fill: true
      }
    ]
  }

  const riskData = {
    labels: ['Sharpe Ratio', 'Beta', 'Volatility', 'Max Drawdown'],
    datasets: [{
      data: [
        riskMetrics.sharpeRatio || 0,
        riskMetrics.beta || 0,
        (riskMetrics.volatility || 0) * 100,
        (riskMetrics.maxDrawdown || 0) * 100
      ],
      backgroundColor: [
        'var(--cimb-teal)',
        'var(--cimb-gold)',
        'var(--cimb-red)',
        '#8B5CF6'
      ]
    }]
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

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--cimb-teal)'
    if (score >= 60) return 'var(--cimb-gold)'
    return 'var(--cimb-red)'
  }

  return (
    <div className="row g-3">
      {/* Analytics Header */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Advanced Analytics & Predictions</h5>
            <p className="text-muted mb-0">AI-powered insights and predictive modeling</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Analysis Period</label>
                <select 
                  className="form-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="1M">1 Month</option>
                  <option value="3M">3 Months</option>
                  <option value="6M">6 Months</option>
                  <option value="1Y">1 Year</option>
                </select>
              </div>
              <div className="col-md-9">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted">Prediction Confidence</div>
                    <div className="fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                      {Math.round(predictions.confidence * 100)}%
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">Last Updated</div>
                    <div className="small">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📈 Portfolio Predictions</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Next Month</div>
                    <div className="fw-bold financial-data">${predictions.nextMonth?.toLocaleString()}</div>
                  </div>
                  <div className="text-end">
                    <div className="small chart-positive">+2.3%</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Next Quarter</div>
                    <div className="fw-bold financial-data">${predictions.nextQuarter?.toLocaleString()}</div>
                  </div>
                  <div className="text-end">
                    <div className="small chart-positive">+5.7%</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Next Year</div>
                    <div className="fw-bold financial-data">${predictions.nextYear?.toLocaleString()}</div>
                  </div>
                  <div className="text-end">
                    <div className="small chart-positive">+12.4%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">⚖️ Risk Analysis</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {riskMetrics.sharpeRatio?.toFixed(2)}
                  </div>
                  <div className="text-muted small">Sharpe Ratio</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {riskMetrics.beta?.toFixed(2)}
                  </div>
                  <div className="text-muted small">Beta</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {(riskMetrics.volatility * 100)?.toFixed(1)}%
                  </div>
                  <div className="text-muted small">Volatility</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: '#8B5CF6' }}>
                    {(riskMetrics.maxDrawdown * 100)?.toFixed(1)}%
                  </div>
                  <div className="text-muted small">Max Drawdown</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance vs Benchmark */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Performance Analysis</h6>
          </div>
          <div className="card-body">
            <Line 
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return '$' + (value / 1000) + 'K'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Portfolio Allocation */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🥧 Asset Allocation</h6>
          </div>
          <div className="card-body">
            <Doughnut 
              data={portfolioData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Risk Metrics Chart */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Risk Metrics</h6>
          </div>
          <div className="card-body">
            <Bar 
              data={riskData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🤖 AI-Generated Insights</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {performanceInsights.map((insight, index) => (
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
                        <div className="fs-4">🤖</div>
                        <div className="text-end">
                          <div 
                            className="fw-bold fs-5"
                            style={{ color: getScoreColor(insight.score) }}
                          >
                            {insight.score}
                          </div>
                          <div className="small text-muted">Score</div>
                        </div>
                      </div>
                      <h6 className="card-title small">{insight.title}</h6>
                      <p className="card-text small text-muted">{insight.description}</p>
                      <div className="mt-2">
                        <small className="fw-semibold" style={{ color: getInsightColor(insight.type) }}>
                          💡 {insight.recommendation}
                        </small>
                      </div>
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
