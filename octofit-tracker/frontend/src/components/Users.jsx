import CollectionState from './CollectionState.jsx'
import { useCollection } from './useCollection.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const { records, loading, error } = useCollection(apiUrl)

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Your community</p>
        <h1>Members</h1>
        <p className="text-secondary">Meet the people moving toward their goals.</p>
      </div>
      <CollectionState
        collectionName="Members"
        error={error}
        loading={loading}
        records={records}
      />
      {!loading && !error && records.length > 0 && (
        <div className="row g-3">
          {records.map((user) => (
            <div className="col-sm-6 col-xl-4" key={user._id ?? user.username}>
              <article className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="member-avatar" aria-hidden="true">
                    {(user.firstName?.[0] ?? user.username?.[0] ?? '?').toUpperCase()}
                  </div>
                  <h2 className="h5 mt-3 mb-1">
                    {[user.firstName, user.lastName].filter(Boolean).join(' ') ||
                      user.username ||
                      'Member'}
                  </h2>
                  <p className="text-secondary mb-3">
                    {user.email ?? user.username ?? 'OctoFit member'}
                  </p>
                  <span className="badge text-bg-success">
                    {user.points ?? 0} points
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
