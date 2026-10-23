import CollectionState from './CollectionState.jsx'
import { recordId } from './collectionUtils.js'
import { useCollection } from './useCollection.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const { records, loading, error } = useCollection(apiUrl)

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Better together</p>
        <h1>Teams</h1>
        <p className="text-secondary">Find your crew and celebrate every milestone.</p>
      </div>
      <CollectionState
        collectionName="Teams"
        error={error}
        loading={loading}
        records={records}
      />
      {!loading && !error && records.length > 0 && (
        <div className="row g-3">
          {records.map((team) => (
            <div className="col-md-6" key={team._id ?? team.name}>
              <article className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <span className="team-mark" aria-hidden="true">OF</span>
                  <h2 className="h4 mt-3">{team.name ?? 'Team'}</h2>
                  <p className="text-secondary">{team.description || 'Ready to reach new goals together.'}</p>
                  <p className="mb-0 small">
                    <strong>{team.members?.length ?? 0}</strong> members
                    {team.members?.length > 0 && (
                      <span className="text-secondary">
                        {' · '}
                        {team.members.map(recordId).join(', ')}
                      </span>
                    )}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
