import { apiClient } from '../../../shared/api/apiClient.js'

export async function getBooks(filters = {}, options = {}) {
  const query = new URLSearchParams()
  const search = filters.search ?? ''
  const genreId = filters.genreId ?? ''

  if (search.trim()) {
    query.set('search', search.trim())
  }

  if (genreId) {
    query.set('genres', genreId)
  }

  const suffix = query.toString() ? `?${query.toString()}` : ''
  return apiClient(`/books/${suffix}`, options)
}

export async function getGenres(options = {}) {
  return apiClient('/books/genres/', options)
}
