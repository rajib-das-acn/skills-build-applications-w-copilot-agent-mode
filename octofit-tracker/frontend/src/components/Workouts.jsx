import CollectionState from './CollectionState.jsx'
import { useCollection } from './useCollection.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { records, loading, error } = useCollection(apiUrl)

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Your next challenge</p>
        <h1>Workouts</h1>
        <p className="text-secondary">Choose a session that fits your pace and your goals.</p>
      </div>
      <CollectionState
        collectionName="Workouts"
        error={error}
        loading={loading}
        records={records}
      />
      {!loading && !error && records.length > 0 && (
        <div className="row g-3">
          {records.map((workout) => (
            <div className="col-md-6 col-xl-4" key={workout._id ?? workout.title}>
              <article className="card h-100 border-0 shadow-sm workout-card">
                <div className="card-body p-4">
                  <span className="badge rounded-pill text-bg-primary mb-3">
                    {workout.activityType ?? 'Workout'}
                  </span>
                  <h2 className="h5">{workout.title ?? 'Workout'}</h2>
                  <p className="text-secondary">{workout.description ?? 'A session to support your fitness goals.'}</p>
                  <div className="d-flex justify-content-between mt-4 small">
                    <span className="text-capitalize">{workout.difficulty ?? 'All levels'}</span>
                    <strong>{workout.durationMinutes ?? '—'} min</strong>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
