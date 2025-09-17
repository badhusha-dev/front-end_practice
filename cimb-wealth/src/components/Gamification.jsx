import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import investments from '../data/investments.json'
import goals from '../data/goals.json'
import transactions from '../data/transactions.json'

export default function Gamification() {
  const [achievements, setAchievements] = useState([])
  const [userStats, setUserStats] = useState({})
  const [leaderboard, setLeaderboard] = useState([])
  const [badges, setBadges] = useState([])
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    // Calculate user statistics
    const totalValue = investments.reduce((sum, inv) => sum + (inv.qty * inv.price), 0)
    const completedGoals = goals.filter(g => (g.currentAmount / g.targetAmount) >= 1).length
    const totalTransactions = transactions.length
    const investmentDays = Math.floor((new Date() - new Date('2024-01-01')) / (1000 * 60 * 60 * 24))
    
    const stats = {
      totalValue,
      completedGoals,
      totalTransactions,
      investmentDays,
      portfolioGrowth: Math.random() * 20 + 5,
      riskScore: Math.random() * 100,
      diversificationScore: Math.random() * 100
    }
    setUserStats(stats)

    // Generate achievements
    const achievements = [
      {
        id: 1,
        title: 'First Investment',
        description: 'Made your first investment',
        icon: '🌱',
        unlocked: totalTransactions > 0,
        points: 100,
        category: 'Investment'
      },
      {
        id: 2,
        title: 'Goal Crusher',
        description: 'Completed your first financial goal',
        icon: '🎯',
        unlocked: completedGoals > 0,
        points: 250,
        category: 'Goals'
      },
      {
        id: 3,
        title: 'Diversification Master',
        description: 'Invested in 5+ different asset classes',
        icon: '🎨',
        unlocked: new Set(investments.map(i => i.asset)).size >= 5,
        points: 300,
        category: 'Strategy'
      },
      {
        id: 4,
        title: 'Consistent Investor',
        description: 'Invested for 30+ consecutive days',
        icon: '📅',
        unlocked: investmentDays >= 30,
        points: 400,
        category: 'Consistency'
      },
      {
        id: 5,
        title: 'Millionaire Mindset',
        description: 'Portfolio value exceeded $1M',
        icon: '💰',
        unlocked: totalValue >= 1000000,
        points: 1000,
        category: 'Milestone'
      },
      {
        id: 6,
        title: 'Risk Taker',
        description: 'Maintained high-risk portfolio for 6 months',
        icon: '⚡',
        unlocked: stats.riskScore >= 80,
        points: 500,
        category: 'Risk'
      },
      {
        id: 7,
        title: 'Goal Achiever',
        description: 'Completed 5+ financial goals',
        icon: '🏆',
        unlocked: completedGoals >= 5,
        points: 750,
        category: 'Goals'
      },
      {
        id: 8,
        title: 'Market Timer',
        description: 'Perfect timing on 3+ investments',
        icon: '⏰',
        unlocked: Math.random() > 0.7,
        points: 600,
        category: 'Timing'
      }
    ]
    setAchievements(achievements)

    // Generate badges
    const badges = [
      {
        id: 1,
        name: 'Novice Investor',
        description: 'Started your investment journey',
        icon: '🌱',
        unlocked: totalTransactions > 0,
        rarity: 'common'
      },
      {
        id: 2,
        name: 'Goal Setter',
        description: 'Set your first financial goal',
        icon: '🎯',
        unlocked: goals.length > 0,
        rarity: 'common'
      },
      {
        id: 3,
        name: 'Diversification Expert',
        description: 'Mastered portfolio diversification',
        icon: '🎨',
        unlocked: new Set(investments.map(i => i.asset)).size >= 5,
        rarity: 'rare'
      },
      {
        id: 4,
        name: 'Consistent Saver',
        description: 'Invested consistently for 6 months',
        icon: '📅',
        unlocked: investmentDays >= 180,
        rarity: 'rare'
      },
      {
        id: 5,
        name: 'Wealth Builder',
        description: 'Built significant wealth',
        icon: '💰',
        unlocked: totalValue >= 500000,
        rarity: 'epic'
      },
      {
        id: 6,
        name: 'Risk Master',
        description: 'Excelled at risk management',
        icon: '⚡',
        unlocked: stats.riskScore >= 90,
        rarity: 'epic'
      },
      {
        id: 7,
        name: 'Goal Champion',
        description: 'Achieved multiple financial goals',
        icon: '🏆',
        unlocked: completedGoals >= 3,
        rarity: 'legendary'
      },
      {
        id: 8,
        name: 'Market Wizard',
        description: 'Mastered market timing',
        icon: '🧙‍♂️',
        unlocked: stats.portfolioGrowth >= 15,
        rarity: 'legendary'
      }
    ]
    setBadges(badges)

    // Generate leaderboard
    const leaderboard = [
      { rank: 1, name: 'Alex Tan', score: 2850, avatar: '👑', portfolio: '$2.1M' },
      { rank: 2, name: 'Sarah Lim', score: 2650, avatar: '🥈', portfolio: '$1.8M' },
      { rank: 3, name: 'David Wong', score: 2400, avatar: '🥉', portfolio: '$1.5M' },
      { rank: 4, name: 'Emma Chen', score: 2200, avatar: '⭐', portfolio: '$1.3M' },
      { rank: 5, name: user?.name || 'You', score: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0), avatar: '🎯', portfolio: `$${(totalValue / 1000000).toFixed(1)}M` }
    ]
    setLeaderboard(leaderboard)
  }, [user])

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6B7280'
      case 'rare': return '#3B82F6'
      case 'epic': return '#8B5CF6'
      case 'legendary': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const unlockedBadges = badges.filter(b => b.unlocked)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="row g-3">
      {/* User Stats */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">🎮 Investment Gamification</h5>
            <p className="text-muted mb-0">Track your progress and compete with other investors</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {totalPoints}
                  </div>
                  <div className="text-muted">Total Points</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {unlockedAchievements.length}
                  </div>
                  <div className="text-muted">Achievements</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {unlockedBadges.length}
                  </div>
                  <div className="text-muted">Badges</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {userStats.portfolioGrowth?.toFixed(1)}%
                  </div>
                  <div className="text-muted">Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🏆 Achievements</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="col-12"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className={`card ${achievement.unlocked ? 'border-success' : 'border-secondary'}`}
                    style={{ 
                      backgroundColor: achievement.unlocked ? 'rgba(47, 191, 113, 0.1)' : 'var(--bg-secondary)',
                      opacity: achievement.unlocked ? 1 : 0.6
                    }}
                  >
                    <div className="card-body py-2">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 me-3">{achievement.icon}</div>
                        <div className="flex-grow-1">
                          <h6 className="card-title mb-0 small">{achievement.title}</h6>
                          <p className="card-text small text-muted mb-0">{achievement.description}</p>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold small" style={{ color: 'var(--cimb-gold)' }}>
                            {achievement.points}
                          </div>
                          <div className="small text-muted">pts</div>
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

      {/* Badges */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎖️ Badges</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className="col-md-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="card text-center h-100"
                    style={{ 
                      backgroundColor: badge.unlocked ? 'var(--bg-secondary)' : 'rgba(0,0,0,0.1)',
                      opacity: badge.unlocked ? 1 : 0.5
                    }}
                  >
                    <div className="card-body">
                      <div className="fs-2 mb-2">{badge.icon}</div>
                      <h6 className="card-title small">{badge.name}</h6>
                      <p className="card-text small text-muted">{badge.description}</p>
                      <div 
                        className="badge"
                        style={{ backgroundColor: getRarityColor(badge.rarity) }}
                      >
                        {badge.rarity}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🏅 Leaderboard</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Investor</th>
                    <th>Score</th>
                    <th>Portfolio</th>
                    <th>Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <motion.tr
                      key={player.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={player.name === user?.name ? 'table-warning' : ''}
                    >
                      <td>
                        <div className="fs-4">{player.avatar}</div>
                      </td>
                      <td className="fw-semibold">{player.name}</td>
                      <td className="financial-data">{player.score.toLocaleString()}</td>
                      <td className="financial-data">{player.portfolio}</td>
                      <td>
                        <div className="d-flex gap-1">
                          {Array.from({ length: Math.floor(player.score / 500) }, (_, i) => (
                            <span key={i} className="badge bg-warning">🏆</span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">📊 Progress Tracking</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    {userStats.diversificationScore?.toFixed(0)}%
                  </div>
                  <div className="text-muted">Diversification Score</div>
                  <div className="progress mt-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success"
                      style={{ width: `${userStats.diversificationScore}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    {userStats.riskScore?.toFixed(0)}%
                  </div>
                  <div className="text-muted">Risk Management</div>
                  <div className="progress mt-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-warning"
                      style={{ width: `${userStats.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="fs-4 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {userStats.completedGoals}/{goals.length}
                  </div>
                  <div className="text-muted">Goals Completed</div>
                  <div className="progress mt-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-danger"
                      style={{ width: `${(userStats.completedGoals / goals.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
