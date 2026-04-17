import { getAccessToken } from './authStorage.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

function buildHeaders(customHeaders = {}, includeAuth = true) {
  const headers = { ...customHeaders }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (includeAuth) {
    const accessToken = getAccessToken()
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
  }

  return headers
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json().catch(() => ({}))
  }

  return response.text().catch(() => '')
}

function getDefaultErrorMessage(data) {
  if (typeof data === 'string' && data.trim()) {
    return data
  }

  if (data && typeof data === 'object') {
    if (typeof data.detail === 'string') {
      return data.detail
    }

    const firstValue = Object.values(data)[0]
    if (Array.isArray(firstValue) && firstValue[0]) {
      return String(firstValue[0])
    }

    if (typeof firstValue === 'string') {
      return firstValue
    }
  }

  return 'Не удалось выполнить запрос.'
}

export async function apiClient(path, options = {}) {
  const { headers, includeAuth = true, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: buildHeaders(headers, includeAuth),
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    const error = new Error(getDefaultErrorMessage(data))
    error.data = data
    throw error
  }

  return data
}
