export function BookActionPanel({
  book,
  isLikePending,
  onToggleLike,
  onReadBook,
  onDownloadBook,
}) {
  return (
    <div className="book-action-panel">
      <button
        type="button"
        className="book-action-button"
        onClick={onReadBook}
        disabled={!book.read_url}
      >
        Читать
      </button>
      <button
        type="button"
        className="book-action-button-secondary"
        onClick={onDownloadBook}
        disabled={!book.download_url}
      >
        Скачать
      </button>
      <button
        type="button"
        className="book-action-button-secondary"
        onClick={onToggleLike}
        disabled={isLikePending}
      >
        {book.is_liked ? 'Убрать лайк' : 'Нравится'} · {book.likes_count ?? 0}
      </button>
    </div>
  )
}
