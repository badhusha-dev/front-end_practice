import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Scatter } from 'react-chartjs-2'
import { Chart, LineElement, ScatterElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import investments from '../data/investments.json'

Chart.register(LineElement, ScatterElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function PortfolioOptimization() {
  const [optimizationResults, setOptimizationResults] = useState({})
  const [monteCarloSimulation, setMonteCarloSimulation] = useState({})
  const [efficientFrontier, setEfficientFrontier] = useState({})
  const [scenarioAnalysis, setScenarioAnalysis] = useState([])
  const [rebalancingSuggestions, setRebalancingSuggestions] = useState([])

  useEffect(() => {
    // Generate optimization results
    const optimizationResults = {
      currentPortfolio: {
        expectedReturn: 8.5,
        volatility: 12.3,
        sharpeRatio: 0.69,
        maxDrawdown: 15.2,
        var95: 8.5,
        cvar95: 12.1
      },
      optimizedPortfolio: {
        expectedReturn: 9.2,
        volatility: 11.8,
        sharpeRatio: 0.78,
        maxDrawdown: 13.5,
        var95: 7.8,
        cvar95: 10.9
      },
      improvement: {
        returnIncrease: 0.7,
        volatilityReduction: 0.5,
        sharpeImprovement: 0.09,
        drawdownReduction: 1.7
      },
      allocation: {
        current: {
          stocks: 75,
          bonds: 15,
          cash: 5,
          alternatives: 5
        },
        optimized: {
          stocks: 65,
          bonds: 25,
          cash: 5,
          alternatives: 5
        }
      }
    }
    setOptimizationResults(optimizationResults)

    // Generate Monte Carlo simulation
    const monteCarloSimulation = {
      simulations: 10000,
      timeHorizon: 20,
      confidenceLevels: {
        p5: 125000,
        p25: 180000,
        p50: 250000,
        p75: 350000,
        p95: 520000
      },
      probabilityOfGoal: 78,
      worstCaseScenario: 95000,
      bestCaseScenario: 750000,
      medianOutcome: 250000
    }
    setMonteCarloSimulation(monteCarloSimulation)

    // Generate efficient frontier data
    const efficientFrontier = {
      portfolios: [
        { return: 5.2, risk: 8.1, sharpe: 0.64 },
        { return: 6.8, risk: 9.5, sharpe: 0.72 },
        { return: 8.1, risk: 11.2, sharpe: 0.72 },
        { return: 9.2, risk: 11.8, sharpe: 0.78 },
        { return: 10.5, risk: 13.1, sharpe: 0.80 },
        { return: 11.8, risk: 14.9, sharpe: 0.79 },
        { return: 13.2, risk: 17.2, sharpe: 0.77 },
        { return: 14.5, risk: 19.8, sharpe: 0.73 }
      ],
      currentPortfolio: { return: 8.5, risk: 12.3 },
      optimizedPortfolio: { return: 9.2, risk: 11.8 }
    }
    setEfficientFrontier(efficientFrontier)

    // Generate scenario analysis
    const scenarioAnalysis = [
      {
        scenario: 'Bull Market',
        probability: 25,
        expectedReturn: 15.2,
        volatility: 18.5,
        description: 'Strong economic growth, low inflation',
        impact: 'High positive returns across all asset classes'
      },
      {
        scenario: 'Base Case',
        probability: 50,
        expectedReturn: 8.5,
        volatility: 12.3,
        description: 'Moderate growth, stable inflation',
        impact: 'Balanced returns with moderate volatility'
      },
      {
        scenario: 'Bear Market',
        probability: 15,
        expectedReturn: -5.8,
        volatility: 22.1,
        description: 'Economic recession, high inflation',
        impact: 'Negative returns, high volatility'
      },
      {
        scenario: 'Stagflation',
        probability: 10,
        expectedReturn: 2.1,
        volatility: 16.8,
        description: 'Low growth, high inflation',
        impact: 'Low returns with elevated volatility'
      }
    ]
    setScenarioAnalysis(scenarioAnalysis)

    // Generate rebalancing suggestions
    const rebalancingSuggestions = [
      {
        asset: 'Technology Stocks',
        currentWeight: 35,
        targetWeight: 25,
        action: 'Reduce',
        amount: 10,
        reason: 'Overweight position, reduce concentration risk',
        priority: 'High'
      },
      {
        asset: 'Government Bonds',
        currentWeight: 8,
        targetWeight: 15,
        action: 'Increase',
        amount: 7,
        reason: 'Increase defensive allocation for stability',
        priority: 'High'
      },
      {
        asset: 'International Equity',
        currentWeight: 12,
        targetWeight: 20,
        action: 'Increase',
        amount: 8,
        reason: 'Improve geographic diversification',
        priority: 'Medium'
      },
      {
        asset: 'REITs',
        currentWeight: 3,
        targetWeight: 8,
        action: 'Increase',
        amount: 5,
        reason: 'Add real estate exposure for diversification',
        priority: 'Medium'
      },
      {
        asset: 'Cash',
        currentWeight: 5,
        targetWeight: 5,
        action: 'Maintain',
        amount: 0,
        reason: 'Adequate liquidity buffer',
        priority: 'Low'
      }
    ]
    setRebalancingSuggestions(rebalancingSuggestions)
  }, [])

  const efficientFrontierData = {
    datasets: [
      {
        label: 'Efficient Frontier',
        data: efficientFrontier.portfolios?.map(p => ({ x: p.risk, y: p.return })) || [],
        borderColor: 'var(--cimb-teal)',
        backgroundColor: 'rgba(47, 191, 113, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'var(--cimb-teal)'
      },
      {
        label: 'Current Portfolio',
        data: efficientFrontier.currentPortfolio ? [{ x: efficientFrontier.currentPortfolio.risk, y: efficientFrontier.currentPortfolio.return }] : [],
        borderColor: 'var(--cimb-red)',
        backgroundColor: 'var(--cimb-red)',
        pointRadius: 8,
        pointStyle: 'triangle'
      },
      {
        label: 'Optimized Portfolio',
        data: efficientFrontier.optimizedPortfolio ? [{ x: efficientFrontier.optimizedPortfolio.risk, y: efficientFrontier.optimizedPortfolio.return }] : [],
        borderColor: 'var(--cimb-gold)',
        backgroundColor: 'var(--cimb-gold)',
        pointRadius: 8,
        pointStyle: 'rect'
      }
    ]
  }

  const monteCarloData = {
    labels: ['5th Percentile', '25th Percentile', '50th Percentile', '75th Percentile', '95th Percentile'],
    datasets: [{
      label: 'Portfolio Value Distribution',
      data: [
        monteCarloSimulation.confidenceLevels?.p5 || 0,
        monteCarloSimulation.confidenceLevels?.p25 || 0,
        monteCarloSimulation.confidenceLevels?.p50 || 0,
        monteCarloSimulation.confidenceLevels?.p75 || 0,
        monteCarloSimulation.confidenceLevels?.p95 || 0
      ],
      backgroundColor: [
        'rgba(227, 24, 55, 0.8)',
        'rgba(244, 197, 66, 0.8)',
        'rgba(47, 191, 113, 0.8)',
        'rgba(244, 197, 66, 0.8)',
        'rgba(227, 24, 55, 0.8)'
      ],
      borderColor: [
        'var(--cimb-red)',
        'var(--cimb-gold)',
        'var(--cimb-teal)',
        'var(--cimb-gold)',
        'var(--cimb-red)'
      ],
      borderWidth: 2
    }]
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'var(--cimb-red)'
      case 'Medium': return 'var(--cimb-gold)'
      case 'Low': return 'var(--cimb-teal)'
      default: return 'var(--cimb-red)'
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'Increase': return 'var(--cimb-teal)'
      case 'Reduce': return 'var(--cimb-red)'
      case 'Maintain': return 'var(--cimb-gold)'
      default: return 'var(--cimb-red)'
    }
  }

  return (
    <div className="row g-3">
      {/* Optimization Overview */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">🎯 Advanced Portfolio Optimization</h5>
            <p className="text-muted mb-0">Monte Carlo simulation and efficient frontier analysis</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {optimizationResults.improvement?.returnIncrease}%
                  </div>
                  <div className="text-muted">Return Improvement</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {optimizationResults.improvement?.volatilityReduction}%
                  </div>
                  <div className="text-muted">Risk Reduction</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {optimizationResults.improvement?.sharpeImprovement}
                  </div>
                  <div className="text-muted">Sharpe Improvement</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {monteCarloSimulation.probabilityOfGoal}%
                  </div>
                  <div className="text-muted">Goal Probability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efficient Frontier */}
      <div className="col-lg-8">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📈 Efficient Frontier Analysis</h6>
          </div>
          <div className="card-body">
            <Scatter 
              data={efficientFrontierData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Risk (Volatility %)'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Expected Return (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Portfolio Comparison */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Portfolio Comparison</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <h6 className="small text-muted">Current Portfolio</h6>
                <div className="d-flex justify-content-between">
                  <span className="small">Expected Return:</span>
                  <span className="fw-bold small">{optimizationResults.currentPortfolio?.expectedReturn}%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Volatility:</span>
                  <span className="fw-bold small">{optimizationResults.currentPortfolio?.volatility}%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Sharpe Ratio:</span>
                  <span className="fw-bold small">{optimizationResults.currentPortfolio?.sharpeRatio}</span>
                </div>
              </div>
              <div className="col-12">
                <h6 className="small text-muted">Optimized Portfolio</h6>
                <div className="d-flex justify-content-between">
                  <span className="small">Expected Return:</span>
                  <span className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                    {optimizationResults.optimizedPortfolio?.expectedReturn}%
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Volatility:</span>
                  <span className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                    {optimizationResults.optimizedPortfolio?.volatility}%
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Sharpe Ratio:</span>
                  <span className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                    {optimizationResults.optimizedPortfolio?.sharpeRatio}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monte Carlo Simulation */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎲 Monte Carlo Simulation (20 Years)</h6>
          </div>
          <div className="card-body">
            <Line 
              data={monteCarloData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'Portfolio Value ($)'
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + (value / 1000) + 'K'
                      }
                    }
                  }
                }
              }}
            />
            <div className="row g-2 mt-3">
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    ${monteCarloSimulation.worstCaseScenario?.toLocaleString()}
                  </div>
                  <div className="text-muted small">Worst Case</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    ${monteCarloSimulation.bestCaseScenario?.toLocaleString()}
                  </div>
                  <div className="text-muted small">Best Case</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🌍 Scenario Analysis</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {scenarioAnalysis.map((scenario, index) => (
                <motion.div
                  key={scenario.scenario}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title mb-1 small">{scenario.scenario}</h6>
                        <p className="card-text small text-muted mb-1">{scenario.description}</p>
                        <small className="text-muted">{scenario.impact}</small>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold small" style={{ color: scenario.expectedReturn >= 0 ? 'var(--cimb-teal)' : 'var(--cimb-red)' }}>
                          {scenario.expectedReturn >= 0 ? '+' : ''}{scenario.expectedReturn}%
                        </div>
                        <div className="small text-muted">{scenario.probability}%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rebalancing Suggestions */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">⚖️ Rebalancing Recommendations</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Current Weight</th>
                    <th>Target Weight</th>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Priority</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {rebalancingSuggestions.map((suggestion, index) => (
                    <motion.tr
                      key={suggestion.asset}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-semibold">{suggestion.asset}</td>
                      <td className="financial-data">{suggestion.currentWeight}%</td>
                      <td className="financial-data">{suggestion.targetWeight}%</td>
                      <td>
                        <span 
                          className="badge fw-bold"
                          style={{ backgroundColor: getActionColor(suggestion.action) }}
                        >
                          {suggestion.action}
                        </span>
                      </td>
                      <td className="financial-data">{suggestion.amount}%</td>
                      <td>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getPriorityColor(suggestion.priority) }}
                        >
                          {suggestion.priority}
                        </span>
                      </td>
                      <td className="small text-muted">{suggestion.reason}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
