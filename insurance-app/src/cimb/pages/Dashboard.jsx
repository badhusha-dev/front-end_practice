import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { Card, CardBody } from './_parts'
import { transactions, portfolio } from '../data'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function Dashboard() {
  const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'description', headerName: 'Description' },
    { field: 'debit', headerName: 'Debit' },
    { field: 'credit', headerName: 'Credit' },
    { field: 'balance', headerName: 'Balance' },
  ]

  const totalAssets = 150000
  const totalLiabilities = 25000
  const netWorth = totalAssets - totalLiabilities

  return (
    <div className="row g-4">
      <div className="col-md-4"><Card title="Total Assets" value={`$${totalAssets.toLocaleString()}`} color="danger" /></div>
      <div className="col-md-4"><Card title="Total Liabilities" value={`$${totalLiabilities.toLocaleString()}`} color="secondary" /></div>
      <div className="col-md-4"><Card title="Net Worth" value={`$${netWorth.toLocaleString()}`} color="success" /></div>

      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Portfolio Trend</div>
          <div className="card-body" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolio}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#dc3545" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Quick Stats</div>
          <div className="card-body">
            <div className="d-flex justify-content-between"><span>Risk Profile</span><span className="fw-bold">Moderate</span></div>
            <div className="d-flex justify-content-between"><span>Allocation</span><span className="fw-bold">Equity 60% / Bonds 40%</span></div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Recent Transactions</div>
          <div className="card-body p-0">
            <div className="ag-theme-quartz" style={{ height: 300 }}>
              <AgGridReact rowData={transactions} columnDefs={columns} pagination={true} paginationPageSize={8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


