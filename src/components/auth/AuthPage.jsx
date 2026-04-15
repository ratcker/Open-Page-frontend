import { AuthPanel } from './AuthPanel.jsx'

export function AuthPage({ isLoginMode, onToggleMode }) {
  return (
    <main className="auth-layout">
      <AuthPanel isLoginMode={isLoginMode} onToggleMode={onToggleMode} />
    </main>
  )
}
