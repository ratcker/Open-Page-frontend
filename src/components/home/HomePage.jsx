import { useEffect, useState } from 'react'
import './HomePage.css'
import { HomeHeader } from './components/HomeHeader.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { CatalogSummary } from './components/CatalogSummary.jsx'
import { BookGrid } from './components/BookGrid.jsx'
import { getBooks } from './api/booksApi.js'
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue.js'
import { extractResults } from '../../shared/lib/extractResults.js'

const LOAD_BOOKS_ERROR_MESSAGE = 'Не удалось загрузить книги.'

export function HomePage({ onNavigateBook, onNavigateAccount }) {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const debouncedQuery = useDebouncedValue(query, 400)

  useEffect(() => {
    const controller = new AbortController()

    async function loadBooks() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getBooks(debouncedQuery, { signal: controller.signal })
        setBooks(extractResults(data))
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : LOAD_BOOKS_ERROR_MESSAGE,
        )
        setBooks([])
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadBooks()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery])

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
