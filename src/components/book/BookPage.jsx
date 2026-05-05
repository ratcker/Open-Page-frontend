import { useEffect, useState } from 'react'
import './BookPage.css'
import { BookTopBar } from './components/BookTopBar.jsx'
import { BookHero } from './components/BookHero.jsx'
import { BookActionPanel } from './components/BookActionPanel.jsx'
import { BookDetails } from './components/BookDetails.jsx'
import { AuthorSection } from './components/AuthorSection.jsx'
import { CommentsSection } from './components/CommentsSection.jsx'
import { BookFooter } from './components/BookFooter.jsx'
import {
  createBookComment,
  downloadBookFile,
  getBookBySlug,
  getBookComments,
  likeBook,
  startBookReading,
  unlikeBook,
} from './api/bookApi.js'
import { extractResults } from '../../shared/lib/extractResults.js'

const EMPTY_BOOK_MESSAGE = 'Книга не выбрана.'
const LOAD_BOOK_ERROR_MESSAGE = 'Не удалось загрузить страницу книги.'
const COMMENT_ERROR_MESSAGE = 'Не удалось отправить комментарий.'
const LIKE_ERROR_MESSAGE = 'Не удалось обновить лайк.'
const READ_ERROR_MESSAGE = 'Не удалось открыть книгу для чтения.'

export function BookPage({
  slug,
  onNavigateHome,
  onNavigateAccount,
  onLogout,
}) {
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLikePending, setIsLikePending] = useState(false)
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [commentErrorMessage, setCommentErrorMessage] = useState('')
  const [actionMessage, setActionMessage] = useState('')

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
      setCommentErrorMessage('')
      setActionMessage('')

      try {
        const bookData = await getBookBySlug(slug)
        const commentsData = await getBookComments(bookData.id)

        if (!isCancelled) {
          setBook(bookData)
          setComments(extractResults(commentsData))
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

  async function handleToggleLike() {
    if (!book) {
      return
    }

    setIsLikePending(true)

    try {
      const data = book.is_liked ? await unlikeBook(book.id) : await likeBook(book.id)
      setBook((currentBook) =>
        currentBook
          ? {
              ...currentBook,
              is_liked: data.liked,
              likes_count: data.likes_count,
            }
          : currentBook,
      )
    } catch (error) {
      setCommentErrorMessage(
        error instanceof Error ? error.message : LIKE_ERROR_MESSAGE,
      )
    } finally {
      setIsLikePending(false)
    }
  }

  async function handleCreateComment(text) {
    if (!book) {
      return
    }

    setIsCommentSubmitting(true)
    setCommentErrorMessage('')

    try {
      const createdComment = await createBookComment(book.id, text)
      setComments((currentComments) => [createdComment, ...currentComments])
      setBook((currentBook) =>
        currentBook
          ? {
              ...currentBook,
              comments_count: (currentBook.comments_count ?? 0) + 1,
            }
          : currentBook,
      )
    } catch (error) {
      setCommentErrorMessage(
        error instanceof Error ? error.message : COMMENT_ERROR_MESSAGE,
      )
    } finally {
      setIsCommentSubmitting(false)
    }
  }

  async function handleReadBook() {
    if (!book) {
      return
    }

    try {
      const data = await startBookReading(book.slug)
      const fileUrl = data.book?.file_url

      if (fileUrl) {
        window.location.assign(fileUrl)
        return
      }

      setActionMessage('Книга добавлена в историю чтения.')
    } catch (error) {
      setCommentErrorMessage(
        error instanceof Error ? error.message : READ_ERROR_MESSAGE,
      )
    }
  }

  async function handleDownloadBook() {
    if (!book) {
      return
    }

    try {
      const { blob, filename } = await downloadBookFile(book.slug)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      setCommentErrorMessage(
        error instanceof Error ? error.message : READ_ERROR_MESSAGE,
      )
    }
  }

  return (
    <main className="book-page">
      <div className="book-page-shell">
        <BookTopBar
          onNavigateHome={onNavigateHome}
          onNavigateAccount={onNavigateAccount}
          onLogout={onLogout}
        />

        {isLoading && <section className="book-section">Загрузка книги...</section>}

        {!isLoading && errorMessage && (
          <section className="book-section">{errorMessage}</section>
        )}

        {!isLoading && !errorMessage && book && (
          <>
            <BookHero
              book={book}
              actions={
                <BookActionPanel
                  book={book}
                  isLikePending={isLikePending}
                  onToggleLike={handleToggleLike}
                  onReadBook={handleReadBook}
                  onDownloadBook={handleDownloadBook}
                />
              }
            />
            <BookDetails book={book} />
            {actionMessage && (
              <section className="book-section">{actionMessage}</section>
            )}
            <AuthorSection author={book.authors?.[0] ?? null} />
            <CommentsSection
              comments={comments}
              isSubmitting={isCommentSubmitting}
              errorMessage={commentErrorMessage}
              onCreateComment={handleCreateComment}
            />
          </>
        )}

        <BookFooter />
      </div>
    </main>
  )
}
