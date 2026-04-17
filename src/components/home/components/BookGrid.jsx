import { BookCard } from './BookCard.jsx'

export function BookGrid({ books, isLoading, errorMessage, onOpenBook }) {
  if (isLoading) {
    return <section className="empty-state">а где...</section>
  }

  if (errorMessage) {
    return <section className="empty-state">{errorMessage}</section>
  }

  if (!books.length) {
    return (
      <section className="empty-state">
        а где.
      </section>
    )
  }

  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onOpenBook={onOpenBook} />
      ))}
    </section>
  )
}
