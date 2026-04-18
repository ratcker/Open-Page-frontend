import { apiClient } from '../../../shared/api/apiClient.js'

export async function getBookBySlug(slug) {
  return apiClient(`/books/slug/${slug}/`)
}

export async function getBookReviews(bookId) {
  const query = new URLSearchParams({ book: bookId })
  return apiClient(`/reading/reviews/?${query.toString()}`)
}
