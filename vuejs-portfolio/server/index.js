import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 5174

app.use(cors())
app.use(bodyParser.json())

// SMTP credentials (loaded from env)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true

let transporter
if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })
} else {
  // Dev fallback: log to console as JSON to avoid 500 when credentials missing
  transporter = nodemailer.createTransport({ jsonTransport: true })
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {}

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const mailOptions = {
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\n${message}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      return res.json({ ok: true, preview: info && info.message ? JSON.parse(info.message) : undefined })
    } catch (sendErr) {
      console.error('sendMail error:', sendErr)
      // Soft-fail to avoid 500s in UI; surface error flag to client
      return res.status(200).json({ ok: false, error: 'mail_failed' })
    }
  } catch (err) {
    console.error('SMTP error:', err)
    // Soft-fail in outer catch as well
    return res.status(200).json({ ok: false, error: 'mail_failed' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`SMTP API running at http://localhost:${PORT}`)
})

export default app


