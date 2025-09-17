import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { push, clear } from '../store'

const responses = [
  "Based on your risk profile, I recommend diversifying your portfolio with 60% stocks, 30% bonds, and 10% alternatives.",
  "Consider increasing your emergency fund to 6 months of expenses before investing more aggressively.",
  "Given current market conditions, REITs offer good dividend yields with moderate risk.",
  "Your portfolio shows good diversification. Consider rebalancing quarterly to maintain target allocations.",
  "For your age group, a balanced approach with gradual increase in equity exposure is ideal.",
  "Fixed deposits provide stability but consider inflation-adjusted returns for long-term goals.",
  "Cryptocurrency should represent no more than 5-10% of your total portfolio due to volatility.",
  "Regular SIP investments help average out market volatility over time.",
  "Tax-efficient investments like EPF and PRS can improve your overall returns.",
  "Consider your time horizon: longer goals can tolerate more volatility for higher returns."
]

export default function AIAdvisor() {
  const [question, setQuestion] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  const notifications = useSelector(s => s.notifications.items)

  // Persist advisor messages separately
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('advisor_history'))
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('advisor_history', JSON.stringify(history))
  }, [history])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!question.trim()) return
    
    setIsTyping(true)
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)]
      const entry = {
        type: 'advisor', 
        message: response,
        timestamp: new Date().toLocaleTimeString()
      }
      dispatch(push(entry))
      setHistory(prev => [{ role: 'assistant', content: response, ts: entry.timestamp }, ...prev].slice(0, 20))
      setIsTyping(false)
      setQuestion('')
    }, 1500)
  }

  return (
    <motion.div 
      className="card shadow-sm glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header" style={{ background: 'var(--cimb-red)', color: 'white', border: 'none' }}>
        <h6 className="mb-0">🤖 AI Financial Advisor</h6>
        <small>Ask me about investments, portfolio strategy, or financial planning</small>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">Chat History</small>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => { setHistory([]); localStorage.removeItem('advisor_history') }} disabled={!history.length}>Clear</button>
        </div>
        {!!history.length && (
          <div className="mb-3" style={{ maxHeight: 140, overflowY: 'auto' }}>
            {history.map((h, idx) => (
              <div key={idx} className="small text-muted">{h.ts} - {h.content}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Question</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Should I invest more in bonds? How to diversify my portfolio?"
              disabled={isTyping}
            />
          </div>
          <button 
            className="btn btn-cimb-primary w-100" 
            type="submit"
            disabled={isTyping || !question.trim()}
          >
            {isTyping ? 'AI is thinking...' : 'Ask Advisor'}
          </button>
        </form>
        
        <div className="mt-3">
          <small className="text-muted">
            💡 Tip: Ask about portfolio allocation, risk management, or investment strategies
          </small>
        </div>
      </div>
    </motion.div>
  )
}
