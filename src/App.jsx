import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AuthPage } from './components/auth/AuthPage.jsx'
import { HomePage } from './components/home/HomePage.jsx'
import { BookPage } from './components/book/BookPage.jsx'
import { AccountPage } from './components/account/AccountPage.jsx'
import { clearAccessToken } from './shared/api/authStorage.js'

function BookPageRoute({
  onBookSlugChange,
  onNavigateHome,
  onNavigateAccount,
  onLogout,
}) {
  const { slug = '' } = useParams()

  useEffect(() => {
    if (slug) {
      onBookSlugChange(slug)
    }
  }, [onBookSlugChange, slug])

  return (
    <BookPage
      slug={slug}
      onNavigateHome={onNavigateHome}
      onNavigateAccount={onNavigateAccount}
      onLogout={onLogout}
    />
  )
}

function App() {
  const navigate = useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [lastBookSlug, setLastBookSlug] = useState('')

  function handleAuthenticated() {
    setIsAuthorized(true)
  }

  function handleLogout() {
    clearAccessToken()
    setIsAuthorized(false)
    setLastBookSlug('')
    navigate('/', { replace: true })
  }

  function handleNavigateToBook(slug) {
    setLastBookSlug(slug)
    navigate(`/book/${slug}`)
  }

  function handleNavigateFromAccount(slug) {
    if (slug) {
      navigate(`/book/${slug}`)
      return
    }

    navigate(lastBookSlug ? `/book/${lastBookSlug}` : '/')
  }

  if (!isAuthorized) {
    return (
      <AuthPage
        isLoginMode={isLoginMode}
        onToggleMode={() => setIsLoginMode((value) => !value)}
        onAuthenticated={handleAuthenticated}
      />
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onNavigateBook={handleNavigateToBook}
            onNavigateAccount={() => navigate('/account')}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/book/:slug"
        element={
          <BookPageRoute
            onBookSlugChange={setLastBookSlug}
            onNavigateHome={() => navigate('/')}
            onNavigateAccount={() => navigate('/account')}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/account"
        element={
          <AccountPage
            onNavigateHome={() => navigate('/')}
            onNavigateBook={handleNavigateFromAccount}
            onLogout={handleLogout}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
