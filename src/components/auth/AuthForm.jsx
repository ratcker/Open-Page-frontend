import { useState } from 'react'
import { InputField } from './InputField.jsx'
import { PasswordField } from './PasswordField.jsx'
import { SubmitButton } from './SubmitButton.jsx'
import {
  loginUser,
  registerUser,
  verifyRegistrationCode,
} from '../../services/auth.js'

const initialRegisterForm = {
  fullName: '',
  email: '',
  password: '',
}

const initialLoginForm = {
  identity: '',
  password: '',
}

const initialVerificationForm = {
  code: '',
}

export function AuthForm({ isLoginMode }) {
  const [registerForm, setRegisterForm] = useState(initialRegisterForm)
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [verificationForm, setVerificationForm] = useState(initialVerificationForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [awaitingVerification, setAwaitingVerification] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')

  const buttonText = isLoginMode
    ? 'Войти'
    : awaitingVerification
      ? 'Подтвердить email'
      : 'Зарегистрироваться'

  const activeForm = isLoginMode ? loginForm : registerForm

  function updateActiveField(name, value) {
    if (isLoginMode) {
      setLoginForm((current) => ({ ...current, [name]: value }))
      return
    }

    setRegisterForm((current) => ({ ...current, [name]: value }))
  }

  function handleVerificationChange(name, value) {
    setVerificationForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (isLoginMode) {
        await loginUser(loginForm)
        setSuccessMessage('Вход выполнен успешно.')
      } else if (awaitingVerification) {
        await verifyRegistrationCode({
          email: pendingEmail,
          code: verificationForm.code,
        })
        setSuccessMessage('Email успешно подтверждён.')
        setVerificationForm(initialVerificationForm)
        setAwaitingVerification(false)
        setRegisterForm(initialRegisterForm)
        setPendingEmail('')
      } else {
        const response = await registerUser(registerForm)

        setPendingEmail(registerForm.email)
        setAwaitingVerification(true)
        setVerificationForm(initialVerificationForm)
        setSuccessMessage(
          response.detail || 'Код подтверждения отправлен на электронную почту.',
        )
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Произошла ошибка авторизации.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {!isLoginMode && !awaitingVerification && (
        <>
          <InputField
            name="fullName"
            placeholder="Полное имя"
            value={activeForm.fullName}
            onChange={updateActiveField}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Электронная почта"
            value={activeForm.email}
            onChange={updateActiveField}
          />
          <PasswordField
            value={activeForm.password}
            onChange={updateActiveField}
          />
        </>
      )}

      {isLoginMode && (
        <>
          <InputField
            name="identity"
            placeholder="Имя пользователя или email"
            value={activeForm.identity}
            onChange={updateActiveField}
          />
          <PasswordField
            value={activeForm.password}
            onChange={updateActiveField}
          />
        </>
      )}

      {!isLoginMode && awaitingVerification && (
        <>
          <div className="status-chip">
            Код отправлен на <span>{pendingEmail}</span>
          </div>
          <InputField
            name="code"
            placeholder="Код из письма"
            value={verificationForm.code}
            onChange={handleVerificationChange}
          />
        </>
      )}

      {errorMessage && <p className="form-feedback form-feedback-error">{errorMessage}</p>}
      {successMessage && (
        <p className="form-feedback form-feedback-success">{successMessage}</p>
      )}

      <SubmitButton isLoading={isSubmitting}>{buttonText}</SubmitButton>
    </form>
  )
}
