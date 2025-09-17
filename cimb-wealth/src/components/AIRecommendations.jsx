import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import investments from '../data/investments.json'

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [riskAnalysis, setRiskAnalysis] = useState({})
  const [marketSentiment, setMarketSentiment] = useState({})
  const [portfolioOptimization, setPortfolioOptimization] = useState({})
  const [aiInsights, setAiInsights] = useState([])
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    // Generate AI-powered recommendations
    const recommendations = [
      {
        id: 1,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currentPrice: 175.43,
        targetPrice: 185.20,
        confidence: 87,
        recommendation: 'BUY',
        reasoning: 'Strong Q4 earnings, iPhone 15 demand surge, AI integration potential',
        riskLevel: 'Medium',
        timeframe: '3-6 months',
        sector: 'Technology',
        aiScore: 92,
        technicalScore: 88,
        fundamentalScore: 91,
        sentimentScore: 85
      },
      {
        id: 2,
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        currentPrice: 248.50,
        targetPrice: 275.00,
        confidence: 78,
        recommendation: 'BUY',
        reasoning: 'EV market expansion, autonomous driving progress, energy storage growth',
        riskLevel: 'High',
        timeframe: '6-12 months',
        sector: 'Automotive',
        aiScore: 82,
        technicalScore: 75,
        fundamentalScore: 88,
        sentimentScore: 79
      },
      {
        id: 3,
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        currentPrice: 378.85,
        targetPrice: 395.00,
        confidence: 91,
        recommendation: 'STRONG BUY',
        reasoning: 'Azure cloud dominance, AI integration across products, enterprise growth',
        riskLevel: 'Low',
        timeframe: '6-12 months',
        sector: 'Technology',
        aiScore: 94,
        technicalScore: 89,
        fundamentalScore: 93,
        sentimentScore: 92
      },
      {
        id: 4,
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currentPrice: 875.28,
        targetPrice: 950.00,
        confidence: 85,
        recommendation: 'BUY',
        reasoning: 'AI chip demand surge, data center expansion, gaming recovery',
        riskLevel: 'High',
        timeframe: '3-6 months',
        sector: 'Semiconductors',
        aiScore: 89,
        technicalScore: 82,
        fundamentalScore: 91,
        sentimentScore: 88
      },
      {
        id: 5,
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        currentPrice: 155.67,
        targetPrice: 165.00,
        confidence: 73,
        recommendation: 'HOLD',
        reasoning: 'Interest rate environment, loan growth, regulatory compliance',
        riskLevel: 'Medium',
        timeframe: '6-12 months',
        sector: 'Financial Services',
        aiScore: 76,
        technicalScore: 71,
        fundamentalScore: 78,
        sentimentScore: 74
      }
    ]
    setRecommendations(recommendations)

    // Generate risk analysis
    const riskAnalysis = {
      portfolioRisk: 72,
      marketRisk: 65,
      concentrationRisk: 58,
      liquidityRisk: 82,
      currencyRisk: 45,
      interestRateRisk: 68,
      overallRiskScore: 65,
      riskTolerance: user?.riskProfile || 'Moderate',
      recommendedAdjustments: [
        'Reduce technology sector concentration',
        'Increase bond allocation for stability',
        'Consider international diversification',
        'Add defensive stocks for market volatility'
      ]
    }
    setRiskAnalysis(riskAnalysis)

    // Generate market sentiment
    const marketSentiment = {
      overallSentiment: 'Bullish',
      sentimentScore: 78,
      fearGreedIndex: 65,
      vixLevel: 18.5,
      putCallRatio: 0.85,
      insiderTrading: 'Net Buying',
      institutionalFlow: 'Positive',
      retailSentiment: 'Optimistic',
      analystConsensus: 'Overweight',
      keyFactors: [
        'Strong corporate earnings',
        'Fed policy stability',
        'AI technology adoption',
        'Energy transition momentum'
      ]
    }
    setMarketSentiment(marketSentiment)

    // Generate portfolio optimization
    const portfolioOptimization = {
      currentAllocation: {
        stocks: 75,
        bonds: 15,
        cash: 5,
        alternatives: 5
      },
      optimalAllocation: {
        stocks: 65,
        bonds: 25,
        cash: 5,
        alternatives: 5
      },
      expectedReturn: 8.5,
      expectedVolatility: 12.3,
      sharpeRatio: 0.69,
      maxDrawdown: 15.2,
      optimizationScore: 78,
      suggestedChanges: [
        'Reduce equity allocation by 10%',
        'Increase bond allocation by 10%',
        'Add REIT exposure for diversification',
        'Consider international equity allocation'
      ]
    }
    setPortfolioOptimization(portfolioOptimization)

    // Generate AI insights
    const aiInsights = [
      {
        id: 1,
        type: 'opportunity',
        title: 'AI Sector Momentum',
        description: 'Artificial intelligence companies showing strong momentum with 23% average returns',
        confidence: 89,
        impact: 'High',
        timeframe: '3-6 months',
        action: 'Consider increasing AI/tech exposure'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Interest Rate Sensitivity',
        description: 'Portfolio shows high sensitivity to interest rate changes',
        confidence: 76,
        impact: 'Medium',
        timeframe: '6-12 months',
        action: 'Add floating rate instruments'
      },
      {
        id: 3,
        type: 'opportunity',
        title: 'Emerging Market Recovery',
        description: 'Emerging markets showing signs of recovery with attractive valuations',
        confidence: 82,
        impact: 'Medium',
        timeframe: '12+ months',
        action: 'Consider EM equity allocation'
      },
      {
        id: 4,
        type: 'info',
        title: 'ESG Integration',
        description: 'ESG-focused investments outperforming traditional peers by 2.3%',
        confidence: 71,
        impact: 'Low',
        timeframe: 'Long-term',
        action: 'Review ESG criteria in selection'
      }
    ]
    setAiInsights(aiInsights)
  }, [user])

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'STRONG BUY': return 'var(--cimb-teal)'
      case 'BUY': return 'var(--cimb-teal)'
      case 'HOLD': return 'var(--cimb-gold)'
      case 'SELL': return 'var(--cimb-red)'
      case 'STRONG SELL': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'var(--cimb-teal)'
    if (confidence >= 60) return 'var(--cimb-gold)'
    return 'var(--cimb-red)'
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'var(--cimb-teal)'
      case 'Medium': return 'var(--cimb-gold)'
      case 'High': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return '🚀'
      case 'warning': return '⚠️'
      case 'info': return 'ℹ️'
      default: return '📊'
    }
  }

  const getInsightColor = (type) => {
    switch (type) {
      case 'opportunity': return 'var(--cimb-teal)'
      case 'warning': return 'var(--cimb-gold)'
      case 'info': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  return (
    <div className="row g-3">
      {/* AI Recommendations Header */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">🤖 AI-Powered Investment Recommendations</h5>
            <p className="text-muted mb-0">Machine learning algorithms analyze market data to provide personalized investment insights</p>
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Market Sentiment Analysis</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: getConfidenceColor(marketSentiment.sentimentScore) }}>
                    {marketSentiment.sentimentScore}%
                  </div>
                  <div className="text-muted">Sentiment Score</div>
                  <div className="badge bg-success mt-2">{marketSentiment.overallSentiment}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {marketSentiment.fearGreedIndex}
                  </div>
                  <div className="text-muted small">Fear/Greed Index</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {marketSentiment.vixLevel}
                  </div>
                  <div className="text-muted small">VIX Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">⚖️ Portfolio Risk Analysis</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: getRiskColor(riskAnalysis.overallRiskScore >= 70 ? 'High' : riskAnalysis.overallRiskScore >= 40 ? 'Medium' : 'Low') }}>
                    {riskAnalysis.overallRiskScore}%
                  </div>
                  <div className="text-muted small">Overall Risk</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {riskAnalysis.portfolioRisk}%
                  </div>
                  <div className="text-muted small">Portfolio Risk</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {riskAnalysis.concentrationRisk}%
                  </div>
                  <div className="text-muted small">Concentration</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {riskAnalysis.liquidityRisk}%
                  </div>
                  <div className="text-muted small">Liquidity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Optimization */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎯 Portfolio Optimization</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {portfolioOptimization.expectedReturn}%
                  </div>
                  <div className="text-muted small">Expected Return</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {portfolioOptimization.expectedVolatility}%
                  </div>
                  <div className="text-muted small">Volatility</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {portfolioOptimization.sharpeRatio}
                  </div>
                  <div className="text-muted small">Sharpe Ratio</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {portfolioOptimization.optimizationScore}%
                  </div>
                  <div className="text-muted small">Optimization Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">💡 AI Investment Recommendations</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Current Price</th>
                    <th>Target Price</th>
                    <th>Recommendation</th>
                    <th>Confidence</th>
                    <th>Risk Level</th>
                    <th>AI Score</th>
                    <th>Reasoning</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec, index) => (
                    <motion.tr
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-bold">{rec.symbol}</td>
                      <td className="small">{rec.name}</td>
                      <td className="financial-data">${rec.currentPrice}</td>
                      <td className="financial-data">${rec.targetPrice}</td>
                      <td>
                        <span 
                          className="badge fw-bold"
                          style={{ backgroundColor: getRecommendationColor(rec.recommendation) }}
                        >
                          {rec.recommendation}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress me-2" style={{ width: '60px', height: '8px' }}>
                            <div 
                              className="progress-bar"
                              style={{ 
                                width: `${rec.confidence}%`,
                                backgroundColor: getConfidenceColor(rec.confidence)
                              }}
                            />
                          </div>
                          <span className="small">{rec.confidence}%</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getRiskColor(rec.riskLevel) }}
                        >
                          {rec.riskLevel}
                        </span>
                      </td>
                      <td className="financial-data">{rec.aiScore}</td>
                      <td className="small text-muted">{rec.reasoning}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🧠 AI Market Insights</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  className="col-md-6 col-lg-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
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
                        <div className="fs-4">{getInsightIcon(insight.type)}</div>
                        <div className="text-end">
                          <div 
                            className="fw-bold fs-5"
                            style={{ color: getConfidenceColor(insight.confidence) }}
                          >
                            {insight.confidence}%
                          </div>
                          <div className="small text-muted">Confidence</div>
                        </div>
                      </div>
                      <h6 className="card-title small">{insight.title}</h6>
                      <p className="card-text small text-muted">{insight.description}</p>
                      <div className="mt-2">
                        <small className="fw-semibold" style={{ color: getInsightColor(insight.type) }}>
                          💡 {insight.action}
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
