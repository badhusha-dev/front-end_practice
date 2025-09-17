import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { investments as base } from '../data'

export default function Investments() {
  const [rowData, setRowData] = useState(base)

  useEffect(() => {
    const id = setInterval(() => {
      setRowData(prev => prev.map(it => ({ ...it, price: +(it.price * (0.99 + Math.random()*0.02)).toFixed(2), value: +(it.quantity * it.price).toFixed(2) })))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const columnDefs = useMemo(() => ([
    { field: 'asset', headerName: 'Asset', filter: true, pinned: 'left' },
    { field: 'ticker', headerName: 'Ticker', filter: true },
    { field: 'quantity', headerName: 'Qty', filter: true },
    { field: 'price', headerName: 'Price', filter: true },
    { field: 'value', headerName: 'Value', filter: true },
    { field: 'sector', headerName: 'Sector', filter: true },
  ]), [])

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <span>Investments</span>
        <input className="form-control form-control-sm" style={{ maxWidth: 240 }} placeholder="Search..." onChange={(e)=>{
          const v = e.target.value.toLowerCase()
          setRowData(base.filter(it => JSON.stringify(it).toLowerCase().includes(v)))
        }} />
      </div>
      <div className="card-body p-0">
        <div className="ag-theme-quartz" style={{ height: 460 }}>
          <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
        </div>
      </div>
    </div>
  )
}


