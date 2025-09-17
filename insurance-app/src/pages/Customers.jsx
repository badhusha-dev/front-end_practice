import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { customers as customersData, policies } from '../data/dummyData'

export default function Customers() {
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [showChatbot, setShowChatbot] = useState(false)

  const columnDefs = useMemo(() => ([
    { field: 'id', headerName: 'Customer ID', filter: true, sortable: true },
    { field: 'name', headerName: 'Name', filter: true, sortable: true },
    { field: 'email', headerName: 'Email', filter: true, sortable: true },
    { field: 'phone', headerName: 'Phone', filter: true, sortable: true },
    { 
      field: 'policies', 
      headerName: 'Active Policies', 
      valueFormatter: p => p.value?.length || 0,
      sortable: true 
    },
    { field: 'joinDate', headerName: 'Join Date', filter: true, sortable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <button 
          className="btn btn-sm btn-outline-primary" 
          onClick={() => onView(customersData[params.rowIndex])}
          title="View Profile"
        >
          👁️ View Profile
        </button>
      )
    }
  ]), [])

  const onView = (customer) => {
    setSelected(customer)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setSelected(null)
  }

  const getCustomerPolicies = (policyNumbers) => {
    return policies.filter(policy => policyNumbers.includes(policy.policyNo))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Customer Management</h2>
        <div className="text-muted">
          Total Customers: {customersData.length}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact 
                  rowData={customersData} 
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
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Customer Quick View</h5>
            </div>
            <div className="card-body">
              {selected ? (
                <div>
                  <div className="text-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fs-4 fw-bold">{selected.name.charAt(0)}</span>
                    </div>
                    <h5 className="mt-2 mb-1">{selected.name}</h5>
                    <div className="text-muted small">{selected.id}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-envelope me-2 text-muted"></i>
                      <span className="small">{selected.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone me-2 text-muted"></i>
                      <span className="small">{selected.phone}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt me-2 text-muted"></i>
                      <span className="small">{selected.address}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar me-2 text-muted"></i>
                      <span className="small">Joined: {selected.joinDate}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="mb-2">Active Policies ({selected.policies.length})</h6>
                    {selected.policies.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {getCustomerPolicies(selected.policies).map(policy => (
                          <div key={policy.policyNo} className="list-group-item px-0 border-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <div className="fw-semibold small">{policy.policyNo}</div>
                                <div className="text-muted small">{policy.type}</div>
                              </div>
                              <div className="text-end">
                                <div className="fw-semibold small">${policy.premium}</div>
                                <span className={`badge bg-${
                                  policy.status === 'Active' ? 'success' :
                                  policy.status === 'Pending' ? 'warning' : 'secondary'
                                } small`}>
                                  {policy.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted small">No active policies</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <h6 className="mb-2">Feedback Rating</h6>
                    {[1,2,3,4,5].map(star => (
                      <button key={star} className={`btn btn-sm ${rating>=star?'btn-warning':'btn-outline-warning'} me-1`} onClick={()=>setRating(star)}>★</button>
                    ))}
                    <div className="text-muted small mt-1">Dummy star rating</div>
                  </div>

                  <button 
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => onView(selected)}
                  >
                    View Full Profile
                  </button>
                </div>
              ) : (
                <div className="text-center text-muted">
                  <i className="bi bi-person-circle fs-1 mb-3 d-block"></i>
                  <div>Select a customer to view profile</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Floating Button */}
      <button 
        className="btn btn-danger rounded-circle position-fixed"
        style={{ right: 24, bottom: 24, width: 56, height: 56 }}
        onClick={()=>setShowChatbot(true)}
        title="Chatbot"
      >
        💬
      </button>

      {showChatbot && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assistant</h5>
                <button type="button" className="btn-close" onClick={()=>setShowChatbot(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-2"><strong>FAQs</strong></div>
                <ul className="small text-muted">
                  <li>How do I submit a claim?</li>
                  <li>How to download my policy?</li>
                  <li>How to update my contact info?</li>
                </ul>
                <input className="form-control" placeholder="Type your question (dummy)" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Profile Modal */}
      {showModal && selected && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Profile - {selected.name}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                             style={{ width: '80px', height: '80px' }}>
                          <span className="fs-2 fw-bold">{selected.name.charAt(0)}</span>
                        </div>
                        <h5>{selected.name}</h5>
                        <div className="text-muted">{selected.id}</div>
                        <div className="text-muted small">Member since {selected.joinDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address</label>
                        <div className="form-control-plaintext">{selected.email}</div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <div className="form-control-plaintext">{selected.phone}</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Address</label>
                        <div className="form-control-plaintext">{selected.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-12">
                    <h5 className="mb-3">Policy History</h5>
                    {selected.policies.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Policy Number</th>
                              <th>Type</th>
                              <th>Premium</th>
                              <th>Start Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCustomerPolicies(selected.policies).map(policy => (
                              <tr key={policy.policyNo}>
                                <td>{policy.policyNo}</td>
                                <td>{policy.type}</td>
                                <td>${policy.premium?.toLocaleString()}</td>
                                <td>{policy.startDate}</td>
                                <td>
                                  <span className={`badge bg-${
                                    policy.status === 'Active' ? 'success' :
                                    policy.status === 'Pending' ? 'warning' :
                                    policy.status === 'Expired' ? 'danger' : 'secondary'
                                  }`}>
                                    {policy.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <i className="bi bi-shield-x fs-1 mb-3 d-block"></i>
                        <div>No policies found for this customer</div>
                      </div>
                    )}
                  </div>
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
    </div>
  )
}


