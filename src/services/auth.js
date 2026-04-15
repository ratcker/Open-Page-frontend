import { apiRequest } from '../config/api.js'
import {
  buildLoginPayload,
  buildRegisterPayload,
  buildVerifyEmailPayload,
} from '../utils/authPayloads.js'

const ACCESS_TOKEN_KEY = 'openpage.access'
const REFRESH_TOKEN_KEY = 'openpage.refresh'

export async function registerUser(formValues) {
  const payload = buildRegisterPayload(formValues)

  return apiRequest('/user/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function verifyRegistrationCode({ email, code }) {
  const payload = buildVerifyEmailPayload({ email, code })
  const data = await apiRequest('/user/verify-email/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  persistAuthTokens(data)

  return data
}

export async function loginUser(formValues) {
  const payload = buildLoginPayload(formValues)
  const data = await apiRequest('/token/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  persistAuthTokens(data)

  return data
}

export function persistAuthTokens(data) {
  if (data.access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  }

  if (data.refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  }
}
