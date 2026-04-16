export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.detail ||
      data.password ||
      data.email ||
      data.username ||
      'Не удалось выполнить запрос к API.'

    throw new Error(Array.isArray(message) ? message.join(' ') : message)
  }

  return data
}
