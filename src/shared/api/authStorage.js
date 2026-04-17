const ACCESS_TOKEN_KEY = 'openpage.access'
const REFRESH_TOKEN_KEY = 'openpage.refresh'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function persistAuthTokens(data) {
  if (data.access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  }

  if (data.refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  }
}
