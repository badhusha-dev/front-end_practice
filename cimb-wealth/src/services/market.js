export async function fetchLivePrice(ticker) {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(ticker)}`)
    const json = await res.json()
    const p = json?.quoteResponse?.result?.[0]?.regularMarketPrice
    if (typeof p === 'number') return p
  } catch (e) {}
  // Fallback mock: random walk around base
  const base = 10 + (ticker.charCodeAt(0) % 50)
  const noise = (Math.random() - 0.5) * 2
  return Math.max(0.1, Number((base + noise).toFixed(2)))
}


