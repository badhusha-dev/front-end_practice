import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Radar, Bar } from 'react-chartjs-2'
import { Chart, RadialLinearScale, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import investments from '../data/investments.json'

Chart.register(RadialLinearScale, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function ESGScoring() {
  const [esgScores, setEsgScores] = useState([])
  const [portfolioESG, setPortfolioESG] = useState({})
  const [esgTrends, setEsgTrends] = useState({})
  const [sustainabilityMetrics, setSustainabilityMetrics] = useState({})
  const [esgInsights, setEsgInsights] = useState([])
  const [impactInvesting, setImpactInvesting] = useState([])

  useEffect(() => {
    // Generate ESG scores for investments
    const esgScores = investments.map(inv => ({
      ...inv,
      esgScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
      environmentalScore: Math.floor(Math.random() * 30) + 70,
      socialScore: Math.floor(Math.random() * 30) + 70,
      governanceScore: Math.floor(Math.random() * 30) + 70,
      controversies: Math.floor(Math.random() * 3),
      carbonFootprint: Math.floor(Math.random() * 50) + 10,
      diversityScore: Math.floor(Math.random() * 40) + 60,
      boardIndependence: Math.floor(Math.random() * 30) + 70,
      executiveCompensation: Math.floor(Math.random() * 30) + 70,
      esgRating: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B'][Math.floor(Math.random() * 6)],
      esgRisk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    }))
    setEsgScores(esgScores)

    // Generate portfolio ESG metrics
    const portfolioESG = {
      overallScore: 78,
      environmentalScore: 82,
      socialScore: 75,
      governanceScore: 77,
      averageESGScore: esgScores.reduce((sum, inv) => sum + inv.esgScore, 0) / esgScores.length,
      carbonIntensity: 245, // tons CO2 per $1M invested
      fossilFuelExposure: 12.5, // percentage
      renewableEnergyExposure: 18.3, // percentage
      diversityScore: 72,
      controversies: esgScores.reduce((sum, inv) => sum + inv.controversies, 0),
      esgLeaders: esgScores.filter(inv => inv.esgScore >= 80).length,
      esgLaggards: esgScores.filter(inv => inv.esgScore < 60).length
    }
    setPortfolioESG(portfolioESG)

    // Generate ESG trends
    const esgTrends = {
      yearOverYearChange: 5.2,
      sectorPerformance: {
        'Technology': { esgScore: 85, trend: 'Improving' },
        'Healthcare': { esgScore: 78, trend: 'Stable' },
        'Financials': { esgScore: 72, trend: 'Improving' },
        'Energy': { esgScore: 65, trend: 'Declining' },
        'Consumer': { esgScore: 70, trend: 'Stable' }
      },
      emergingThemes: [
        { theme: 'Climate Change', impact: 'High', momentum: 'Strong' },
        { theme: 'Social Justice', impact: 'Medium', momentum: 'Growing' },
        { theme: 'Data Privacy', impact: 'High', momentum: 'Strong' },
        { theme: 'Workplace Diversity', impact: 'Medium', momentum: 'Growing' }
      ]
    }
    setEsgTrends(esgTrends)

    // Generate sustainability metrics
    const sustainabilityMetrics = {
      carbonFootprint: {
        portfolio: 245,
        benchmark: 320,
        reduction: 23.4
      },
      waterUsage: {
        portfolio: 1200,
        benchmark: 1500,
        reduction: 20.0
      },
      wasteReduction: {
        portfolio: 85,
        benchmark: 70,
        improvement: 21.4
      },
      renewableEnergy: {
        portfolio: 18.3,
        benchmark: 12.5,
        improvement: 46.4
      },
      socialImpact: {
        jobsCreated: 1250,
        communityInvestment: 2.5,
        employeeSatisfaction: 78
      }
    }
    setSustainabilityMetrics(sustainabilityMetrics)

    // Generate ESG insights
    const esgInsights = [
      {
        id: 1,
        type: 'opportunity',
        title: 'ESG Outperformance',
        description: 'ESG-focused investments outperforming traditional peers by 2.3% annually',
        confidence: 87,
        impact: 'High',
        recommendation: 'Increase ESG allocation to 40%'
      },
      {
        id: 2,
        type: 'risk',
        title: 'Climate Risk Exposure',
        description: 'Portfolio exposed to high climate risk sectors',
        confidence: 76,
        impact: 'Medium',
        recommendation: 'Reduce fossil fuel exposure'
      },
      {
        id: 3,
        type: 'opportunity',
        title: 'Renewable Energy Growth',
        description: 'Renewable energy sector showing strong growth potential',
        confidence: 82,
        impact: 'High',
        recommendation: 'Increase clean energy allocation'
      },
      {
        id: 4,
        type: 'compliance',
        title: 'Regulatory Compliance',
        description: 'New ESG disclosure requirements coming into effect',
        confidence: 95,
        impact: 'Medium',
        recommendation: 'Prepare for enhanced reporting'
      }
    ]
    setEsgInsights(esgInsights)

    // Generate impact investing opportunities
    const impactInvesting = [
      {
        id: 1,
        name: 'Green Bonds',
        category: 'Environmental',
        impact: 'Climate Action',
        expectedReturn: 4.5,
        risk: 'Low',
        minimumInvestment: 10000,
        description: 'Bonds financing renewable energy projects'
      },
      {
        id: 2,
        name: 'Social Impact Bonds',
        category: 'Social',
        impact: 'Education',
        expectedReturn: 6.2,
        risk: 'Medium',
        minimumInvestment: 25000,
        description: 'Bonds funding educational initiatives'
      },
      {
        id: 3,
        name: 'ESG ETFs',
        category: 'Governance',
        impact: 'Corporate Governance',
        expectedReturn: 8.1,
        risk: 'Medium',
        minimumInvestment: 1000,
        description: 'Diversified ESG-focused exchange-traded funds'
      },
      {
        id: 4,
        name: 'Microfinance Funds',
        category: 'Social',
        impact: 'Financial Inclusion',
        expectedReturn: 7.8,
        risk: 'High',
        minimumInvestment: 50000,
        description: 'Funds providing financial services to underserved communities'
      }
    ]
    setImpactInvesting(impactInvesting)
  }, [])

  const esgRadarData = {
    labels: ['Environmental', 'Social', 'Governance', 'Carbon Footprint', 'Diversity', 'Transparency'],
    datasets: [
      {
        label: 'Portfolio ESG Score',
        data: [
          portfolioESG.environmentalScore || 0,
          portfolioESG.socialScore || 0,
          portfolioESG.governanceScore || 0,
          100 - ((portfolioESG.carbonIntensity || 0) / 5), // Convert to 0-100 scale
          portfolioESG.diversityScore || 0,
          85 // Transparency score
        ],
        backgroundColor: 'rgba(47, 191, 113, 0.2)',
        borderColor: 'var(--cimb-teal)',
        pointBackgroundColor: 'var(--cimb-teal)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'var(--cimb-teal)'
      },
      {
        label: 'Industry Average',
        data: [75, 70, 72, 70, 65, 75],
        backgroundColor: 'rgba(227, 24, 55, 0.2)',
        borderColor: 'var(--cimb-red)',
        pointBackgroundColor: 'var(--cimb-red)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'var(--cimb-red)'
      }
    ]
  }

  const sustainabilityData = {
    labels: ['Carbon Footprint', 'Water Usage', 'Waste Reduction', 'Renewable Energy'],
    datasets: [
      {
        label: 'Portfolio',
        data: [
          sustainabilityMetrics.carbonFootprint?.portfolio || 0,
          sustainabilityMetrics.waterUsage?.portfolio || 0,
          sustainabilityMetrics.wasteReduction?.portfolio || 0,
          sustainabilityMetrics.renewableEnergy?.portfolio || 0
        ],
        backgroundColor: 'var(--cimb-teal)',
        borderColor: 'var(--cimb-teal)',
        borderWidth: 1
      },
      {
        label: 'Benchmark',
        data: [
          sustainabilityMetrics.carbonFootprint?.benchmark || 0,
          sustainabilityMetrics.waterUsage?.benchmark || 0,
          sustainabilityMetrics.wasteReduction?.benchmark || 0,
          sustainabilityMetrics.renewableEnergy?.benchmark || 0
        ],
        backgroundColor: 'var(--cimb-red)',
        borderColor: 'var(--cimb-red)',
        borderWidth: 1
      }
    ]
  }

  const getESGRatingColor = (rating) => {
    switch (rating) {
      case 'AAA': return 'var(--cimb-teal)'
      case 'AA': return 'var(--cimb-teal)'
      case 'A': return 'var(--cimb-gold)'
      case 'BBB': return 'var(--cimb-gold)'
      case 'BB': return 'var(--cimb-red)'
      case 'B': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getESGRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'var(--cimb-teal)'
      case 'Medium': return 'var(--cimb-gold)'
      case 'High': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getInsightColor = (type) => {
    switch (type) {
      case 'opportunity': return 'var(--cimb-teal)'
      case 'risk': return 'var(--cimb-red)'
      case 'compliance': return 'var(--cimb-gold)'
      default: return 'var(--cimb-red)'
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return '🚀'
      case 'risk': return '⚠️'
      case 'compliance': return '📋'
      default: return '📊'
    }
  }

  return (
    <div className="row g-3">
      {/* ESG Overview */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">🌱 ESG & Sustainability Scoring</h5>
            <p className="text-muted mb-0">Environmental, Social, and Governance impact analysis</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {portfolioESG.overallScore}
                  </div>
                  <div className="text-muted">Overall ESG Score</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {portfolioESG.esgLeaders}
                  </div>
                  <div className="text-muted">ESG Leaders</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {portfolioESG.carbonIntensity}
                  </div>
                  <div className="text-muted">Carbon Intensity</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {portfolioESG.renewableEnergyExposure}%
                  </div>
                  <div className="text-muted">Renewable Energy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ESG Radar Chart */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 ESG Performance Radar</h6>
          </div>
          <div className="card-body">
            <Radar 
              data={esgRadarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Sustainability Metrics */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🌍 Sustainability Metrics</h6>
          </div>
          <div className="card-body">
            <Bar 
              data={sustainabilityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
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

      {/* ESG Investment Scores */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📈 ESG Investment Scores</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Investment</th>
                    <th>ESG Score</th>
                    <th>Environmental</th>
                    <th>Social</th>
                    <th>Governance</th>
                    <th>ESG Rating</th>
                    <th>Risk Level</th>
                    <th>Carbon Footprint</th>
                  </tr>
                </thead>
                <tbody>
                  {esgScores.map((investment, index) => (
                    <motion.tr
                      key={investment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-semibold">{investment.ticker}</td>
                      <td className="financial-data">
                        <div className="d-flex align-items-center">
                          <div className="progress me-2" style={{ width: '60px', height: '8px' }}>
                            <div 
                              className="progress-bar"
                              style={{ 
                                width: `${investment.esgScore}%`,
                                backgroundColor: investment.esgScore >= 80 ? 'var(--cimb-teal)' : 
                                               investment.esgScore >= 60 ? 'var(--cimb-gold)' : 'var(--cimb-red)'
                              }}
                            />
                          </div>
                          <span className="small">{investment.esgScore}</span>
                        </div>
                      </td>
                      <td className="financial-data">{investment.environmentalScore}</td>
                      <td className="financial-data">{investment.socialScore}</td>
                      <td className="financial-data">{investment.governanceScore}</td>
                      <td>
                        <span 
                          className="badge fw-bold"
                          style={{ backgroundColor: getESGRatingColor(investment.esgRating) }}
                        >
                          {investment.esgRating}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getESGRiskColor(investment.esgRisk) }}
                        >
                          {investment.esgRisk}
                        </span>
                      </td>
                      <td className="financial-data">{investment.carbonFootprint}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ESG Insights */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">💡 ESG Insights & Recommendations</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {esgInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: `4px solid ${getInsightColor(insight.type)}`
                  }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="card-title mb-1 small">{insight.title}</h6>
                        <p className="card-text small text-muted mb-1">{insight.description}</p>
                        <small className="fw-semibold" style={{ color: getInsightColor(insight.type) }}>
                          💡 {insight.recommendation}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="fs-4">{getInsightIcon(insight.type)}</div>
                        <div 
                          className="fw-bold small"
                          style={{ color: getInsightColor(insight.type) }}
                        >
                          {insight.confidence}%
                        </div>
                        <div className="small text-muted">Confidence</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Investing Opportunities */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎯 Impact Investing Opportunities</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {impactInvesting.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="card-title mb-1 small">{opportunity.name}</h6>
                        <p className="card-text small text-muted mb-1">{opportunity.description}</p>
                        <div className="d-flex gap-2">
                          <span className="badge bg-primary small">{opportunity.category}</span>
                          <span className="badge bg-success small">{opportunity.impact}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                          {opportunity.expectedReturn}%
                        </div>
                        <div className="small text-muted">Expected Return</div>
                        <div className="small text-muted">Min: ${opportunity.minimumInvestment.toLocaleString()}</div>
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
