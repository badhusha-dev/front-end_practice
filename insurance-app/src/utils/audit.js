export function addAudit(message) {
  try {
    const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]')
    logs.unshift({ message, time: new Date().toLocaleString() })
    localStorage.setItem('audit_logs', JSON.stringify(logs.slice(0, 100)))
  } catch (_) {}
}

export function getAuditLogs() {
  try { return JSON.parse(localStorage.getItem('audit_logs') || '[]') } catch { return [] }
}


