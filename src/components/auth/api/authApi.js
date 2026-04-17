import {
  buildLoginPayload,
  buildRegisterPayload,
  buildVerifyEmailPayload,
} from '../utils/authPayloads.js'
import { apiClient } from '../../../shared/api/apiClient.js'
import { persistAuthTokens } from '../../../shared/api/authStorage.js'

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

function getApiErrorMessage(error) {
  const errorData =
    error && typeof error === 'object' && 'data' in error ? error.data : null

  if (errorData && typeof errorData === 'object') {
    const normalized = normalizeErrorMessages(errorData)
    if (normalized) {
      return normalized
    }
  }

  const message = error instanceof Error ? error.message : ''

  if (!message) {
    return 'Не удалось выполнить запрос к API.'
  }

  return translateMessage(message)
}

export async function registerUser(formValues) {
  const payload = buildRegisterPayload(formValues)

  try {
    return await apiClient('/user/register/', {
      method: 'POST',
      body: JSON.stringify(payload),
      includeAuth: false,
    })
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

export async function verifyRegistrationCode({ email, code }) {
  const payload = buildVerifyEmailPayload({ email, code })

  try {
    const data = await apiClient('/user/verify-email/', {
      method: 'POST',
      body: JSON.stringify(payload),
      includeAuth: false,
    })

    persistAuthTokens(data)
    return data
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

export async function loginUser(formValues) {
  const payload = buildLoginPayload(formValues)

  try {
    const data = await apiClient('/token/', {
      method: 'POST',
      body: JSON.stringify(payload),
      includeAuth: false,
    })

    persistAuthTokens(data)
    return data
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}
