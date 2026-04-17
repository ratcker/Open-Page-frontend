import { useState } from 'react'
import { AuthPage } from './components/auth/AuthPage.jsx'
import { HomePage } from './components/home/HomePage.jsx'
import { BookPage } from './components/book/BookPage.jsx'
import { AccountPage } from './components/account/AccountPage.jsx'

function App() {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedBookSlug, setSelectedBookSlug] = useState('')

  function handleAuthenticated() {
    setIsAuthorized(true)
    setCurrentPage('home')
  }

  function handleNavigateToBook(slug) {
    setSelectedBookSlug(slug)
    setCurrentPage('book')
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

  if (currentPage === 'book') {
    return (
      <BookPage
        slug={selectedBookSlug}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateAccount={() => setCurrentPage('account')}
      />
    )
  }

  if (currentPage === 'account') {
    return (
      <AccountPage
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateBook={() => setCurrentPage(selectedBookSlug ? 'book' : 'home')}
      />
    )
  }

  return (
    <HomePage
      onNavigateBook={handleNavigateToBook}
      onNavigateAccount={() => setCurrentPage('account')}
    />
  )
}

export default App
