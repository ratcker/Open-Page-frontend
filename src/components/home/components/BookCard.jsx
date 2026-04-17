function getAuthorLabel(book) {
  if (Array.isArray(book.authors)) {
    return book.authors.join(', ')
  }

  return book.author || 'ДЫЫ БООВ СКИЙ'
}

function getGenreLabel(book) {
  if (Array.isArray(book.genres) && book.genres.length) {
    return book.genres.map((genre) => genre.name).join(', ')
  }

  return book.genre || 'Без жанра'
}

function getYearLabel(book) {
  if (book.published_at) {
    return new Date(book.published_at).getFullYear()
  }

  return '—'
}

export function BookCard({ book, onOpenBook }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} className="book-cover-image" />
        ) : (
          'Обложка'
        )}
      </div>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">{getAuthorLabel(book)}</p>
      <p className="book-meta">Жанр: {getGenreLabel(book)}</p>
      <p className="book-meta">Год: {getYearLabel(book)}</p>
      <button
        type="button"
        className="book-open-button"
        onClick={() => onOpenBook(book.slug)}
      >
        Открыть книгу
      </button>
    </article>
  )
}
