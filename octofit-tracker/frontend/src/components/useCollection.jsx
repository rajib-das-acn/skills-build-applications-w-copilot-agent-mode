import { useEffect, useState } from 'react'

function getRecords(payload) {
  if (Array.isArray(payload)) return payload

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) return payload[key]
    }
  }

  throw new Error('The API returned an unsupported collection response.')
}

export function useCollection(url) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status} ${response.statusText}).`)
        }
        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data from the API.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [url])

  return { records, loading, error }
}
