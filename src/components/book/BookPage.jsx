import { useEffect, useState } from 'react'
import './BookPage.css'
import { BookTopBar } from './components/BookTopBar.jsx'
import { BookHero } from './components/BookHero.jsx'
import { BookDetails } from './components/BookDetails.jsx'
import { AuthorSection } from './components/AuthorSection.jsx'
import { CommentsSection } from './components/CommentsSection.jsx'
import { BookFooter } from './components/BookFooter.jsx'
import { getBookBySlug, getBookReviews } from './api/bookApi.js'
import { extractResults } from '../../shared/lib/extractResults.js'

const EMPTY_BOOK_MESSAGE = 'Книга не выбрана.'
const LOAD_BOOK_ERROR_MESSAGE = 'Не удалось загрузить страницу книги.'

export function BookPage({ slug, onNavigateHome, onNavigateAccount }) {
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadBookPage() {
      if (!slug) {
        setErrorMessage(EMPTY_BOOK_MESSAGE)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const bookData = await getBookBySlug(slug)
        const reviewsData = await getBookReviews(bookData.id)

        if (!isCancelled) {
          setBook(bookData)
          setComments(extractResults(reviewsData))
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : LOAD_BOOK_ERROR_MESSAGE,
          )
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBookPage()

    return () => {
      isCancelled = true
    }
  }, [slug])

  return (
    <main className="book-page">
      <div className="book-page-shell">
        <BookTopBar
          onNavigateHome={onNavigateHome}
          onNavigateAccount={onNavigateAccount}
        />

        {isLoading && <section className="book-section">Загрузка книги...</section>}

        {!isLoading && errorMessage && (
          <section className="book-section">{errorMessage}</section>
        )}

        {!isLoading && !errorMessage && book && (
          <>
            <BookHero book={book} />
            <BookDetails book={book} />
            <AuthorSection author={book.authors?.[0] ?? null} />
            <CommentsSection comments={comments} />
          </>
        )}

        <BookFooter />
      </div>
    </main>
  )
}
