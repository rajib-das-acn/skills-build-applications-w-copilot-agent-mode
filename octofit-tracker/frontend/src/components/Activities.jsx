import CollectionState from './CollectionState.jsx'
import { displayDate, recordId } from './collectionUtils.js'
import { useCollection } from './useCollection.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const { records, loading, error } = useCollection(apiUrl)

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Every effort counts</p>
        <h1>Activities</h1>
        <p className="text-secondary">A look at the latest workouts logged by the community.</p>
      </div>
      <CollectionState
        collectionName="Activities"
        error={error}
        loading={loading}
        records={records}
      />
      {!loading && !error && records.length > 0 && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Member</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((activity) => (
                  <tr key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
                    <td className="fw-semibold">{activity.type ?? 'Activity'}</td>
                    <td>{recordId(activity.user)}</td>
                    <td>{activity.durationMinutes ?? '—'} min</td>
                    <td>{activity.caloriesBurned ?? '—'} kcal</td>
                    <td>{displayDate(activity.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

export default Activities
