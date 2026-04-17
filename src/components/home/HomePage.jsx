import { useEffect, useState } from 'react'
import './HomePage.css'
import { HomeHeader } from './components/HomeHeader.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { CatalogSummary } from './components/CatalogSummary.jsx'
import { BookGrid } from './components/BookGrid.jsx'
import { getBooks } from './api/booksApi.js'

export function HomePage({ onNavigateBook, onNavigateAccount }) {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadBooks() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getBooks(query)

        if (!isCancelled) {
          setBooks(Array.isArray(data) ? data : data.results ?? [])
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : 'Не удалось загрузить книги.',
          )
          setBooks([])
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBooks()

    return () => {
      isCancelled = true
    }
  }, [query])

  return (
    <main className="home-page">
      <div className="home-shell">
        <HomeHeader onNavigateAccount={onNavigateAccount} />
        <SearchBar value={query} onChange={setQuery} />
        <CatalogSummary totalBooks={books.length} visibleBooks={books.length} />
        <BookGrid
          books={books}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onOpenBook={onNavigateBook}
        />
      </div>
    </main>
  )
}
