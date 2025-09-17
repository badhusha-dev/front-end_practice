import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderWithProviders, createMockUser, screen } from './utils.jsx'
import Dashboard from '../pages/Dashboard'

// Mock the child components
vi.mock('../components/DashboardWidgets', () => ({
  default: () => <div data-testid="dashboard-widgets">Dashboard Widgets</div>
}))

vi.mock('../components/AIAdvisor', () => ({
  default: () => <div data-testid="ai-advisor">AI Advisor</div>
}))

vi.mock('../components/RealTimeMarket', () => ({
  default: () => <div data-testid="real-time-market">Real-Time Market</div>
}))

vi.mock('../components/AdvancedAnalytics', () => ({
  default: () => <div data-testid="advanced-analytics">Advanced Analytics</div>
}))

vi.mock('../components/AIRecommendations', () => ({
  default: () => <div data-testid="ai-recommendations">AI Recommendations</div>
}))

vi.mock('../components/BlockchainDeFi', () => ({
  default: () => <div data-testid="blockchain-defi">Blockchain & DeFi</div>
}))

vi.mock('../components/PortfolioOptimization', () => ({
  default: () => <div data-testid="portfolio-optimization">Portfolio Optimization</div>
}))

vi.mock('../components/SocialTrading', () => ({
  default: () => <div data-testid="social-trading">Social Trading</div>
}))

vi.mock('../components/FinancialPlanning', () => ({
  default: () => <div data-testid="financial-planning">Financial Planning</div>
}))

vi.mock('../components/ESGScoring', () => ({
  default: () => <div data-testid="esg-scoring">ESG Scoring</div>
}))

vi.mock('../components/Gamification', () => ({
  default: () => <div data-testid="gamification">Gamification</div>
}))

vi.mock('../components/EnterpriseSecurity', () => ({
  default: () => <div data-testid="enterprise-security">Enterprise Security</div>
}))

vi.mock('../hooks/useTranslation', () => ({
  default: () => <div data-testid="language-selector">Language Selector</div>
}))

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    global.localStorage = localStorageMock
  })

  it('should render dashboard widgets', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByTestId('dashboard-widgets')).toBeInTheDocument()
  })

  it('should render AI advisor', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByTestId('ai-advisor')).toBeInTheDocument()
  })

  it('should render portfolio overview section', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByText('Portfolio Overview')).toBeInTheDocument()
    expect(screen.getByText('Total Holdings')).toBeInTheDocument()
    expect(screen.getByText('YTD Return')).toBeInTheDocument()
    expect(screen.getByText('Risk Profile')).toBeInTheDocument()
  })

  it('should display portfolio metrics', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByText('32')).toBeInTheDocument() // Total Holdings
    expect(screen.getByText('+12.5%')).toBeInTheDocument() // YTD Return
    expect(screen.getByText('Moderate')).toBeInTheDocument() // Risk Profile
  })

  it('should render advanced features tabs', () => {
    renderWithProviders(<Dashboard />)
    
    // Check for tab buttons
    expect(screen.getByText('📈 Real-Time Market')).toBeInTheDocument()
    expect(screen.getByText('📊 Advanced Analytics')).toBeInTheDocument()
    expect(screen.getByText('🤖 AI Recommendations')).toBeInTheDocument()
    expect(screen.getByText('⛓️ Blockchain & DeFi')).toBeInTheDocument()
    expect(screen.getByText('🎯 Portfolio Optimization')).toBeInTheDocument()
    expect(screen.getByText('👥 Social Trading')).toBeInTheDocument()
    expect(screen.getByText('📋 Financial Planning')).toBeInTheDocument()
    expect(screen.getByText('🌱 ESG Scoring')).toBeInTheDocument()
    expect(screen.getByText('🎮 Gamification')).toBeInTheDocument()
    expect(screen.getByText('🔒 Security')).toBeInTheDocument()
  })

  it('should render language selector', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
  })

  it('should render real-time market tab content by default', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByTestId('real-time-market')).toBeInTheDocument()
  })

  it('should have proper CSS classes for styling', () => {
    renderWithProviders(<Dashboard />)
    
    const portfolioCard = screen.getByText('Portfolio Overview').closest('.card')
    expect(portfolioCard).toHaveClass('shadow-sm', 'glass-card')
  })

  it('should display financial data with proper styling', () => {
    renderWithProviders(<Dashboard />)
    
    const ytdReturn = screen.getByText('+12.5%')
    expect(ytdReturn).toHaveClass('chart-positive')
  })

  it('should render all tab content containers', () => {
    renderWithProviders(<Dashboard />)
    
    // Check that all tab content divs exist
    expect(screen.getByTestId('real-time-market')).toBeInTheDocument()
    expect(screen.getByTestId('advanced-analytics')).toBeInTheDocument()
    expect(screen.getByTestId('ai-recommendations')).toBeInTheDocument()
    expect(screen.getByTestId('blockchain-defi')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-optimization')).toBeInTheDocument()
    expect(screen.getByTestId('social-trading')).toBeInTheDocument()
    expect(screen.getByTestId('financial-planning')).toBeInTheDocument()
    expect(screen.getByTestId('esg-scoring')).toBeInTheDocument()
    expect(screen.getByTestId('gamification')).toBeInTheDocument()
    expect(screen.getByTestId('enterprise-security')).toBeInTheDocument()
  })

  it('should have proper Bootstrap classes for responsive design', () => {
    renderWithProviders(<Dashboard />)
    
    const container = screen.getByText('Portfolio Overview').closest('.container-fluid')
    expect(container).toBeInTheDocument()
    
    const row = screen.getByText('Portfolio Overview').closest('.row')
    expect(row).toHaveClass('g-3')
  })
})
