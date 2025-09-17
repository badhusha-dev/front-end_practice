import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function exportToPDF(title, columns, rows) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text(title, 14, 18)
  const head = [columns.map(c => c.toUpperCase())]
  const body = rows.map(r => columns.map(c => String(r[c] ?? '')))
  autoTable(doc, { head, body, startY: 24, styles: { fontSize: 9 } })
  doc.save(`${title.replace(/\s+/g,'_').toLowerCase()}.pdf`)
}

export function exportToExcel(title, columns, rows) {
  const data = [columns, ...rows.map(r => columns.map(c => r[c]))]
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${title.replace(/\s+/g,'_').toLowerCase()}.xlsx`)
}


