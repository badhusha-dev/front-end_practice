import { motion } from 'framer-motion'
import DashboardWidgets from '../components/DashboardWidgets.jsx'
import AIAdvisor from '../components/AIAdvisor.jsx'
import RealTimeMarket from '../components/RealTimeMarket.jsx'
import AdvancedAnalytics from '../components/AdvancedAnalytics.jsx'
import Gamification from '../components/Gamification.jsx'
import EnterpriseSecurity from '../components/EnterpriseSecurity.jsx'
import AIRecommendations from '../components/AIRecommendations.jsx'
import BlockchainDeFi from '../components/BlockchainDeFi.jsx'
import PortfolioOptimization from '../components/PortfolioOptimization.jsx'
import SocialTrading from '../components/SocialTrading.jsx'
import FinancialPlanning from '../components/FinancialPlanning.jsx'
import ESGScoring from '../components/ESGScoring.jsx'
import LanguageSelector from '../hooks/useTranslation.js'

export default function Dashboard() {
  return (
    <div>
      <DashboardWidgets />
      
      <div className="row g-3">
        <div className="col-lg-8">
          <motion.div 
            className="card shadow-sm glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">Portfolio Overview</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="fs-4 fw-bold" style={{ color: 'var(--cimb-red)' }}>32</div>
                    <div className="text-muted">Total Holdings</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="fs-4 fw-bold chart-positive">+12.5%</div>
                    <div className="text-muted">YTD Return</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="fs-4 fw-bold chart-neutral">Moderate</div>
                    <div className="text-muted">Risk Profile</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col-lg-4">
          <AIAdvisor />
        </div>
      </div>

      {/* Advanced Features Tabs */}
      <div className="row g-3 mt-4">
        <div className="col-12">
          <div className="card shadow-sm glass-card">
            <div className="card-header bg-transparent border-0">
              <ul className="nav nav-tabs" id="advancedTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="market-tab" data-bs-toggle="tab" data-bs-target="#market" type="button" role="tab">
                    📈 Real-Time Market
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="analytics-tab" data-bs-toggle="tab" data-bs-target="#analytics" type="button" role="tab">
                    📊 Advanced Analytics
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="ai-recommendations-tab" data-bs-toggle="tab" data-bs-target="#ai-recommendations" type="button" role="tab">
                    🤖 AI Recommendations
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="blockchain-tab" data-bs-toggle="tab" data-bs-target="#blockchain" type="button" role="tab">
                    ⛓️ Blockchain & DeFi
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="optimization-tab" data-bs-toggle="tab" data-bs-target="#optimization" type="button" role="tab">
                    🎯 Portfolio Optimization
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social" type="button" role="tab">
                    👥 Social Trading
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="planning-tab" data-bs-toggle="tab" data-bs-target="#planning" type="button" role="tab">
                    📋 Financial Planning
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="esg-tab" data-bs-toggle="tab" data-bs-target="#esg" type="button" role="tab">
                    🌱 ESG Scoring
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="gamification-tab" data-bs-toggle="tab" data-bs-target="#gamification" type="button" role="tab">
                    🎮 Gamification
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab">
                    🔒 Security
                  </button>
                </li>
                <li className="nav-item ms-auto">
                  <LanguageSelector />
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="advancedTabsContent">
                <div className="tab-pane fade show active" id="market" role="tabpanel">
                  <RealTimeMarket />
                </div>
                <div className="tab-pane fade" id="analytics" role="tabpanel">
                  <AdvancedAnalytics />
                </div>
                <div className="tab-pane fade" id="ai-recommendations" role="tabpanel">
                  <AIRecommendations />
                </div>
                <div className="tab-pane fade" id="blockchain" role="tabpanel">
                  <BlockchainDeFi />
                </div>
                <div className="tab-pane fade" id="optimization" role="tabpanel">
                  <PortfolioOptimization />
                </div>
                <div className="tab-pane fade" id="social" role="tabpanel">
                  <SocialTrading />
                </div>
                <div className="tab-pane fade" id="planning" role="tabpanel">
                  <FinancialPlanning />
                </div>
                <div className="tab-pane fade" id="esg" role="tabpanel">
                  <ESGScoring />
                </div>
                <div className="tab-pane fade" id="gamification" role="tabpanel">
                  <Gamification />
                </div>
                <div className="tab-pane fade" id="security" role="tabpanel">
                  <EnterpriseSecurity />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


