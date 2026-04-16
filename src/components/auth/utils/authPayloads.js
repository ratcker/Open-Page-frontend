function slugifyName(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function splitFullName(fullName) {
  const [firstName = '', ...rest] = fullName.trim().split(/\s+/)

  return {
    firstName,
    lastName: rest.join(' '),
  }
}

function generateUsername(fullName, email) {
  const emailPrefix = email.split('@')[0] || 'user'
  const namePart = slugifyName(fullName)
  const base = namePart || slugifyName(emailPrefix) || 'openpage-user'
  const suffix = Math.floor(Math.random() * 9000) + 1000

  return `${base}-${suffix}`
}

export function buildRegisterPayload({
  fullName,
  email,
  password,
  confirmPassword,
}) {
  const { firstName, lastName } = splitFullName(fullName)
  const username = generateUsername(fullName, email)

  return {
    username,
    email: email.trim(),
    password,
    password2: confirmPassword,
    first_name: firstName,
    last_name: lastName,
  }
}

export function buildVerifyEmailPayload({ email, code }) {
  return {
    email: email.trim(),
    code: code.trim(),
  }
}

export function buildLoginPayload({ identity, password }) {
  return {
    username_or_email: identity.trim(),
    password,
  }
}
