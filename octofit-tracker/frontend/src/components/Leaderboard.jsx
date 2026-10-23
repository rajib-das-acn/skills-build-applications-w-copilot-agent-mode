import CollectionState from './CollectionState.jsx'
import { recordId } from './collectionUtils.js'
import { useCollection } from './useCollection.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const { records, loading, error } = useCollection(apiUrl)
  const rankedRecords = [...records].sort(
    (first, second) => (first.rank ?? Infinity) - (second.rank ?? Infinity),
  )

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Celebrate your progress</p>
        <h1>Leaderboard</h1>
        <p className="text-secondary">Friendly competition, powered by consistency.</p>
      </div>
      <CollectionState
        collectionName="Leaderboard entries"
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
                  <th scope="col">Rank</th>
                  <th scope="col">Member</th>
                  <th scope="col">Points</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                {rankedRecords.map((entry, index) => (
                  <tr key={entry._id ?? `${recordId(entry.user)}-${entry.period}`}>
                    <td><span className="rank-badge">{entry.rank ?? index + 1}</span></td>
                    <td className="fw-semibold">{recordId(entry.user)}</td>
                    <td>{entry.score ?? 0}</td>
                    <td>{entry.period ?? '—'}</td>
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

export default Leaderboard
