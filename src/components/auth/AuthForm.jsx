import { useState } from 'react'
import { InputField } from './components/InputField.jsx'
import { PasswordField } from './components/PasswordField.jsx'
import { SubmitButton } from './components/SubmitButton.jsx'
import { SecondaryButton } from './components/SecondaryButton.jsx'
import { VerificationModal } from './components/VerificationModal.jsx'
import { AuthFeedback } from './components/AuthFeedback.jsx'
import {
  loginUser,
  registerUser,
  verifyRegistrationCode,
} from './api/authApi.js'

const initialRegisterForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const initialLoginForm = {
  identity: '',
  password: '',
}

const initialVerificationForm = {
  code: '',
}

export function AuthForm({ isLoginMode, onAuthenticated }) {
  const [registerForm, setRegisterForm] = useState(initialRegisterForm)
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [verificationForm, setVerificationForm] = useState(initialVerificationForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)

  const buttonText = isLoginMode
    ? 'Войти'
    : pendingEmail
      ? 'Ввести код'
      : 'Отправить код'

  const activeForm = isLoginMode ? loginForm : registerForm

  function clearMessages() {
    setErrorMessage('')
    setSuccessMessage('')
  }

  function resetRegisterFlow() {
    setRegisterForm(initialRegisterForm)
    setVerificationForm(initialVerificationForm)
    setPendingEmail('')
    setIsVerificationModalOpen(false)
  }

  function updateActiveField(name, value) {
    if (isLoginMode) {
      setLoginForm((current) => ({ ...current, [name]: value }))
      return
    }

    setRegisterForm((current) => ({ ...current, [name]: value }))

    if (pendingEmail) {
      setPendingEmail('')
      setVerificationForm(initialVerificationForm)
      setIsVerificationModalOpen(false)
      setSuccessMessage('Данные изменены. Отправьте новый код подтверждения.')
    }
  }

  function handleVerificationChange(name, value) {
    setVerificationForm((current) => ({ ...current, [name]: value }))
  }

  function validateRegisterForm() {
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('Пароли не совпадают.')
      return false
    }

    return true
  }

  async function handleLoginSubmit(event) {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    try {
      await loginUser(loginForm)
      setSuccessMessage('Вход выполнен успешно.')
      onAuthenticated?.()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Произошла ошибка авторизации.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSendCode() {
    clearMessages()

    if (!validateRegisterForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await registerUser(registerForm)

      setPendingEmail(registerForm.email.trim())
      setVerificationForm(initialVerificationForm)
      setIsVerificationModalOpen(true)
      setSuccessMessage(
        response.detail || 'Код подтверждения отправлен на электронную почту.',
      )
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Не удалось отправить код подтверждения.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRegisterAction(event) {
    event.preventDefault()

    if (pendingEmail) {
      clearMessages()
      setIsVerificationModalOpen(true)
      return
    }

    await handleSendCode()
  }

  async function handleVerificationSubmit(event) {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    try {
      await verifyRegistrationCode({
        email: pendingEmail,
        code: verificationForm.code,
      })
      resetRegisterFlow()
      setSuccessMessage('Регистрация завершена, почта подтверждена.')
      onAuthenticated?.()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Не удалось подтвердить почту.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function closeVerificationModal() {
    setIsVerificationModalOpen(false)
  }

  return (
    <>
      <form
        className="auth-form"
        onSubmit={isLoginMode ? handleLoginSubmit : handleRegisterAction}
      >
        {!isLoginMode && (
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
              name="password"
              placeholder="Пароль"
              value={activeForm.password}
              onChange={updateActiveField}
            />
            <PasswordField
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={activeForm.confirmPassword}
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
              name="password"
              placeholder="Пароль"
              value={activeForm.password}
              onChange={updateActiveField}
            />
          </>
        )}

        {!isLoginMode && pendingEmail && (
          <div className="status-chip">
            Код уже отправлен на <span>{pendingEmail}</span>
          </div>
        )}

        <AuthFeedback type="error">{errorMessage}</AuthFeedback>
        <AuthFeedback type="success">{successMessage}</AuthFeedback>

        {!isLoginMode && pendingEmail ? (
          <div className="action-row">
            <SecondaryButton onClick={handleSendCode} disabled={isSubmitting}>
              Отправить код заново
            </SecondaryButton>
            <SubmitButton isLoading={isSubmitting}>{buttonText}</SubmitButton>
          </div>
        ) : (
          <SubmitButton isLoading={isSubmitting}>{buttonText}</SubmitButton>
        )}
      </form>

      <VerificationModal
        isOpen={!isLoginMode && isVerificationModalOpen}
        email={pendingEmail}
        code={verificationForm.code}
        isLoading={isSubmitting}
        errorMessage={errorMessage}
        successMessage={successMessage}
        onCodeChange={handleVerificationChange}
        onClose={closeVerificationModal}
        onSubmit={handleVerificationSubmit}
      />
    </>
  )
}
