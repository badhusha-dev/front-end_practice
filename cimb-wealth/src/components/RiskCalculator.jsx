import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateRisk } from '../store'
import { motion } from 'framer-motion'

export default function RiskCalculator() {
  const dispatch = useDispatch()
  const [answers, setAnswers] = useState({
    age: '',
    income: '',
    experience: '',
    goals: '',
    timeline: '',
    riskTolerance: ''
  })
  const [result, setResult] = useState(null)

  const calculateRisk = () => {
    let score = 0
    
    // Age scoring
    if (answers.age === '18-25') score += 3
    else if (answers.age === '26-35') score += 2
    else if (answers.age === '36-50') score += 1
    else score += 0
    
    // Income scoring
    if (answers.income === 'high') score += 2
    else if (answers.income === 'medium') score += 1
    else score += 0
    
    // Experience scoring
    if (answers.experience === 'expert') score += 3
    else if (answers.experience === 'intermediate') score += 2
    else if (answers.experience === 'beginner') score += 1
    else score += 0
    
    // Goals scoring
    if (answers.goals === 'growth') score += 3
    else if (answers.goals === 'balanced') score += 2
    else score += 1
    
    // Timeline scoring
    if (answers.timeline === 'long') score += 3
    else if (answers.timeline === 'medium') score += 2
    else score += 1
    
    // Risk tolerance scoring
    if (answers.riskTolerance === 'high') score += 3
    else if (answers.riskTolerance === 'medium') score += 2
    else score += 1

    let profile = 'Conservative'
    let allocation = { stocks: 30, bonds: 50, cash: 20 }
    
    if (score >= 15) {
      profile = 'Aggressive'
      allocation = { stocks: 80, bonds: 15, cash: 5 }
    } else if (score >= 10) {
      profile = 'Moderate'
      allocation = { stocks: 60, bonds: 30, cash: 10 }
    }

    setResult({ profile, allocation, score })
    dispatch(updateRisk(profile))
  }

  return (
    <motion.div 
      className="card shadow-sm glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-header bg-transparent border-0">
        <h5 className="mb-0">🎯 Risk Profile Calculator</h5>
        <small className="text-muted">Answer a few questions to determine your ideal investment strategy</small>
      </div>
      <div className="card-body">
        {!result ? (
          <form onSubmit={(e) => { e.preventDefault(); calculateRisk() }}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Age Range</label>
                <select className="form-select" value={answers.age} onChange={(e) => setAnswers({...answers, age: e.target.value})}>
                  <option value="">Select age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-50">36-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Annual Income</label>
                <select className="form-select" value={answers.income} onChange={(e) => setAnswers({...answers, income: e.target.value})}>
                  <option value="">Select income level</option>
                  <option value="low">Below RM50K</option>
                  <option value="medium">RM50K - RM100K</option>
                  <option value="high">Above RM100K</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Investment Experience</label>
                <select className="form-select" value={answers.experience} onChange={(e) => setAnswers({...answers, experience: e.target.value})}>
                  <option value="">Select experience</option>
                  <option value="none">No experience</option>
                  <option value="beginner">Beginner (1-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Primary Goal</label>
                <select className="form-select" value={answers.goals} onChange={(e) => setAnswers({...answers, goals: e.target.value})}>
                  <option value="">Select primary goal</option>
                  <option value="preservation">Capital Preservation</option>
                  <option value="balanced">Balanced Growth</option>
                  <option value="growth">Aggressive Growth</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Investment Timeline</label>
                <select className="form-select" value={answers.timeline} onChange={(e) => setAnswers({...answers, timeline: e.target.value})}>
                  <option value="">Select timeline</option>
                  <option value="short">Short term (1-3 years)</option>
                  <option value="medium">Medium term (3-7 years)</option>
                  <option value="long">Long term (7+ years)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Risk Tolerance</label>
                <select className="form-select" value={answers.riskTolerance} onChange={(e) => setAnswers({...answers, riskTolerance: e.target.value})}>
                  <option value="">Select risk tolerance</option>
                  <option value="low">Low - Prefer stability</option>
                  <option value="medium">Medium - Some volatility OK</option>
                  <option value="high">High - Can handle volatility</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-cimb-primary w-100" type="submit">
                Calculate My Risk Profile
              </button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4">
              <h4 className={`text-${result.profile === 'Aggressive' ? 'danger' : result.profile === 'Moderate' ? 'warning' : 'success'}`}>
                {result.profile} Profile
              </h4>
              <p className="text-muted">Risk Score: {result.score}/18</p>
            </div>
            
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold text-primary">{result.allocation.stocks}%</div>
                  <div className="text-muted">Stocks</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold text-success">{result.allocation.bonds}%</div>
                  <div className="text-muted">Bonds</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold text-warning">{result.allocation.cash}%</div>
                  <div className="text-muted">Cash</div>
                </div>
              </div>
            </div>

            <div className="alert alert-info">
              <strong>Recommendation:</strong> Based on your profile, consider a diversified portfolio with 
              {result.profile === 'Aggressive' ? ' higher equity exposure for growth potential.' : 
               result.profile === 'Moderate' ? ' balanced allocation between growth and stability.' : 
               ' conservative allocation focusing on capital preservation.'}
            </div>

            <button className="btn btn-outline-secondary w-100" onClick={() => setResult(null)}>
              Recalculate
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
