function getAuthorLabel(book) {
  if (Array.isArray(book.authors) && book.authors.length) {
    return book.authors
      .map((author) => {
        if (typeof author === 'string') {
          return author
        }

        if (author && typeof author === 'object') {
          return author.full_name || author.name || ''
        }

        return ''
      })
      .filter(Boolean)
      .join(', ')
  }

  return book.authors_list || book.author || 'Автор не указан'
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

  return '-'
}

export function BookCard({ book, onOpenBook }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} className="book-cover-image" />
        ) : (
          'Нет обложки'
        )}
      </div>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">{getAuthorLabel(book)}</p>
      <p className="book-meta">Жанр: {getGenreLabel(book)}</p>
      <p className="book-meta">Год: {getYearLabel(book)}</p>
      <p className="book-meta">
        {book.likes_count ?? 0} лайков · {book.comments_count ?? 0} комментариев
      </p>
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
