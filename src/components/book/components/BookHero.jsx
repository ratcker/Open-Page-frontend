function buildRatingText(book) {
  if (typeof book.rating === 'number' || typeof book.rating === 'string') {
    return String(book.rating)
  }

  return 'Нет оценки'
}

export function BookHero({ book }) {
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
        <p className="book-hero-author">
          {book.authors_list || 'Автор не указан'}
        </p>

        <div className="book-genre-list">
          {(book.genres ?? []).map((genre) => (
            <span key={genre.id ?? genre.slug ?? genre.name} className="book-genre-item">
              {genre.name}
            </span>
          ))}
        </div>

        <p className="book-rating">{buildRatingText(book)}</p>

        <div className="book-action-row">
          <button type="button" className="book-action-button">
            Читать
          </button>
          <button type="button" className="book-action-button-secondary">
            В библиотеку
          </button>
        </div>
      </div>
    </section>
  )
}
