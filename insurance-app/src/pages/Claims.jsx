import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { claims as initialClaims, policies } from '../data/dummyData'
import { useNotifications } from '../context/NotificationsContext'

export default function Claims() {
  const [rowData, setRowData] = useState(initialClaims)
  const { addNotification } = useNotifications()
  const [showModal, setShowModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [submitForm, setSubmitForm] = useState({
    policyNo: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().slice(0, 10),
    documents: []
  })
  const [errors, setErrors] = useState({})

  const columnDefs = useMemo(() => ([
    { field: 'claimId', headerName: 'Claim ID', filter: true, sortable: true },
    { field: 'policyNo', headerName: 'Policy No', filter: true, sortable: true },
    { field: 'amount', headerName: 'Amount', valueFormatter: p => `$${p.value?.toLocaleString()}`, sortable: true },
    { field: 'status', headerName: 'Status', filter: true, sortable: true },
    { headerName: 'Fraud', valueGetter: p => (p.data.amount > 2000 && p.data.status==='Open') ? '⚠️ Flag' : '', sortable: false },
    { field: 'date', headerName: 'Date', filter: true, sortable: true },
    { field: 'description', headerName: 'Description', filter: true, sortable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => {
        const claim = params.data
        const updateStatus = (status) => {
          setRowData(prev => prev.map((r, i) => 
            i === params.rowIndex ? { ...r, status } : r
          ))
          addNotification({
            type: status === 'Approved' ? 'success' : status === 'Rejected' ? 'danger' : 'warning',
            message: `Claim ${claim.claimId} ${status === 'Open' ? 'reopened' : status.toLowerCase()}`
          })
        }
        
        return (
          <div className="d-flex gap-1">
            <button 
              className="btn btn-sm btn-outline-info" 
              onClick={() => onView(params.data)}
              title="View Details"
            >
              👁️
            </button>
            {claim.status === 'Open' && (
              <>
                <button 
                  className="btn btn-sm btn-outline-success" 
                  onClick={() => updateStatus('Approved')}
                  title="Approve Claim"
                >
                  ✅
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={() => updateStatus('Rejected')}
                  title="Reject Claim"
                >
                  ❌
                </button>
              </>
            )}
            {claim.status !== 'Open' && (
              <button 
                className="btn btn-sm btn-outline-warning" 
                onClick={() => updateStatus('Open')}
                title="Reopen Claim"
              >
                🔄
              </button>
            )}
          </div>
        )
      }
    }
  ]), [])

  const onView = (claim) => {
    setSelectedClaim(claim)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setSelectedClaim(null)
  }

  const onCloseSubmitModal = () => {
    setShowSubmitModal(false)
    setSubmitForm({
      policyNo: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().slice(0, 10),
      documents: []
    })
    setErrors({})
  }

  const validateSubmitForm = () => {
    const newErrors = {}
    if (!submitForm.policyNo) newErrors.policyNo = 'Policy number is required'
    if (submitForm.amount <= 0) newErrors.amount = 'Amount must be greater than 0'
    if (!submitForm.description.trim()) newErrors.description = 'Description is required'
    if (!submitForm.date) newErrors.date = 'Date is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitClaim = (e) => {
    e.preventDefault()
    if (!validateSubmitForm()) return

    const newClaim = {
      claimId: `CLM-${2000 + rowData.length}`,
      ...submitForm,
      amount: Number(submitForm.amount),
      status: 'Open'
    }

    setRowData(prev => [newClaim, ...prev])
    addNotification({ type: 'info', message: `New claim submitted for ${newClaim.policyNo}` })
    onCloseSubmitModal()
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setSubmitForm(prev => ({
      ...prev,
      documents: [...prev.documents, ...files.map(f => f.name)]
    }))
  }

  const removeDocument = (index) => {
    setSubmitForm(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleInputChange = (field, value) => {
    setSubmitForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Claims Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowSubmitModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>Submit New Claim
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

      <div className="mt-3">
        <div className="card">
          <div className="card-header bg-white">Claim Status Timeline (Example)</div>
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              {['Submitted','Review','Approved/Rejected'].map((s, i) => (
                <div key={s} className="d-flex align-items-center">
                  <div className={`badge rounded-pill ${i===2?'bg-success':'bg-secondary'}`}>{s}</div>
                  {i<2 && <div className="mx-2 text-muted">→</div>}
                </div>
              ))}
            </div>
            <div className="text-muted small mt-2">Timeline is illustrative; per-claim tracking can be added similarly.</div>
          </div>
        </div>
      </div>

      {/* Claim Details Modal */}
      {showModal && selectedClaim && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Claim Details - {selectedClaim.claimId}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Claim ID</label>
                    <div className="form-control-plaintext">{selectedClaim.claimId}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Policy Number</label>
                    <div className="form-control-plaintext">{selectedClaim.policyNo}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Amount</label>
                    <div className="form-control-plaintext">${selectedClaim.amount?.toLocaleString()}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <div className="form-control-plaintext">
                      <span className={`badge bg-${
                        selectedClaim.status === 'Approved' ? 'success' :
                        selectedClaim.status === 'Rejected' ? 'danger' : 'warning'
                      }`}>
                        {selectedClaim.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date</label>
                    <div className="form-control-plaintext">{selectedClaim.date}</div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <div className="form-control-plaintext">{selectedClaim.description}</div>
                  </div>
                  {selectedClaim.documents && selectedClaim.documents.length > 0 && (
                    <div className="col-12">
                      <label className="form-label fw-semibold">Documents</label>
                      <div className="list-group">
                        {selectedClaim.documents.map((doc, index) => (
                          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{doc}</span>
                            <button className="btn btn-sm btn-outline-primary">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Claim Modal */}
      {showSubmitModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit New Claim</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onCloseSubmitModal}
                  aria-label="Close"
                />
              </div>
              <form onSubmit={handleSubmitClaim}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Policy Number *</label>
                      <select 
                        className={`form-select ${errors.policyNo ? 'is-invalid' : ''}`}
                        value={submitForm.policyNo} 
                        onChange={(e) => handleInputChange('policyNo', e.target.value)}
                        required
                      >
                        <option value="">Select Policy</option>
                        {policies.filter(p => p.status === 'Active').map(policy => (
                          <option key={policy.policyNo} value={policy.policyNo}>
                            {policy.policyNo} - {policy.holderName}
                          </option>
                        ))}
                      </select>
                      {errors.policyNo && <div className="invalid-feedback">{errors.policyNo}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Claim Amount *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                          value={submitForm.amount} 
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          min="0"
                          step="0.01"
                          required
                        />
                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Claim Date *</label>
                      <input 
                        type="date" 
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        value={submitForm.date} 
                        onChange={(e) => handleInputChange('date', e.target.value)} 
                        required
                      />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description *</label>
                      <textarea 
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={submitForm.description} 
                        onChange={(e) => handleInputChange('description', e.target.value)} 
                        rows="3"
                        placeholder="Describe the incident or reason for the claim..."
                        required
                      />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Supporting Documents</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                      <div className="form-text">Upload receipts, photos, or other supporting documents</div>
                      {submitForm.documents.length > 0 && (
                        <div className="mt-2">
                          <div className="list-group">
                            {submitForm.documents.map((doc, index) => (
                              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{doc}</span>
                                <button 
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => removeDocument(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={onCloseSubmitModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


