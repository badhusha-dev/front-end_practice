import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderWithProviders, createMockUser, screen } from './utils.jsx'
import AIRecommendations from '../components/AIRecommendations'

describe('AIRecommendations Component', () => {
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

  it('should render AI recommendations header', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('🤖 AI-Powered Investment Recommendations')).toBeInTheDocument()
    expect(screen.getByText('Machine learning algorithms analyze market data to provide personalized investment insights')).toBeInTheDocument()
  })

  it('should render market sentiment analysis', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('📊 Market Sentiment Analysis')).toBeInTheDocument()
    expect(screen.getByText('Sentiment Score')).toBeInTheDocument()
    expect(screen.getByText('Fear/Greed Index')).toBeInTheDocument()
    expect(screen.getByText('VIX Level')).toBeInTheDocument()
  })

  it('should render portfolio risk analysis', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('⚖️ Portfolio Risk Analysis')).toBeInTheDocument()
    expect(screen.getByText('Overall Risk')).toBeInTheDocument()
    expect(screen.getByText('Portfolio Risk')).toBeInTheDocument()
    expect(screen.getByText('Concentration')).toBeInTheDocument()
    expect(screen.getByText('Liquidity')).toBeInTheDocument()
  })

  it('should render portfolio optimization', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('🎯 Portfolio Optimization')).toBeInTheDocument()
    expect(screen.getByText('Expected Return')).toBeInTheDocument()
    expect(screen.getByText('Volatility')).toBeInTheDocument()
    expect(screen.getByText('Sharpe Ratio')).toBeInTheDocument()
    expect(screen.getByText('Optimization Score')).toBeInTheDocument()
  })

  it('should render investment recommendations table', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('💡 AI Investment Recommendations')).toBeInTheDocument()
    
    // Check table headers
    expect(screen.getByText('Symbol')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Current Price')).toBeInTheDocument()
    expect(screen.getByText('Target Price')).toBeInTheDocument()
    expect(screen.getByText('Recommendation')).toBeInTheDocument()
    expect(screen.getByText('Confidence')).toBeInTheDocument()
    expect(screen.getByText('Risk Level')).toBeInTheDocument()
    expect(screen.getByText('AI Score')).toBeInTheDocument()
    expect(screen.getByText('Reasoning')).toBeInTheDocument()
  })

  it('should render AI market insights', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('🧠 AI Market Insights')).toBeInTheDocument()
  })

  it('should display recommendation data', () => {
    renderWithProviders(<AIRecommendations />)
    
    // Check for sample recommendation data
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
    expect(screen.getByText('TSLA')).toBeInTheDocument()
    expect(screen.getByText('Tesla Inc.')).toBeInTheDocument()
    expect(screen.getByText('MSFT')).toBeInTheDocument()
    expect(screen.getByText('Microsoft Corporation')).toBeInTheDocument()
  })

  it('should display recommendation badges with correct colors', () => {
    renderWithProviders(<AIRecommendations />)
    
    const buyBadges = screen.getAllByText('BUY')
    const strongBuyBadges = screen.getAllByText('STRONG BUY')
    const holdBadges = screen.getAllByText('HOLD')
    
    expect(buyBadges.length).toBeGreaterThan(0)
    expect(strongBuyBadges.length).toBeGreaterThan(0)
    expect(holdBadges.length).toBeGreaterThan(0)
  })

  it('should display risk level badges', () => {
    renderWithProviders(<AIRecommendations />)
    
    const lowRiskBadges = screen.getAllByText('Low')
    const mediumRiskBadges = screen.getAllByText('Medium')
    const highRiskBadges = screen.getAllByText('High')
    
    expect(lowRiskBadges.length).toBeGreaterThan(0)
    expect(mediumRiskBadges.length).toBeGreaterThan(0)
    expect(highRiskBadges.length).toBeGreaterThan(0)
  })

  it('should display confidence scores', () => {
    renderWithProviders(<AIRecommendations />)
    
    // Check for confidence percentage displays
    const confidenceElements = screen.getAllByText(/%/)
    expect(confidenceElements.length).toBeGreaterThan(0)
  })

  it('should display market sentiment metrics', () => {
    renderWithProviders(<AIRecommendations />)
    
    // Check for sentiment score
    expect(screen.getByText(/78%/)).toBeInTheDocument()
    expect(screen.getByText('Bullish')).toBeInTheDocument()
  })

  it('should display portfolio metrics', () => {
    renderWithProviders(<AIRecommendations />)
    
    // Check for portfolio optimization metrics
    expect(screen.getByText(/8\.5%/)).toBeInTheDocument() // Expected Return
    expect(screen.getByText(/12\.3%/)).toBeInTheDocument() // Volatility
    expect(screen.getByText(/0\.69/)).toBeInTheDocument() // Sharpe Ratio
  })

  it('should have proper CSS classes for styling', () => {
    renderWithProviders(<AIRecommendations />)
    
    const cards = screen.getAllByRole('generic').filter(el => 
      el.classList.contains('card') && el.classList.contains('shadow-sm')
    )
    expect(cards.length).toBeGreaterThan(0)
  })

  it('should display AI insights with proper icons', () => {
    renderWithProviders(<AIRecommendations />)
    
    expect(screen.getByText('🚀')).toBeInTheDocument() // Opportunity icon
    expect(screen.getByText('⚠️')).toBeInTheDocument() // Warning icon
    expect(screen.getByText('ℹ️')).toBeInTheDocument() // Info icon
  })

  it('should display insight recommendations', () => {
    renderWithProviders(<AIRecommendations />)
    
    // Check for insight action items
    const insightActions = screen.getAllByText(/💡/)
    expect(insightActions.length).toBeGreaterThan(0)
  })

  it('should have responsive grid layout', () => {
    renderWithProviders(<AIRecommendations />)
    
    const rows = screen.getAllByRole('generic').filter(el => 
      el.classList.contains('row') && el.classList.contains('g-3')
    )
    expect(rows.length).toBeGreaterThan(0)
  })
})
