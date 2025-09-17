import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store'

export default function Login() {
  const [name, setName] = useState('')
  const [account, setAccount] = useState('CIMB-0000')
  const [role, setRole] = useState('customer')
  const [risk, setRisk] = useState('Moderate')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    dispatch(login({ name, account, role, risk }))
    navigate('/')
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="text-center mb-4">
        <div className="mb-3" style={{ width: 64, height: 64, background: 'var(--cimb-red)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', margin: '0 auto' }}>C</div>
        <h3 className="fw-bold" style={{ color: 'var(--cimb-red)' }}>CIMB Wealth</h3>
        <p className="text-muted">Sign in to your wealth management dashboard</p>
      </div>
      <form onSubmit={submit} className="card card-body shadow-sm glass-card">
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Account</label>
          <input className="form-control" value={account} onChange={(e)=>setAccount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Role</label>
          <select className="form-select" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="advisor">Advisor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Risk Profile</label>
          <select className="form-select" value={risk} onChange={(e)=>setRisk(e.target.value)}>
            {['Conservative','Moderate','Aggressive'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <button className="btn btn-cimb-primary w-100" type="submit">Continue</button>
      </form>
    </div>
  )
}


