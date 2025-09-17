import { goals } from '../data'

export default function Goals() {
  return (
    <div className="row g-4">
      {goals.map((g, i) => {
        const progress = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100))
        return (
          <div className="col-md-6" key={i}>
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white d-flex justify-content-between">
                <span>{g.goalName}</span>
                <span className="small">Deadline: {g.deadline}</span>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small text-muted">${g.currentAmount.toLocaleString()} / ${g.targetAmount.toLocaleString()}</span>
                  <span className="small fw-bold">{progress}%</span>
                </div>
                <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ height: 12 }}>
                  <div className="progress-bar bg-danger" style={{ width: `${progress}%`, backgroundImage: 'linear-gradient(90deg,#dc3545,#ff6b6b)' }} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


