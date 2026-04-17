import { apiClient } from '../../../shared/api/apiClient.js'

export async function getBooks(search = '') {
  const query = new URLSearchParams()

  if (search.trim()) {
    query.set('search', search.trim())
  }

  const suffix = query.toString() ? `?${query.toString()}` : ''
  return apiClient(`/books/${suffix}`)
}
