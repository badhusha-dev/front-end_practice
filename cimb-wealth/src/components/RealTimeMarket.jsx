import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { push } from '../store'
import investments from '../data/investments.json'

// Market data simulation
class MarketDataSimulator {
  constructor() {
    this.subscribers = new Set()
    this.isRunning = false
    this.marketData = {}
    this.initializeMarketData()
  }

  initializeMarketData() {
    investments.forEach(inv => {
      this.marketData[inv.ticker] = {
        price: inv.price,
        change: 0,
        changePercent: 0,
        volume: Math.floor(Math.random() * 1000000),
        lastUpdate: new Date(),
        trend: 'stable',
        volatility: Math.random() * 0.3 + 0.1
      }
    })
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.updateLoop()
  }

  stop() {
    this.isRunning = false
  }

  subscribe(callback) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  updateLoop() {
    if (!this.isRunning) return

    // Simulate market movements
    Object.keys(this.marketData).forEach(ticker => {
      const data = this.marketData[ticker]
      const volatility = data.volatility
      const change = (Math.random() - 0.5) * volatility * data.price
      const newPrice = Math.max(0.01, data.price + change)
      
      data.change = newPrice - data.price
      data.changePercent = (data.change / data.price) * 100
      data.price = newPrice
      data.lastUpdate = new Date()
      data.volume += Math.floor(Math.random() * 10000)
      
      // Determine trend
      if (data.changePercent > 2) data.trend = 'bullish'
      else if (data.changePercent < -2) data.trend = 'bearish'
      else data.trend = 'stable'
    })

    // Notify subscribers
    this.subscribers.forEach(callback => callback(this.marketData))

    // Schedule next update
    setTimeout(() => this.updateLoop(), 2000 + Math.random() * 3000)
  }

  getMarketData() {
    return this.marketData
  }
}

const marketSimulator = new MarketDataSimulator()

export default function RealTimeMarket() {
  const [marketData, setMarketData] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [selectedTicker, setSelectedTicker] = useState('CIMB')
  const dispatch = useDispatch()
  const notifications = useSelector(s => s.notifications.items)

  useEffect(() => {
    const unsubscribe = marketSimulator.subscribe((data) => {
      setMarketData(data)
      
      // Generate alerts for significant movements
      Object.entries(data).forEach(([ticker, info]) => {
        if (Math.abs(info.changePercent) > 5) {
          const alert = {
            id: `${ticker}-${Date.now()}`,
            ticker,
            type: info.changePercent > 0 ? 'success' : 'warning',
            message: `${ticker} ${info.changePercent > 0 ? 'surged' : 'plummeted'} ${Math.abs(info.changePercent).toFixed(1)}%`,
            price: info.price,
            change: info.change,
            timestamp: new Date()
          }
          
          dispatch(push({
            type: alert.type,
            message: alert.message
          }))
        }
      })
    })

    return unsubscribe
  }, [dispatch])

  const startMarketSimulation = () => {
    marketSimulator.start()
    setIsConnected(true)
    dispatch(push({ type: 'success', message: 'Real-time market data connected' }))
  }

  const stopMarketSimulation = () => {
    marketSimulator.stop()
    setIsConnected(false)
    dispatch(push({ type: 'info', message: 'Market simulation stopped' }))
  }

  const getTopMovers = () => {
    return Object.entries(marketData)
      .map(([ticker, data]) => ({ ticker, ...data }))
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 5)
  }

  const getMarketSummary = () => {
    const data = Object.values(marketData)
    const totalChange = data.reduce((sum, d) => sum + d.changePercent, 0)
    const avgChange = totalChange / data.length
    const bullishCount = data.filter(d => d.trend === 'bullish').length
    const bearishCount = data.filter(d => d.trend === 'bearish').length
    
    return {
      avgChange,
      bullishCount,
      bearishCount,
      totalStocks: data.length
    }
  }

  const summary = getMarketSummary()
  const topMovers = getTopMovers()

  return (
    <div className="row g-3">
      {/* Market Controls */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Real-Time Market Data</h5>
            <div className="d-flex align-items-center gap-2">
              <div className={`badge ${isConnected ? 'bg-success' : 'bg-secondary'}`}>
                {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
              </div>
              <button 
                className={`btn btn-sm ${isConnected ? 'btn-outline-danger' : 'btn-cimb-primary'}`}
                onClick={isConnected ? stopMarketSimulation : startMarketSimulation}
              >
                {isConnected ? 'Stop Simulation' : 'Start Live Data'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Market Summary */}
      <div className="col-lg-4">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">Market Summary</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center">
                  <div className={`fs-4 fw-bold ${summary.avgChange >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                    {summary.avgChange >= 0 ? '+' : ''}{summary.avgChange.toFixed(2)}%
                  </div>
                  <div className="text-muted small">Avg Change</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-4 fw-bold chart-positive">{summary.bullishCount}</div>
                  <div className="text-muted small">Bullish</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-4 fw-bold chart-negative">{summary.bearishCount}</div>
                  <div className="text-muted small">Bearish</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <div className="fs-4 fw-bold" style={{ color: 'var(--cimb-red)' }}>{summary.totalStocks}</div>
                  <div className="text-muted small">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Movers */}
      <div className="col-lg-8">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">Top Movers</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>% Change</th>
                    <th>Volume</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topMovers.map((stock, index) => (
                    <motion.tr
                      key={stock.ticker}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-semibold">{stock.ticker}</td>
                      <td className="financial-data">${stock.price.toFixed(2)}</td>
                      <td className={`financial-data ${stock.change >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                        {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                      </td>
                      <td className={`financial-data ${stock.changePercent >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="financial-data">{stock.volume.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          stock.trend === 'bullish' ? 'bg-success' : 
                          stock.trend === 'bearish' ? 'bg-danger' : 'bg-secondary'
                        }`}>
                          {stock.trend === 'bullish' ? '📈' : stock.trend === 'bearish' ? '📉' : '➡️'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Live Price Chart */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">Live Price Movement - {selectedTicker}</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={selectedTicker}
                  onChange={(e) => setSelectedTicker(e.target.value)}
                >
                  {Object.keys(marketData).map(ticker => (
                    <option key={ticker} value={ticker}>{ticker}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-9">
                {marketData[selectedTicker] && (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fs-3 fw-bold financial-data">
                        ${marketData[selectedTicker].price.toFixed(2)}
                      </div>
                      <div className={`small ${marketData[selectedTicker].changePercent >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                        {marketData[selectedTicker].changePercent >= 0 ? '+' : ''}{marketData[selectedTicker].changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="small text-muted">Last Update</div>
                      <div className="small">{marketData[selectedTicker].lastUpdate.toLocaleTimeString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
