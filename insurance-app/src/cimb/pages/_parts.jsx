export function Card({ title, value, color='primary' }) {
  return (
    <div className="card shadow-sm" style={{ backdropFilter: 'blur(6px)' }}>
      <div className={`card-header bg-${color} text-white`}>{title}</div>
      <div className="card-body">
        <div className="display-6">{value}</div>
      </div>
    </div>
  )
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>
}


