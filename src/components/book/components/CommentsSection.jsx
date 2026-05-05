import { useState } from 'react'

function CommentCard({ comment }) {
  return (
    <article className="comment-card">
      <div className="comment-avatar">Юз</div>
      <div>
        <h4 className="comment-name">{comment.reader_name || 'Читатель'}</h4>
        <p className="comment-text">{comment.text}</p>
      </div>
    </article>
  )
}

export function CommentsSection({
  comments,
  isSubmitting,
  errorMessage,
  onCreateComment,
}) {
  const [text, setText] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const nextText = text.trim()

    if (!nextText) {
      return
    }

    await onCreateComment(nextText)
    setText('')
  }

  return (
    <section className="book-section">
      <h3 className="book-section-title">Комментарии</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Оставить комментарий"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          type="submit"
          className="book-action-button-secondary"
          disabled={isSubmitting || !text.trim()}
        >
          Отправить
        </button>
      </form>

      {errorMessage && <p className="comment-error">{errorMessage}</p>}

      <div className="comments-list">
        {comments.length ? (
          comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
        ) : (
          <article className="comment-card">
            <div>
              <h4 className="comment-name">Комментариев пока нет</h4>
              <p className="comment-text">
                Для этой книги еще не оставили комментарии.
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
