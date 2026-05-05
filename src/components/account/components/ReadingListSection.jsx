function ReadingBookCard({ book, onOpenBook }) {
  return (
    <article className="account-book-card">
      <div className="account-book-cover">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.book_title}
            className="account-book-cover-image"
          />
        ) : (
          'Обложка'
        )}
      </div>
      <h4 className="account-book-title">{book.book_title}</h4>
      <p className="account-book-meta">
        Прогресс: {book.progress_percentage ?? 0}%
      </p>
      <p className="account-book-meta">
        Статус: {book.is_completed ? 'Прочитано' : 'Читаю'}
      </p>
      <button
        type="button"
        className="account-nav-button account-inline-button"
        onClick={() => onOpenBook(book.book_slug)}
      >
        Продолжить
      </button>
    </article>
  )
}

export function ReadingListSection({ books, onOpenBook }) {
  return (
    <section className="account-block">
      <h3 className="account-section-title">Моя библиотека</h3>

      <div className="account-books-grid">
        {books.length ? (
          books.map((book) => (
            <ReadingBookCard
              key={book.id}
              book={book}
              onOpenBook={onOpenBook}
            />
          ))
        ) : (
          <p className="account-text">История чтения пока пуста.</p>
        )}
      </div>
    </section>
  )
}
