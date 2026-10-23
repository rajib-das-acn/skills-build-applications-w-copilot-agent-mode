export function recordId(value) {
  if (value && typeof value === 'object') {
    return value._id ?? value.id ?? value.username ?? value.name ?? '—'
  }
  return value ?? '—'
}

export function displayDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
}
