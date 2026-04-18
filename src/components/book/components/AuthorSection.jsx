function getAuthorInitials(author) {
  const fullName = author?.full_name?.trim()

  if (!fullName) {
    return 'A'
  }

  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function AuthorSection({ author }) {
  return (
    <section className="book-section">
      <h3 className="book-section-title">Об авторе</h3>

      <div className="author-card">
        <div className="author-avatar" aria-hidden="true">
          {getAuthorInitials(author)}
        </div>

        <div>
          <h4 className="author-name">
            {author?.full_name || 'Имя автора недоступно'}
          </h4>
          <p className="author-text">
            {author?.bio || 'Информация об авторе пока не заполнена.'}
          </p>
          {author?.website ? (
            <a
              href={author.website}
              className="author-link"
              target="_blank"
              rel="noreferrer"
            >
              Сайт автора
            </a>
          ) : (
            <span className="author-link">Сайт автора не указан</span>
          )}
        </div>
      </div>
    </section>
  )
}
