export function AuthorSection({ author }) {
  return (
    <section className="book-section">
      <h3 className="book-section-title">Об авторе</h3>

      <div className="author-card">
        <div className="author-avatar">Фото</div>

        <div>
          <h4 className="author-name">
            {author?.full_name || 'Имя автора недоступно'}
          </h4>
          <p className="author-text">
            {author?.bio || 'Информация об авторе пока не заполнена.'}
          </p>
          <a href={author?.website || '#'} className="author-link">
            Профиль автора
          </a>
        </div>
      </div>
    </section>
  )
}
