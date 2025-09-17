import { portfolio, investments } from '../data'
import { exportToPDF, exportToExcel } from '../../utils/reportGenerator'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'

export default function Reports() {
  const allocation = Object.values(investments.reduce((acc, i) => { acc[i.sector] = (acc[i.sector]||0) + i.value; return acc }, {})).map((v, idx) => v)
  const sectors = Object.keys(investments.reduce((acc, i) => { acc[i.sector] = (acc[i.sector]||0) + i.value; return acc }, {}))
  const pieData = sectors.map((s, idx) => ({ name: s, value: investments.filter(i=>i.sector===s).reduce((s2,i)=>s2+i.value,0) }))
  const colors = ['#dc3545','#6c757d','#0d6efd','#198754','#fd7e14']

  const exportInvestmentsPDF = () => exportToPDF('CIMB Investments', ['asset','ticker','quantity','price','value','sector'], investments)
  const exportInvestmentsExcel = () => exportToExcel('CIMB Investments', ['asset','ticker','quantity','price','value','sector'], investments)

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span>Investments Export</span>
            <div className="btn-group">
              <button className="btn btn-outline-light btn-sm" onClick={exportInvestmentsPDF}>PDF</button>
              <button className="btn btn-outline-light btn-sm" onClick={exportInvestmentsExcel}>Excel</button>
            </div>
          </div>
          <div className="card-body">
            Export current holdings to PDF or Excel.
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Allocation by Sector</div>
          <div className="card-body" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Portfolio Growth</div>
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

      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Sector Breakdown</div>
          <div className="card-body" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="value" fill="#dc3545" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}


