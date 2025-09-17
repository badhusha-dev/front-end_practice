import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function exportToPDF(title, columns, rows) {
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text(title, 14, 16)
  doc.autoTable({
    startY: 22,
    head: [columns],
    body: rows.map(r => columns.map(c => r[c] ?? '')),
    styles: { fontSize: 10 },
  })
  doc.save(`${title.replace(/\s+/g,'_')}.pdf`)
}

export function exportToExcel(title, columns, rows) {
  const worksheetData = [columns, ...rows.map(r => columns.map(c => r[c] ?? ''))]
  const ws = XLSX.utils.aoa_to_sheet(worksheetData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${title.replace(/\s+/g,'_')}.xlsx`)
}

export function exportToCSV(title, columns, rows) {
  const csvRows = [columns.join(','), ...rows.map(r => columns.map(c => JSON.stringify(r[c] ?? '')).join(','))]
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, `${title.replace(/\s+/g,'_')}.csv`)
}


