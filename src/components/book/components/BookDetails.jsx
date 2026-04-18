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

export function BookDetails({ book }) {
  return (
    <section className="book-section">
      <h3 className="book-section-title">Описание книги</h3>
      <p className="book-description">
        {book.description || 'Описание книги пока не добавлено.'}
      </p>

      <div className="book-detail-list">
        <div className="book-detail-item">Дата: {formatDate(book.published_at)}</div>
        <div className="book-detail-item">Страницы: {book.pages || '—'}</div>
        <div className="book-detail-item">
          Бесплатно: {book.is_free_to_read ? 'Да' : 'Нет'}
        </div>
      </div>
    </section>
  )
}
