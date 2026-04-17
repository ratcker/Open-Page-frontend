export function CommentsSection({ comments }) {
  return (
    <section className="book-section">
      <h3 className="book-section-title">Комментарии</h3>

      <div className="comments-list">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="comment-card">
              <div className="comment-avatar">Юз</div>
              <div>
                <h4 className="comment-name">{comment.reader_name}</h4>
                <p className="comment-text">{comment.text}</p>
              </div>
            </article>
          ))
        ) : (
          <article className="comment-card">
            <div>
              <h4 className="comment-name">Комментариев пока нет</h4>
              <p className="comment-text">
                Для этой книги ещё не оставили отзывы.
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
