import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function BlockchainDeFi() {
  const [defiProtocols, setDefiProtocols] = useState([])
  const [cryptoHoldings, setCryptoHoldings] = useState([])
  const [yieldFarming, setYieldFarming] = useState([])
  const [nftPortfolio, setNftPortfolio] = useState([])
  const [blockchainMetrics, setBlockchainMetrics] = useState({})
  const [defiRisks, setDefiRisks] = useState([])
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    // Generate DeFi protocols
    const defiProtocols = [
      {
        id: 1,
        name: 'Uniswap V3',
        type: 'DEX',
        tvl: 3.2,
        apy: 12.5,
        risk: 'Medium',
        description: 'Decentralized exchange with concentrated liquidity',
        tokens: ['ETH', 'USDC', 'WBTC'],
        fees: 0.3,
        volume24h: 450.2,
        users: 125000
      },
      {
        id: 2,
        name: 'Aave V3',
        type: 'Lending',
        tvl: 5.8,
        apy: 8.7,
        risk: 'Low',
        description: 'Decentralized lending and borrowing protocol',
        tokens: ['ETH', 'USDC', 'DAI', 'LINK'],
        fees: 0.09,
        volume24h: 280.5,
        users: 89000
      },
      {
        id: 3,
        name: 'Compound',
        type: 'Lending',
        tvl: 2.1,
        apy: 6.2,
        risk: 'Low',
        description: 'Algorithmic money markets',
        tokens: ['ETH', 'USDC', 'USDT'],
        fees: 0.05,
        volume24h: 120.8,
        users: 45000
      },
      {
        id: 4,
        name: 'Curve Finance',
        type: 'DEX',
        tvl: 1.9,
        apy: 15.3,
        risk: 'Medium',
        description: 'Stablecoin and pegged asset exchange',
        tokens: ['USDC', 'USDT', 'DAI', 'FRAX'],
        fees: 0.04,
        volume24h: 180.3,
        users: 67000
      },
      {
        id: 5,
        name: 'Yearn Finance',
        type: 'Yield Aggregator',
        tvl: 0.8,
        apy: 18.7,
        risk: 'High',
        description: 'Automated yield farming strategies',
        tokens: ['ETH', 'WBTC', 'USDC'],
        fees: 2.0,
        volume24h: 95.6,
        users: 23000
      }
    ]
    setDefiProtocols(defiProtocols)

    // Generate crypto holdings
    const cryptoHoldings = [
      {
        id: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.25,
        price: 43250.00,
        value: 10812.50,
        change24h: 2.3,
        marketCap: 850.2,
        dominance: 42.5,
        category: 'Store of Value'
      },
      {
        id: 2,
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 2.5,
        price: 2650.00,
        value: 6625.00,
        change24h: -1.2,
        marketCap: 320.8,
        dominance: 18.2,
        category: 'Smart Contract Platform'
      },
      {
        id: 3,
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 5000,
        price: 1.00,
        value: 5000.00,
        change24h: 0.0,
        marketCap: 28.5,
        dominance: 1.6,
        category: 'Stablecoin'
      },
      {
        id: 4,
        symbol: 'LINK',
        name: 'Chainlink',
        amount: 150,
        price: 14.25,
        value: 2137.50,
        change24h: 5.7,
        marketCap: 8.2,
        dominance: 0.5,
        category: 'Oracle'
      },
      {
        id: 5,
        symbol: 'UNI',
        name: 'Uniswap',
        amount: 200,
        price: 6.85,
        value: 1370.00,
        change24h: -2.1,
        marketCap: 4.1,
        dominance: 0.2,
        category: 'DeFi Token'
      }
    ]
    setCryptoHoldings(cryptoHoldings)

    // Generate yield farming positions
    const yieldFarming = [
      {
        id: 1,
        protocol: 'Uniswap V3',
        pair: 'ETH/USDC',
        liquidity: 5000,
        apy: 12.5,
        fees: 45.20,
        impermanentLoss: 2.3,
        duration: '30 days',
        status: 'Active'
      },
      {
        id: 2,
        protocol: 'Aave V3',
        asset: 'USDC',
        supplied: 2000,
        apy: 8.7,
        earned: 12.45,
        collateralRatio: 0.75,
        duration: '45 days',
        status: 'Active'
      },
      {
        id: 3,
        protocol: 'Compound',
        asset: 'ETH',
        supplied: 1.5,
        apy: 6.2,
        earned: 8.90,
        collateralRatio: 0.65,
        duration: '60 days',
        status: 'Active'
      }
    ]
    setYieldFarming(yieldFarming)

    // Generate NFT portfolio
    const nftPortfolio = [
      {
        id: 1,
        name: 'Bored Ape #1234',
        collection: 'Bored Ape Yacht Club',
        floorPrice: 15.5,
        lastSale: 18.2,
        rarity: 'Rare',
        image: '🐵',
        category: 'PFP',
        owned: true
      },
      {
        id: 2,
        name: 'CryptoPunk #5678',
        collection: 'CryptoPunks',
        floorPrice: 45.2,
        lastSale: 52.8,
        rarity: 'Legendary',
        image: '👽',
        category: 'PFP',
        owned: true
      },
      {
        id: 3,
        name: 'Art Blocks #9012',
        collection: 'Art Blocks',
        floorPrice: 2.8,
        lastSale: 3.1,
        rarity: 'Common',
        image: '🎨',
        category: 'Generative Art',
        owned: true
      }
    ]
    setNftPortfolio(nftPortfolio)

    // Generate blockchain metrics
    const blockchainMetrics = {
      totalValue: cryptoHoldings.reduce((sum, crypto) => sum + crypto.value, 0),
      defiTvl: defiProtocols.reduce((sum, protocol) => sum + protocol.tvl, 0),
      nftValue: nftPortfolio.reduce((sum, nft) => sum + nft.lastSale, 0),
      yieldEarned: yieldFarming.reduce((sum, farm) => sum + farm.earned, 0),
      totalApy: 12.3,
      gasFees: 45.20,
      transactions: 1250,
      activeProtocols: defiProtocols.length
    }
    setBlockchainMetrics(blockchainMetrics)

    // Generate DeFi risks
    const defiRisks = [
      {
        id: 1,
        type: 'Smart Contract Risk',
        level: 'Medium',
        description: 'Potential vulnerabilities in smart contract code',
        mitigation: 'Use audited protocols, diversify across platforms',
        impact: 'Medium'
      },
      {
        id: 2,
        type: 'Impermanent Loss',
        level: 'High',
        description: 'Loss due to price divergence in liquidity pools',
        mitigation: 'Choose stable pairs, monitor price ratios',
        impact: 'High'
      },
      {
        id: 3,
        type: 'Liquidation Risk',
        level: 'Medium',
        description: 'Risk of position liquidation in lending protocols',
        mitigation: 'Maintain healthy collateral ratios',
        impact: 'Medium'
      },
      {
        id: 4,
        type: 'Regulatory Risk',
        level: 'High',
        description: 'Changing regulatory landscape for DeFi',
        mitigation: 'Stay informed, use compliant platforms',
        impact: 'High'
      }
    ]
    setDefiRisks(defiRisks)
  }, [])

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'var(--cimb-teal)'
      case 'Medium': return 'var(--cimb-gold)'
      case 'High': return 'var(--cimb-red)'
      default: return 'var(--cimb-red)'
    }
  }

  const getChangeColor = (change) => {
    if (change > 0) return 'var(--cimb-teal)'
    if (change < 0) return 'var(--cimb-red)'
    return 'var(--cimb-gold)'
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return '#6B7280'
      case 'Rare': return '#3B82F6'
      case 'Epic': return '#8B5CF6'
      case 'Legendary': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  return (
    <div className="row g-3">
      {/* Blockchain Overview */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">⛓️ Blockchain & DeFi Portfolio</h5>
            <p className="text-muted mb-0">Decentralized finance and cryptocurrency holdings</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    ${blockchainMetrics.totalValue?.toLocaleString()}
                  </div>
                  <div className="text-muted">Total Crypto Value</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                    ${blockchainMetrics.defiTvl?.toFixed(1)}B
                  </div>
                  <div className="text-muted">DeFi TVL</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-gold)' }}>
                    ${blockchainMetrics.nftValue?.toFixed(1)}K
                  </div>
                  <div className="text-muted">NFT Portfolio</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="fs-3 fw-bold" style={{ color: 'var(--cimb-red)' }}>
                    {blockchainMetrics.totalApy}%
                  </div>
                  <div className="text-muted">Average APY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Holdings */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">💰 Cryptocurrency Holdings</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>24h Change</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoHoldings.map((crypto, index) => (
                    <motion.tr
                      key={crypto.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-2 fs-5">{crypto.symbol === 'BTC' ? '₿' : crypto.symbol === 'ETH' ? 'Ξ' : '🪙'}</div>
                          <div>
                            <div className="fw-semibold">{crypto.symbol}</div>
                            <div className="small text-muted">{crypto.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="financial-data">{crypto.amount}</td>
                      <td className="financial-data">${crypto.price.toLocaleString()}</td>
                      <td className="financial-data">${crypto.value.toLocaleString()}</td>
                      <td className={`financial-data ${crypto.change24h >= 0 ? 'chart-positive' : 'chart-negative'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                      </td>
                      <td>
                        <span className="badge bg-secondary small">{crypto.category}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* DeFi Protocols */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🏦 DeFi Protocols</h6>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              {defiProtocols.map((protocol, index) => (
                <motion.div
                  key={protocol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title mb-1 small">{protocol.name}</h6>
                        <p className="card-text small text-muted mb-1">{protocol.description}</p>
                        <div className="d-flex gap-2">
                          <span className="badge bg-primary small">{protocol.type}</span>
                          <span 
                            className="badge small"
                            style={{ backgroundColor: getRiskColor(protocol.risk) }}
                          >
                            {protocol.risk} Risk
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold" style={{ color: 'var(--cimb-teal)' }}>
                          {protocol.apy}% APY
                        </div>
                        <div className="small text-muted">${protocol.tvl}B TVL</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yield Farming */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🌾 Yield Farming Positions</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Protocol</th>
                    <th>Asset/Pair</th>
                    <th>Amount</th>
                    <th>APY</th>
                    <th>Earned</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {yieldFarming.map((farm, index) => (
                    <motion.tr
                      key={farm.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="fw-semibold small">{farm.protocol}</td>
                      <td className="small">{farm.pair || farm.asset}</td>
                      <td className="financial-data">${farm.liquidity || farm.supplied}</td>
                      <td className="financial-data" style={{ color: 'var(--cimb-teal)' }}>
                        {farm.apy}%
                      </td>
                      <td className="financial-data" style={{ color: 'var(--cimb-gold)' }}>
                        ${farm.earned}
                      </td>
                      <td>
                        <span className="badge bg-success small">{farm.status}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Portfolio */}
      <div className="col-lg-6">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">🎨 NFT Portfolio</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {nftPortfolio.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  className="col-md-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card h-100" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="card-body text-center">
                      <div className="fs-2 mb-2">{nft.image}</div>
                      <h6 className="card-title small">{nft.name}</h6>
                      <p className="card-text small text-muted">{nft.collection}</p>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <div className="small text-muted">Floor</div>
                          <div className="fw-bold small">${nft.floorPrice}K</div>
                        </div>
                        <div>
                          <div className="small text-muted">Last Sale</div>
                          <div className="fw-bold small">${nft.lastSale}K</div>
                        </div>
                      </div>
                      <span 
                        className="badge"
                        style={{ backgroundColor: getRarityColor(nft.rarity) }}
                      >
                        {nft.rarity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DeFi Risks */}
      <div className="col-12">
        <div className="card shadow-sm glass-card">
          <div className="card-header bg-transparent border-0">
            <h6 className="mb-0">⚠️ DeFi Risk Assessment</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {defiRisks.map((risk, index) => (
                <motion.div
                  key={risk.id}
                  className="col-md-6 col-lg-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="card h-100"
                    style={{ 
                      borderLeft: `4px solid ${getRiskColor(risk.level)}`,
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="fs-4">⚠️</div>
                        <span 
                          className="badge"
                          style={{ backgroundColor: getRiskColor(risk.level) }}
                        >
                          {risk.level}
                        </span>
                      </div>
                      <h6 className="card-title small">{risk.type}</h6>
                      <p className="card-text small text-muted">{risk.description}</p>
                      <div className="mt-2">
                        <small className="fw-semibold" style={{ color: 'var(--cimb-teal)' }}>
                          💡 {risk.mitigation}
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
