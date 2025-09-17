export const users = [
  { name: 'Alex Tan', accountNumber: 'CIMB-001', role: 'Investor', riskProfile: 'Moderate' },
]

export const investments = [
  { asset: 'CIMB Equity Fund', ticker: 'CIMBEQ', quantity: 1200, price: 1.32, value: 1584, sector: 'Equity' },
  { asset: 'CIMB Bond Fund', ticker: 'CIMBBND', quantity: 800, price: 1.08, value: 864, sector: 'Fixed Income' },
  { asset: 'CIMB Tech ETF', ticker: 'CIMBTECH', quantity: 50, price: 210, value: 10500, sector: 'Technology' },
]

export const transactions = Array.from({ length: 12 }).map((_, i) => ({
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  description: ['Dividend','Buy','Sell'][i%3],
  debit: i%3===1 ? (100 + i*10) : 0,
  credit: i%3===0 ? (50 + i*5) : 0,
  balance: 10000 + i*120,
}))

export const portfolio = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  value: 10000 + i * 450 + (i%2 ? 300 : -150)
}))

export const goals = [
  { goalName: 'Retirement', targetAmount: 500000, currentAmount: 120000, deadline: '2035-12-31' },
  { goalName: 'Kids Education', targetAmount: 200000, currentAmount: 60000, deadline: '2030-06-30' },
]


