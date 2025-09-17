import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    try {
      const res = await axios.post('/api/contact', form)
      setStatus({ type: 'success', message: 'Message sent successfully!' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ type: 'danger', message: 'Failed to send message. Try again later.' })
    }
  }

  return (
    <section id="contact" className="py-5">
      <div className="container">
        <h3 className="mb-4">Contact</h3>
        {status && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}
        <form onSubmit={submit} className="card shadow-sm border-0 p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
            </div>
            <div className="col-12">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="5" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} required />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </section>
  )
}


