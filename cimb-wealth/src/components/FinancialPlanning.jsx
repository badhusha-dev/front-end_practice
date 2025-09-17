import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

Chart.register(LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function FinancialPlanning() {
  const [retirementPlan, setRetirementPlan] = useState({})
  const [educationFund, setEducationFund] = useState({})
  const [emergencyFund, setEmergencyFund] = useState({})
  const [homePurchase, setHomePurchase] = useState({})
  const [insuranceAnalysis, setInsuranceAnalysis] = useState({})
  const [taxOptimization, setTaxOptimization] = useState({})
  const [lifeEvents, setLifeEvents] = useState([])
  const [planningGoals, setPlanningGoals] = useState([])

  useEffect(() => {
    // Generate retirement plan
    const retirementPlan = {
      currentAge: 35,
      retirementAge: 65,
      yearsToRetirement: 30,
      currentSavings: 150000,
      monthlyContribution: 2000,
      annualReturn: 7.5,
      inflationRate: 3.0,
      retirementIncome: 8000,
      projectedSavings: 2500000,
      shortfall: 0,
      recommendations: [
        'Increase monthly contribution by $500',
        'Consider catch-up contributions after age 50',
        'Diversify into international markets',
        'Review asset allocation annually'
      ],
      milestones: [
        { age: 40, target: 500000, projected: 520000 },
        { age: 50, target: 1200000, projected: 1250000 },
        { age: 60, target: 2000000, projected: 2100000 },
        { age: 65, target: 2500000, projected: 2500000 }
      ]
    }
    setRetirementPlan(retirementPlan)

    // Generate education fund
    const educationFund = {
      childAge: 8,
      collegeAge: 18,
      yearsToCollege: 10,
      currentSavings: 25000,
      monthlyContribution: 500,
      annualReturn: 6.0,
      collegeCost: 50000,
      projectedSavings: 95000,
      shortfall: 0,
      recommendations: [
        'Consider 529 education savings plan',
        'Increase monthly contribution by $200',
        'Explore scholarship opportunities',
        'Consider community college for first two years'
      ]
    }
    setEducationFund(educationFund)

    // Generate emergency fund
    const emergencyFund = {
      monthlyExpenses: 5000,
      recommendedAmount: 30000,
      currentAmount: 15000,
      shortfall: 15000,
      monthsCovered: 3,
      targetMonths: 6,
      recommendations: [
        'Build emergency fund to 6 months expenses',
        'Consider high-yield savings account',
        'Automate monthly contributions',
        'Review and adjust annually'
      ]
    }
    setEmergencyFund(emergencyFund)

    // Generate home purchase plan
    const homePurchase = {
      targetPrice: 500000,
      downPayment: 100000,
      currentSavings: 45000,
      shortfall: 55000,
      monthlyContribution: 1500,
      monthsToGoal: 37,
      annualReturn: 4.0,
      recommendations: [
        'Consider first-time homebuyer programs',
        'Explore down payment assistance',
        'Improve credit score for better rates',
        'Consider starter home vs dream home'
      ]
    }
    setHomePurchase(homePurchase)

    // Generate insurance analysis
    const insuranceAnalysis = {
      lifeInsurance: {
        current: 500000,
        recommended: 1000000,
        shortfall: 500000,
        monthlyCost: 45,
        type: 'Term Life'
      },
      disabilityInsurance: {
        current: 3000,
        recommended: 4000,
        shortfall: 1000,
        monthlyCost: 25,
        type: 'Long-term Disability'
      },
      healthInsurance: {
        current: 'Employer Plan',
        deductible: 2000,
        outOfPocketMax: 5000,
        monthlyCost: 200,
        coverage: 'Good'
      },
      recommendations: [
        'Increase life insurance coverage',
        'Consider umbrella liability policy',
        'Review disability insurance coverage',
        'Compare health insurance options annually'
      ]
    }
    setInsuranceAnalysis(insuranceAnalysis)

    // Generate tax optimization
    const taxOptimization = {
      currentTaxRate: 24,
      projectedTaxSavings: 8500,
      strategies: [
        {
          strategy: '401(k) Contributions',
          savings: 3200,
          description: 'Maximize employer match and contribute up to limit'
        },
        {
          strategy: 'IRA Contributions',
          savings: 1800,
          description: 'Traditional IRA for tax deduction'
        },
        {
          strategy: 'HSA Contributions',
          savings: 1200,
          description: 'Health Savings Account triple tax advantage'
        },
        {
          strategy: 'Tax-Loss Harvesting',
          savings: 1500,
          description: 'Offset gains with realized losses'
        },
        {
          strategy: 'Charitable Giving',
          savings: 800,
          description: 'Donate appreciated securities'
        }
      ],
      recommendations: [
        'Maximize tax-advantaged accounts',
        'Consider Roth vs Traditional IRA',
        'Implement tax-loss harvesting',
        'Plan charitable giving strategically'
      ]
    }
    setTaxOptimization(taxOptimization)

    // Generate life events
    const lifeEvents = [
      {
        id: 1,
        event: 'Marriage',
        age: 28,
        cost: 25000,
        status: 'Completed',
        impact: 'Positive - Combined income and expenses'
      },
      {
        id: 2,
        event: 'First Child',
        age: 30,
        cost: 15000,
        status: 'Completed',
        impact: 'Increased expenses, need for life insurance'
      },
      {
        id: 3,
        event: 'Home Purchase',
        age: 32,
        cost: 500000,
        status: 'Completed',
        impact: 'Major asset, mortgage payment'
      },
      {
        id: 4,
        event: 'Second Child',
        age: 35,
        cost: 12000,
        status: 'Completed',
        impact: 'Increased childcare costs'
      },
      {
        id: 5,
        event: 'College Education',
        age: 50,
        cost: 200000,
        status: 'Planned',
        impact: 'Major expense, need for education fund'
      },
      {
        id: 6,
        event: 'Retirement',
        age: 65,
        cost: 0,
        status: 'Planned',
        impact: 'Income replacement needed'
      }
    ]
    setLifeEvents(lifeEvents)

    // Generate planning goals
    const planningGoals = [
      {
        id: 1,
        goal: 'Emergency Fund',
        target: 30000,
        current: 15000,
        progress: 50,
        priority: 'High',
        timeframe: '12 months',
        status: 'In Progress'
      },
      {
        id: 2,
        goal: 'Home Down Payment',
        target: 100000,
        current: 45000,
        progress: 45,
        priority: 'High',
        timeframe: '36 months',
        status: 'In Progress'
      },
      {
        id: 3,
        goal: 'Education Fund',
        target: 100000,
        current: 25000,
        progress: 25,
        priority: 'Medium',
        timeframe: '120 months',
        status: 'In Progress'
      },
      {
        id: 4,
        goal: 'Retirement Savings',
        target: 2500000,
        current: 150000,
        progress: 6,
        priority: 'High',
        timeframe: '360 months',
        status: 'In Progress'
      },
      {
        id: 5,
        goal: 'Life Insurance',
        target: 1000000,
        current: 500000,
        progress: 50,
        priority: 'Medium',
        timeframe: '6 months',
        status: 'In Progress'
      }
    ]
    setPlanningGoals(planningGoals)
  }, [])

  const retirementProjectionData = {
    labels: retirementPlan.milestones?.map(m => `Age ${m.age}`) || [],
    datasets: [
      {
        label: 'Target Savings',
        data: retirementPlan.milestones?.map(m => m.target / 1000) || [],
        borderColor: 'var(--cimb-red)',
        backgroundColor: 'rgba(227, 24, 55, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Projected Savings',
        data: retirementPlan.milestones?.map(m => m.projected / 1000) || [],
        borderColor: 'var(--cimb-teal)',
        backgroundColor: 'rgba(47, 191, 113, 0.1)',
        fill: false,
        tension: 0.4
      }
    ]
  }

  const goalAllocationData = {
    labels: ['Emergency Fund', 'Home Purchase', 'Education', 'Retirement', 'Insurance'],
    datasets: [{
      data: [
        emergencyFund.currentAmount || 0,
        homePurchase.currentSavings || 0,
        educationFund.currentSavings || 0,
        retirementPlan.currentSavings || 0,
        insuranceAnalysis.lifeInsurance?.current || 0
      ],
      backgroundColor: [
        'var(--cimb-red)',
        'var(--cimb-teal)',
        'var(--cimb-gold)',
        '#8B5CF6',
        '#F59E0B'
      ]
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'var(--cimb-teal)'
      case 'In Progress': return 'var(--cimb-gold)'
      case 'Planned': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  return (
    <div className="row g-3">
      {/* Financial Planning Header */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">📋 Comprehensive Financial Planning</h5>
            <p className="text-muted mb-0">Retirement, education, and life event planning</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {retirementPlan.yearsToRetirement}
                  </div>
                  <div className="text-muted">Years to Retirement</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    ${(retirementPlan.projectedSavings / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-muted">Projected Retirement</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    ${(taxOptimization.projectedTaxSavings).toLocaleString()}
                  </div>
                  <div className="text-muted">Annual Tax Savings</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {planningGoals.filter(g => g.status === 'In Progress').length}
                  </div>
                  <div className="text-muted">Active Goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retirement Planning */}
      <div className="col-lg-8">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🏖️ Retirement Planning</h6>
          </div>
          <div className="card-body">
            <Line 
              data={retirementProjectionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'Savings ($K)'
                    }
                  }
                }
              }}
            />
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <h6 className="small text-muted">Current Status</h6>
                <div className="d-flex justify-content-between">
                  <span className="small">Current Savings:</span>
                  <span className="fw-bold small">${retirementPlan.currentSavings?.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Monthly Contribution:</span>
                  <span className="fw-bold small">${retirementPlan.monthlyContribution?.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Expected Return:</span>
                  <span className="fw-bold small">{retirementPlan.annualReturn}%</span>
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="small text-muted">Projections</h6>
                <div className="d-flex justify-content-between">
                  <span className="small">Retirement Age:</span>
                  <span className="fw-bold small">{retirementPlan.retirementAge}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Projected Savings:</span>
                  <span className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                    ${retirementPlan.projectedSavings?.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Monthly Income:</span>
                  <span className="fw-bold small">${retirementPlan.retirementIncome?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Allocation */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎯 Goal Allocation</h6>
          </div>
          <div className="card-body">
            <Doughnut 
              data={goalAllocationData}
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

      {/* Financial Goals */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎯 Financial Goals</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {planningGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="card-title mb-0 small">{goal.goal}</h6>
                        <div className="small text-muted">{goal.timeframe}</div>
                      </div>
                      <div className="text-end">
                        <span 
                          className="badge"
                          style={{ backgroundColor: getPriorityColor(goal.priority) }}
                        >
                          {goal.priority}
                        </span>
                        <span 
                          className="badge ms-1"
                          style={{ backgroundColor: getStatusColor(goal.status) }}
                        >
                          {goal.status}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <div className="small text-muted">Progress</div>
                        <div className="fw-bold small">{goal.progress}%</div>
                      </div>
                      <div className="text-end">
                        <div className="small text-muted">Target</div>
                        <div className="fw-bold small">${goal.target.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${goal.progress}%`,
                          backgroundColor: getPriorityColor(goal.priority)
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tax Optimization */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">💰 Tax Optimization Strategies</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {taxOptimization.strategies?.map((strategy, index) => (
                <motion.div
                  key={strategy.strategy}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title mb-1 small">{strategy.strategy}</h6>
                        <p className="card-text small text-muted mb-0">{strategy.description}</p>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                          ${strategy.savings.toLocaleString()}
                        </div>
                        <div className="small text-muted">Annual Savings</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Life Events Timeline */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📅 Life Events Timeline</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Age</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Financial Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {lifeEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-semibold">{event.event}</td>
                      <td className="financial-data">{event.age}</td>
                      <td className="financial-data">${event.cost.toLocaleString()}</td>
                      <td>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getStatusColor(event.status) }}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="small text-muted">{event.impact}</td>
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
