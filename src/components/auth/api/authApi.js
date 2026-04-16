import {
  buildLoginPayload,
  buildRegisterPayload,
  buildVerifyEmailPayload,
} from '../utils/authPayloads.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
const ACCESS_TOKEN_KEY = 'openpage.access'
const REFRESH_TOKEN_KEY = 'openpage.refresh'

const FIELD_LABELS = {
  email: 'Электронная почта',
  username: 'Имя пользователя',
  password: 'Пароль',
  password2: 'Повтор пароля',
  identity: 'Логин',
  full_name: 'Полное имя',
  code: 'Код подтверждения',
}

const MESSAGE_TRANSLATIONS = {
  'This field is required.': 'Это поле обязательно для заполнения.',
  'This field may not be blank.': 'Это поле не может быть пустым.',
  'Enter a valid email address.': 'Введите корректный адрес электронной почты.',
  'Ensure this field has at least 8 characters.':
    'Минимальная длина этого поля - 8 символов.',
  'Unable to log in with provided credentials.':
    'Не удалось войти: проверьте логин и пароль.',
  'No active account found with the given credentials':
    'Не удалось войти: проверьте логин и пароль.',
  'Invalid token.': 'Недействительный токен.',
  'Invalid code.': 'Неверный код подтверждения.',
  'User with this email already exists.':
    'Пользователь с такой электронной почтой уже существует.',
  'A user with that username already exists.':
    'Пользователь с таким именем уже существует.',
  'The two password fields didn’t match.': 'Пароли не совпадают.',
  "The two password fields didn't match.": 'Пароли не совпадают.',
}

function translateMessage(message) {
  if (typeof message !== 'string') {
    return ''
  }

  return MESSAGE_TRANSLATIONS[message] ?? message
}

function normalizeErrorMessages(value, fieldName) {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeErrorMessages(item, fieldName))
      .filter(Boolean)
      .join(' ')
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([nestedField, nestedValue]) =>
        normalizeErrorMessages(nestedValue, nestedField),
      )
      .filter(Boolean)
      .join(' ')
  }

  const message = translateMessage(value)

  if (!message) {
    return ''
  }

  const label = FIELD_LABELS[fieldName]
  return label ? `${label}: ${message}` : message
}

function getApiErrorMessage(data) {
  if (!data || typeof data !== 'object') {
    return 'Не удалось выполнить запрос к API.'
  }

  const primaryFields = [
    'detail',
    'non_field_errors',
    'password',
    'password2',
    'email',
    'username',
    'identity',
    'full_name',
    'code',
  ]

  for (const field of primaryFields) {
    if (field in data) {
      const message = normalizeErrorMessages(data[field], field)

      if (message) {
        return message
      }
    }
  }

  const fallbackMessage = normalizeErrorMessages(data)
  return fallbackMessage || 'Не удалось выполнить запрос к API.'
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data))
  }

  return data
}

function persistAuthTokens(data) {
  if (data.access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  }

  if (data.refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  }
}

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
