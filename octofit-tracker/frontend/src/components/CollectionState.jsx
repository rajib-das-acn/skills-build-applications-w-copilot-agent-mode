function CollectionState({ loading, error, records, collectionName }) {
  if (loading) {
    return (
      <div className="alert alert-info" role="status">
        Loading {collectionName.toLowerCase()}...
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Could not load {collectionName.toLowerCase()}: {error}
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="alert alert-light border" role="status">
        No {collectionName.toLowerCase()} found yet.
      </div>
    )
  }

  return null
}

export default CollectionState
