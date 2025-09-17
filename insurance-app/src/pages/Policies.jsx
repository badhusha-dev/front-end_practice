import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { policies as initialPolicies } from '../data/dummyData'
import { useState as useReactState } from 'react'
import { useNotifications } from '../context/NotificationsContext'

export default function Policies() {
  const [rowData, setRowData] = useState(initialPolicies)
  const { addNotification } = useNotifications()
  const [form, setForm] = useState({ 
    policyNo: '', 
    holderName: '', 
    type: 'Life', 
    premium: 0, 
    startDate: new Date().toISOString().slice(0, 10),
    status: 'Active' 
  })
  const [showModal, setShowModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [errors, setErrors] = useState({})
  const [compare, setCompare] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [showCalc, setShowCalc] = useState(false)
  const [calcForm, setCalcForm] = useState({ age: 30, type: 'Life', coverage: 100000 })

  const policyTypes = ['Life', 'Health', 'Vehicle', 'Property', 'Travel']
  const statusOptions = ['Active', 'Pending', 'Expired', 'Cancelled']

  const columnDefs = useMemo(() => ([
    { field: 'policyNo', headerName: 'Policy No', filter: true, sortable: true },
    { field: 'holderName', headerName: 'Holder Name', filter: true, sortable: true },
    { field: 'type', headerName: 'Type', filter: true, sortable: true },
    { field: 'premium', headerName: 'Premium', valueFormatter: p => `$${p.value?.toLocaleString()}`, sortable: true },
    { field: 'startDate', headerName: 'Start Date', filter: true, sortable: true },
    { field: 'status', headerName: 'Status', filter: true, sortable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => {
        return (
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => onEdit(params.rowIndex)}
              title="Edit Policy"
            >
              ✏️
            </button>
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => onDelete(params.rowIndex)}
              title="Delete Policy"
            >
              🗑️
            </button>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => toggleCompare(rowData[params.rowIndex])}
              title="Compare"
            >
              ↔️
            </button>
          </div>
        )
      }
    }
  ]), [])

  const validateForm = () => {
    const newErrors = {}
    if (!form.policyNo.trim()) newErrors.policyNo = 'Policy number is required'
    if (!form.holderName.trim()) newErrors.holderName = 'Holder name is required'
    if (form.premium <= 0) newErrors.premium = 'Premium must be greater than 0'
    if (!form.startDate) newErrors.startDate = 'Start date is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onEdit = (index) => {
    setEditIndex(index)
    setForm({ ...rowData[index] })
    setShowModal(true)
    setErrors({})
  }

  const onDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      const policy = rowData[index]
      setRowData(prev => prev.filter((_, i) => i !== index))
      addNotification({ type: 'danger', message: `Policy ${policy.policyNo} deleted` })
    }
  }

  const onAdd = () => {
    setEditIndex(null)
    setForm({ 
      policyNo: '', 
      holderName: '', 
      type: 'Life', 
      premium: 0, 
      startDate: new Date().toISOString().slice(0, 10),
      status: 'Active' 
    })
    setShowModal(true)
    setErrors({})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    const updatedForm = { ...form, premium: Number(form.premium) }
    
    if (editIndex === null) {
      setRowData(prev => [updatedForm, ...prev])
      addNotification({ type: 'success', message: `Policy ${updatedForm.policyNo} created` })
    } else {
      setRowData(prev => prev.map((r, i) => i === editIndex ? updatedForm : r))
      addNotification({ type: 'info', message: `Policy ${updatedForm.policyNo} updated` })
    }
    setShowModal(false)
  }

  const toggleCompare = (policy) => {
    setCompare(prev => {
      const exists = prev.find(p => p.policyNo === policy.policyNo)
      const next = exists ? prev.filter(p => p.policyNo !== policy.policyNo) : [...prev, policy]
      return next.slice(0, 3)
    })
    setShowCompare(true)
  }

  const premiumEstimate = () => {
    const base = { Life: 0.012, Health: 0.009, Vehicle: 0.008, Property: 0.007, Travel: 0.006 }[calcForm.type] || 0.01
    const ageFactor = calcForm.age > 45 ? 1.4 : calcForm.age > 30 ? 1.2 : 1
    return Math.max(10, Math.round(calcForm.coverage * base * ageFactor))
  }

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Policy Management</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          <i className="bi bi-plus-circle me-2"></i>Add Policy
        </button>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact 
              rowData={rowData} 
              columnDefs={columnDefs} 
              pagination={true} 
              paginationPageSize={10}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true
              }}
            />
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-secondary" onClick={() => setShowCompare(true)} disabled={compare.length===0}>
          Compare ({compare.length})
        </button>
        <button className="btn btn-outline-primary" onClick={() => setShowCalc(true)}>
          Premium Calculator
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex === null ? 'Add New Policy' : 'Edit Policy'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                />
              </div>
              <form onSubmit={onSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Policy Number *</label>
                      <input 
                        className={`form-control ${errors.policyNo ? 'is-invalid' : ''}`}
                        value={form.policyNo} 
                        onChange={(e) => handleInputChange('policyNo', e.target.value)} 
                        placeholder="e.g., POL-1001"
                        required 
                      />
                      {errors.policyNo && <div className="invalid-feedback">{errors.policyNo}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Holder Name *</label>
                      <input 
                        className={`form-control ${errors.holderName ? 'is-invalid' : ''}`}
                        value={form.holderName} 
                        onChange={(e) => handleInputChange('holderName', e.target.value)} 
                        placeholder="Full name"
                        required 
                      />
                      {errors.holderName && <div className="invalid-feedback">{errors.holderName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Policy Type</label>
                      <select 
                        className="form-select" 
                        value={form.type} 
                        onChange={(e) => handleInputChange('type', e.target.value)}
                      >
                        {policyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Premium Amount *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className={`form-control ${errors.premium ? 'is-invalid' : ''}`}
                          value={form.premium} 
                          onChange={(e) => handleInputChange('premium', e.target.value)}
                          min="0"
                          step="0.01"
                          required
                        />
                        {errors.premium && <div className="invalid-feedback">{errors.premium}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Start Date *</label>
                      <input 
                        type="date" 
                        className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                        value={form.startDate} 
                        onChange={(e) => handleInputChange('startDate', e.target.value)} 
                        required
                      />
                      {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-select" 
                        value={form.status} 
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editIndex === null ? 'Create Policy' : 'Update Policy'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showCompare && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Policy Comparison</h5>
                <button type="button" className="btn-close" onClick={() => setShowCompare(false)} />
              </div>
              <div className="modal-body">
                {compare.length === 0 ? (
                  <div className="text-muted">Select policies to compare.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Field</th>
                          {compare.map(p => (<th key={p.policyNo}>{p.policyNo}</th>))}
                        </tr>
                      </thead>
                      <tbody>
                        {['holderName','type','premium','startDate','status'].map(field => (
                          <tr key={field}>
                            <td className="fw-semibold text-capitalize">{field}</td>
                            {compare.map(p => (<td key={p.policyNo+field}>{String(p[field])}</td>))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowCompare(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCalc && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Premium Calculator</h5>
                <button type="button" className="btn-close" onClick={() => setShowCalc(false)} />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" value={calcForm.age} onChange={(e)=>setCalcForm({...calcForm, age:Number(e.target.value)})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Type</label>
                    <select className="form-select" value={calcForm.type} onChange={(e)=>setCalcForm({...calcForm, type:e.target.value})}>
                      {policyTypes.map(t=> <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Coverage Amount</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" value={calcForm.coverage} onChange={(e)=>setCalcForm({...calcForm, coverage:Number(e.target.value)})} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="alert alert-info">Estimated Monthly Premium: <strong>${premiumEstimate().toLocaleString()}</strong></div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowCalc(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


