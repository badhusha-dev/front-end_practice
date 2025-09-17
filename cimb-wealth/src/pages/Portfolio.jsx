import { useEffect, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import investments from '../data/investments.json'
import { mountDiversification } from '../three/portfolio3D'
import PortfolioInsights from '../components/PortfolioInsights.jsx'

export default function Portfolio() {
  const allocation = useMemo(() => Object.values(investments.reduce((acc, i) => {
    acc[i.asset] = acc[i.asset] || { label: i.asset, value: 0 }
    acc[i.asset].value += i.qty * i.price
    return acc
  }, {})), [])

  const columnDefs = useMemo(() => ([
    { field: 'asset', filter: true },
    { field: 'ticker', filter: true },
    { field: 'qty' },
    { field: 'price', valueFormatter: p => `$${p.value}` },
    { headerName: 'Total', valueGetter: p => p.data.qty * p.data.price, valueFormatter: p => `$${p.value}` },
    { field: 'sector' }
  ]), [])

  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      const cleanup = mountDiversification(ref.current, allocation)
      return cleanup
    }
  }, [allocation])

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm glass-card">
            <div className="card-header bg-transparent border-0">Portfolio Diversification (3D)</div>
            <div className="card-body">
              <div ref={ref} style={{ width: '100%', height: 260 }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ag-theme-quartz" style={{ height: 300 }}>
            <AgGridReact rowData={investments} columnDefs={columnDefs} pagination={true} paginationPageSize={8} />
          </div>
        </div>
      </div>
      
      <PortfolioInsights />
    </div>
  )
}


