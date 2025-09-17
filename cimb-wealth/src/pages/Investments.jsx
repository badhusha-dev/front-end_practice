import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from '../store'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import baseData from '../data/investments.json'
import { fetchLivePrice } from '../services/market'

export default function Investments() {
  const dispatch = useDispatch()
  const [data, setData] = useState(baseData)
  const [quickFilter, setQuickFilter] = useState('')
  const gridRef = useRef(null)
  const [live, setLive] = useState(() => localStorage.getItem('live_prices') !== 'off')
  const [thresholds, setThresholds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('price_thresholds')) || {} } catch { return {} }
  })

  useEffect(() => {
    let active = true
    async function tick() {
      if (!live) return
      const updated = await Promise.all(data.map(async (row) => ({
        ...row,
        price: await fetchLivePrice(row.ticker)
      })))
      if (active) setData(updated)
      // Alerts
      updated.forEach(r => {
        const t = thresholds[r.ticker]
        if (!t) return
        if (typeof t.above === 'number' && r.price >= t.above) {
          dispatch(push({ type: 'warning', message: `${r.ticker} crossed above ${t.above}` }))
        }
        if (typeof t.below === 'number' && r.price <= t.below) {
          dispatch(push({ type: 'warning', message: `${r.ticker} fell below ${t.below}` }))
        }
      })
    }
    tick()
    const id = setInterval(tick, 5000)
    return () => { active = false; clearInterval(id) }
  }, [live])

  const columnDefs = useMemo(() => ([
    { field: 'asset', filter: true },
    { field: 'ticker', filter: true },
    { field: 'qty', headerName: 'Quantity' },
    { field: 'price', headerName: 'Price', valueFormatter: p => `$${p.value}` },
    { headerName: 'Total', valueGetter: p => p.data.qty * p.data.price, valueFormatter: p => `$${p.value}` },
    { field: 'sector', filter: true }
  ]), [])

  return (
    <div>
      <div className="d-flex align-items-center mb-3 gap-2">
        <h3 className="mb-0">Investments</h3>
        <input 
          className="form-control ms-auto" 
          style={{ maxWidth: 280 }} 
          placeholder="Search..."
          value={quickFilter}
          onChange={(e)=>{
            setQuickFilter(e.target.value)
            gridRef.current?.api?.setQuickFilter(e.target.value)
          }}
        />
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="liveToggle"
            checked={live}
            onChange={(e)=>{
              const v = e.target.checked
              setLive(v)
              localStorage.setItem('live_prices', v ? 'on' : 'off')
            }}
          />
          <label className="form-check-label" htmlFor="liveToggle">Live prices</label>
        </div>
        <button 
          className="btn btn-outline-secondary btn-sm"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#thresholdModal"
        >
          Alerts
        </button>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact 
          ref={gridRef}
          rowData={data} 
          columnDefs={columnDefs} 
          pagination={true} 
          paginationPageSize={10} 
          rowSelection="multiple"
        />
      </div>

      {/* Threshold Modal */}
      <div className="modal fade" id="thresholdModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Price Alerts</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="small text-muted mb-2">Set alert thresholds per ticker (above/below)</div>
              <div className="d-flex flex-column gap-2" style={{ maxHeight: 300, overflowY: 'auto' }}>
                {baseData.slice(0, 20).map(r => (
                  <div key={r.ticker} className="d-flex align-items-center gap-2">
                    <div style={{ width: 90 }}>{r.ticker}</div>
                    <input 
                      className="form-control form-control-sm" 
                      placeholder="Above"
                      type="number"
                      value={thresholds[r.ticker]?.above ?? ''}
                      onChange={(e)=>{
                        const v = e.target.value === '' ? undefined : Number(e.target.value)
                        setThresholds(prev => {
                          const next = { ...prev, [r.ticker]: { ...(prev[r.ticker]||{}), above: v } }
                          localStorage.setItem('price_thresholds', JSON.stringify(next))
                          return next
                        })
                      }}
                      style={{ maxWidth: 120 }}
                    />
                    <input 
                      className="form-control form-control-sm" 
                      placeholder="Below"
                      type="number"
                      value={thresholds[r.ticker]?.below ?? ''}
                      onChange={(e)=>{
                        const v = e.target.value === '' ? undefined : Number(e.target.value)
                        setThresholds(prev => {
                          const next = { ...prev, [r.ticker]: { ...(prev[r.ticker]||{}), below: v } }
                          localStorage.setItem('price_thresholds', JSON.stringify(next))
                          return next
                        })
                      }}
                      style={{ maxWidth: 120 }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-outline-danger" onClick={()=>{ setThresholds({}); localStorage.removeItem('price_thresholds') }}>Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


