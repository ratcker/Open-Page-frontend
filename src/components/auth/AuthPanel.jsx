import { BrandHeader } from './components/BrandHeader.jsx'
import { AuthForm } from './AuthForm.jsx'

export function AuthPanel({ isLoginMode, onToggleMode, onAuthenticated }) {
  const titleText = isLoginMode ? 'Вход в аккаунт' : 'Создайте аккаунт'

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <BrandHeader />

      <div className="auth-copy">
        <h1 id="auth-title" className="auth-title">
          {titleText}
        </h1>
      </div>

      <AuthForm
        isLoginMode={isLoginMode}
        onAuthenticated={onAuthenticated}
      />

      <p className="auth-footer">
        {isLoginMode ? 'Ещё нет аккаунта? ' : 'Уже есть аккаунт? '}
        <button type="button" className="auth-switch" onClick={onToggleMode}>
          {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
    </section>
  )
}
