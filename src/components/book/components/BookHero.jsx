function buildStatsText(book) {
  const views = book.views_count ?? 0
  const downloads = book.downloads_count ?? 0
  const comments = book.comments_count ?? 0

  return `${views} просмотров · ${downloads} скачиваний · ${comments} комментариев`
}

function getAuthorLabel(book) {
  if (book.authors_list) {
    return book.authors_list
  }

  if (Array.isArray(book.authors) && book.authors.length) {
    return book.authors
      .map((author) => author.full_name || author.name || '')
      .filter(Boolean)
      .join(', ')
  }

  return 'Автор не указан'
}

export function BookHero({ book, actions }) {
  return (
    <section className="book-hero">
      <div className="book-cover-large">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="book-cover-large-image"
          />
        ) : (
          'Обложка'
        )}
      </div>

      <div>
        <h2 className="book-hero-title">{book.title}</h2>
        <p className="book-hero-author">{getAuthorLabel(book)}</p>

        <div className="book-genre-list">
          {(book.genres ?? []).map((genre) => (
            <span key={genre.id ?? genre.slug ?? genre.name} className="book-genre-item">
              {genre.name}
            </span>
          ))}
        </div>

        <p className="book-rating">{buildStatsText(book)}</p>
        {actions}
      </div>
    </section>
  )
}
