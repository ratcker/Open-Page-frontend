import { apiClient } from '../../../shared/api/apiClient.js'
import { getAccessToken } from '../../../shared/api/authStorage.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function getBookBySlug(slug) {
  return apiClient(`/books/slug/${slug}/`)
}

export async function getBookReviews(bookId) {
  const query = new URLSearchParams({ book: bookId })
  return apiClient(`/reading/reviews/?${query.toString()}`)
}

export async function getBookComments(bookId) {
  return apiClient(`/books/${bookId}/comments/`)
}

export async function createBookComment(bookId, text) {
  return apiClient(`/books/${bookId}/comments/`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}

export async function likeBook(bookId) {
  return apiClient(`/books/${bookId}/like/`, {
    method: 'POST',
  })
}

export async function unlikeBook(bookId) {
  return apiClient(`/books/${bookId}/like/`, {
    method: 'DELETE',
  })
}

export async function startBookReading(slug) {
  return apiClient(`/reading/books/${slug}/read/`)
}

export async function downloadBookFile(slug) {
  const accessToken = getAccessToken()
  const response = await fetch(`${API_BASE_URL}/reading/books/${slug}/download/`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  })

  if (!response.ok) {
    throw new Error('Не удалось скачать книгу.')
  }

  const blob = await response.blob()
  const disposition = response.headers.get('content-disposition') ?? ''
  const filenameMatch = disposition.match(/filename="?(.*?)"?$/)

  return {
    blob,
    filename: filenameMatch?.[1] || `${slug}.book`,
  }
}
