import './AuthPage.css'
import { AuthPanel } from './AuthPanel.jsx'

export function AuthPage({ isLoginMode, onToggleMode, onAuthenticated }) {
  return (
    <main className="auth-layout">
      <AuthPanel
        isLoginMode={isLoginMode}
        onToggleMode={onToggleMode}
        onAuthenticated={onAuthenticated}
      />
    </main>
  )
}
