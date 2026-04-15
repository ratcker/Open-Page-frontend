import { useState } from 'react'
import './App.css'
import { AuthPage } from './components/auth/AuthPage.jsx'

function App() {
  const [isLoginMode, setIsLoginMode] = useState(false)

  return (
    <AuthPage
      isLoginMode={isLoginMode}
      onToggleMode={() => setIsLoginMode((value) => !value)}
    />
  )
}

export default App
