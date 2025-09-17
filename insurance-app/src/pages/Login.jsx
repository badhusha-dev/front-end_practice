import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roles = ['Admin', 'Customer', 'Agent']

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Admin')
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = String(Math.floor(100000 + Math.random()*900000))
    setGeneratedOtp(code)
    setStep(2)
    alert(`Your OTP is: ${code}`)
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    if (otp === generatedOtp) {
      login(email, role)
      navigate('/')
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Sign In</h2>
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="card card-body shadow-sm">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit">Continue</button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="card card-body shadow-sm">
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Verify & Login</button>
          <button type="button" className="btn btn-link mt-2" onClick={() => setStep(1)}>Change Email/Role</button>
        </form>
      )}
    </div>
  )
}


