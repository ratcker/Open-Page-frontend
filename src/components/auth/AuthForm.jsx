import { InputField } from './InputField.jsx'
import { PasswordField } from './PasswordField.jsx'
import { SubmitButton } from './SubmitButton.jsx'

export function AuthForm({ isLoginMode, buttonText }) {
  return (
    <form className="auth-form">
      <InputField name="fullName" placeholder="Полное имя" />

      {!isLoginMode && (
        <InputField
          name="email"
          type="email"
          placeholder="Электронная почта"
        />
      )}

      <PasswordField />
      <SubmitButton>{buttonText}</SubmitButton>
    </form>
  )
}
