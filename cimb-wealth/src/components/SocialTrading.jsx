import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function SocialTrading() {
  const [topTraders, setTopTraders] = useState([])
  const [tradingIdeas, setTradingIdeas] = useState([])
  const [marketSentiment, setMarketSentiment] = useState({})
  const [communityInsights, setCommunityInsights] = useState([])
  const [socialMetrics, setSocialMetrics] = useState({})
  const [following, setFollowing] = useState([])
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    // Generate top traders
    const topTraders = [
      {
        id: 1,
        name: 'Alex Chen',
        username: '@alexchen_trader',
        avatar: '👨‍💼',
        followers: 12500,
        winRate: 78.5,
        totalReturn: 45.2,
        avgReturn: 12.8,
        riskScore: 6.2,
        specialties: ['Tech Stocks', 'Options'],
        verified: true,
        badges: ['Top Performer', 'Risk Manager'],
        lastTrade: '2 hours ago',
        portfolio: '$2.1M'
      },
      {
        id: 2,
        name: 'Sarah Lim',
        username: '@sarah_invests',
        avatar: '👩‍💻',
        followers: 8900,
        winRate: 72.3,
        totalReturn: 38.7,
        avgReturn: 10.5,
        riskScore: 4.8,
        specialties: ['ESG Investing', 'REITs'],
        verified: true,
        badges: ['ESG Expert', 'Consistent'],
        lastTrade: '4 hours ago',
        portfolio: '$1.8M'
      },
      {
        id: 3,
        name: 'David Wong',
        username: '@david_wong_finance',
        avatar: '👨‍🎓',
        followers: 15600,
        winRate: 81.2,
        totalReturn: 52.1,
        avgReturn: 15.3,
        riskScore: 7.8,
        specialties: ['Growth Stocks', 'Crypto'],
        verified: true,
        badges: ['Growth Expert', 'Crypto King'],
        lastTrade: '1 hour ago',
        portfolio: '$3.2M'
      },
      {
        id: 4,
        name: 'Emma Rodriguez',
        username: '@emma_value',
        avatar: '👩‍⚖️',
        followers: 6700,
        winRate: 75.8,
        totalReturn: 41.3,
        avgReturn: 11.2,
        riskScore: 5.5,
        specialties: ['Value Investing', 'Dividends'],
        verified: false,
        badges: ['Value Hunter', 'Dividend Master'],
        lastTrade: '6 hours ago',
        portfolio: '$1.2M'
      }
    ]
    setTopTraders(topTraders)

    // Generate trading ideas
    const tradingIdeas = [
      {
        id: 1,
        trader: 'Alex Chen',
        symbol: 'NVDA',
        action: 'BUY',
        price: 875.28,
        target: 950.00,
        stopLoss: 820.00,
        confidence: 87,
        reasoning: 'AI chip demand surge, strong Q4 guidance, data center growth',
        likes: 245,
        comments: 32,
        shares: 18,
        timestamp: '2 hours ago',
        tags: ['AI', 'Semiconductors', 'Growth']
      },
      {
        id: 2,
        trader: 'Sarah Lim',
        symbol: 'AAPL',
        action: 'HOLD',
        price: 175.43,
        target: 185.00,
        stopLoss: 165.00,
        confidence: 73,
        reasoning: 'iPhone 15 demand solid, but valuation concerns remain',
        likes: 189,
        comments: 45,
        shares: 12,
        timestamp: '4 hours ago',
        tags: ['Tech', 'Consumer', 'Valuation']
      },
      {
        id: 3,
        trader: 'David Wong',
        symbol: 'TSLA',
        action: 'BUY',
        price: 248.50,
        target: 275.00,
        stopLoss: 230.00,
        confidence: 82,
        reasoning: 'EV market expansion, autonomous driving progress, energy storage',
        likes: 312,
        comments: 67,
        shares: 25,
        timestamp: '1 hour ago',
        tags: ['EV', 'Autonomous', 'Energy']
      },
      {
        id: 4,
        trader: 'Emma Rodriguez',
        symbol: 'JPM',
        action: 'BUY',
        price: 155.67,
        target: 165.00,
        stopLoss: 150.00,
        confidence: 68,
        reasoning: 'Interest rate environment favorable, loan growth strong',
        likes: 156,
        comments: 23,
        shares: 8,
        timestamp: '6 hours ago',
        tags: ['Banking', 'Financials', 'Value']
      }
    ]
    setTradingIdeas(tradingIdeas)

    // Generate market sentiment
    const marketSentiment = {
      overallSentiment: 'Bullish',
      sentimentScore: 78,
      bullishPercentage: 68,
      bearishPercentage: 22,
      neutralPercentage: 10,
      trendingTopics: [
        { topic: 'AI Revolution', mentions: 1250, sentiment: 'Very Bullish' },
        { topic: 'Interest Rates', mentions: 890, sentiment: 'Neutral' },
        { topic: 'Energy Transition', mentions: 650, sentiment: 'Bullish' },
        { topic: 'Inflation', mentions: 420, sentiment: 'Bearish' }
      ],
      sectorSentiment: {
        'Technology': { sentiment: 'Very Bullish', score: 85 },
        'Healthcare': { sentiment: 'Bullish', score: 72 },
        'Financials': { sentiment: 'Neutral', score: 58 },
        'Energy': { sentiment: 'Bullish', score: 68 },
        'Consumer': { sentiment: 'Neutral', score: 55 }
      }
    }
    setMarketSentiment(marketSentiment)

    // Generate community insights
    const communityInsights = [
      {
        id: 1,
        type: 'insight',
        title: 'AI Sector Momentum',
        description: 'Community sentiment shows strong bullish momentum in AI-related stocks',
        author: 'Alex Chen',
        likes: 89,
        comments: 23,
        confidence: 87,
        impact: 'High'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Market Volatility Alert',
        description: 'High volatility expected in tech sector due to earnings season',
        author: 'Sarah Lim',
        likes: 67,
        comments: 34,
        confidence: 76,
        impact: 'Medium'
      },
      {
        id: 3,
        type: 'opportunity',
        title: 'ESG Investment Trend',
        description: 'Growing interest in ESG investments with 15% outperformance',
        author: 'Emma Rodriguez',
        likes: 112,
        comments: 28,
        confidence: 82,
        impact: 'Medium'
      },
      {
        id: 4,
        type: 'analysis',
        title: 'Sector Rotation Analysis',
        description: 'Rotation from growth to value stocks gaining momentum',
        author: 'David Wong',
        likes: 95,
        comments: 41,
        confidence: 74,
        impact: 'High'
      }
    ]
    setCommunityInsights(communityInsights)

    // Generate social metrics
    const socialMetrics = {
      totalUsers: 125000,
      activeTraders: 45000,
      totalIdeas: 12500,
      averageWinRate: 68.5,
      topPerformerReturn: 52.1,
      communityGrowth: 12.3,
      engagementRate: 78.2
    }
    setSocialMetrics(socialMetrics)

    // Generate following list
    const following = [
      { id: 1, name: 'Alex Chen', username: '@alexchen_trader', avatar: '👨‍💼', online: true },
      { id: 2, name: 'Sarah Lim', username: '@sarah_invests', avatar: '👩‍💻', online: false },
      { id: 3, name: 'David Wong', username: '@david_wong_finance', avatar: '👨‍🎓', online: true }
    ]
    setFollowing(following)
  }, [])

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Very Bullish': return 'var(--cimb-teal)'
      case 'Bullish': return 'var(--cimb-teal)'
      case 'Neutral': return 'var(--cimb-gold)'
      case 'Bearish': return 'var(--cimb-red)'
      case 'Very Bearish': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'BUY': return 'var(--cimb-teal)'
      case 'HOLD': return 'var(--cimb-gold)'
      case 'SELL': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getInsightColor = (type) => {
    switch (type) {
      case 'insight': return 'var(--cimb-teal)'
      case 'warning': return 'var(--cimb-gold)'
      case 'opportunity': return 'var(--cimb-red)'
      case 'analysis': return '#8B5CF6'
      default: return 'var(--cimb-red)'
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'insight': return '💡'
      case 'warning': return '⚠️'
      case 'opportunity': return '🚀'
      case 'analysis': return '📊'
      default: return '📈'
    }
  }

  return (
    <div className="row g-3">
      {/* Social Trading Header */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">👥 Social Trading Community</h5>
            <p className="text-muted mb-0">Follow top traders, share ideas, and learn from the community</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {socialMetrics.totalUsers?.toLocaleString()}
                  </div>
                  <div className="text-muted">Total Users</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {socialMetrics.activeTraders?.toLocaleString()}
                  </div>
                  <div className="text-muted">Active Traders</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {socialMetrics.averageWinRate}%
                  </div>
                  <div className="text-muted">Avg Win Rate</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {socialMetrics.topPerformerReturn}%
                  </div>
                  <div className="text-muted">Top Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Community Sentiment</h6>
          </div>
          <div className="card-body">
            <div className="text-center mb-3">
              <div className="fs-3 fw-bold" style={{ color: getSentimentColor(marketSentiment.overallSentiment) }}>
                {marketSentiment.sentimentScore}%
              </div>
              <div className="text-muted">Overall Sentiment</div>
              <div className="badge bg-success mt-2">{marketSentiment.overallSentiment}</div>
            </div>
            <div className="row g-2">
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {marketSentiment.bullishPercentage}%
                  </div>
                  <div className="text-muted small">Bullish</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {marketSentiment.neutralPercentage}%
                  </div>
                  <div className="text-muted small">Neutral</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fs-5 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {marketSentiment.bearishPercentage}%
                  </div>
                  <div className="text-muted small">Bearish</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="col-lg-8">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🔥 Trending Topics</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              {marketSentiment.trendingTopics?.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  className="col-md-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="card-body py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title mb-0 small">{topic.topic}</h6>
                          <div className="small text-muted">{topic.mentions} mentions</div>
                        </div>
                        <div className="text-end">
                          <span 
                            className="badge small"
                            style={{ backgroundColor: getSentimentColor(topic.sentiment) }}
                          >
                            {topic.sentiment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Traders */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🏆 Top Traders</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {topTraders.map((trader, index) => (
                <motion.div
                  key={trader.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex align-items-center">
                      <div className="me-3 fs-4">{trader.avatar}</div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center">
                          <h6 className="card-title mb-0 small">{trader.name}</h6>
                          {trader.verified && <span className="badge bg-primary small ms-2">✓</span>}
                        </div>
                        <div className="small text-muted">{trader.username}</div>
                        <div className="d-flex gap-2 mt-1">
                          <span className="badge bg-success small">{trader.winRate}% Win Rate</span>
                          <span className="badge bg-info small">{trader.totalReturn}% Return</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold small" style={{ color: 'var(--cimb-teal)' }}>
                          {trader.followers.toLocaleString()}
                        </div>
                        <div className="text-muted small">Followers</div>
                        <button className="btn btn-sm btn-outline-primary mt-1">Follow</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trading Ideas */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">💡 Latest Trading Ideas</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {tradingIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="card-title mb-0 small">{idea.symbol} - {idea.trader}</h6>
                        <div className="small text-muted">{idea.timestamp}</div>
                      </div>
                      <span 
                        className="badge fw-bold"
                        style={{ backgroundColor: getActionColor(idea.action) }}
                      >
                        {idea.action}
                      </span>
                    </div>
                    <p className="card-text small text-muted mb-2">{idea.reasoning}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        <span className="badge bg-secondary small">${idea.price}</span>
                        <span className="badge bg-success small">Target: ${idea.target}</span>
                        <span className="badge bg-danger small">Stop: ${idea.stopLoss}</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary">👍 {idea.likes}</button>
                        <button className="btn btn-sm btn-outline-secondary">💬 {idea.comments}</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Insights */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🧠 Community Insights</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {communityInsights.map((insight, index) => (
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
                            style={{ color: getInsightColor(insight.type) }}
                          >
                            {insight.confidence}%
                          </div>
                          <div className="small text-muted">Confidence</div>
                        </div>
                      </div>
                      <h6 className="card-title small">{insight.title}</h6>
                      <p className="card-text small text-muted">{insight.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <small className="text-muted">by {insight.author}</small>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-secondary">👍 {insight.likes}</button>
                          <button className="btn btn-sm btn-outline-secondary">💬 {insight.comments}</button>
                        </div>
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
