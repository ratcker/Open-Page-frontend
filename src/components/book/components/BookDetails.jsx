function formatDate(dateValue) {
  if (!dateValue) {
    return 'Не указана'
  }

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return dateValue
  }

  return date.toLocaleDateString('ru-RU')
}

function getFreeReadLabel(book) {
  return book.is_free_to_read || book.is_free ? 'Да' : 'Нет'
}

export function BookDetails({ book }) {
  return (
    <section className="book-section">
      <h3 className="book-section-title">Описание книги</h3>
      <p className="book-description">
        {book.description || 'Описание книги пока не добавлено.'}
      </p>

      <div className="book-detail-list">
        <div className="book-detail-item">Дата публикации: {formatDate(book.published_at)}</div>
        <div className="book-detail-item">Страниц: {book.pages || '-'}</div>
        <div className="book-detail-item">
          Бесплатное чтение: {getFreeReadLabel(book)}
        </div>
        <div className="book-detail-item">
          Скачивание: {book.allow_download ? 'Разрешено' : 'Недоступно'}
        </div>
      </div>
    </section>
  )
}
