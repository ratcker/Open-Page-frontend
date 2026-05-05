function BookmarkCard({ bookmark, onOpenBook }) {
  return (
    <article className="account-activity-card">
      <h4 className="account-activity-title">{bookmark.book_title}</h4>
      <p className="account-activity-text">Страница: {bookmark.page_number}</p>
      {bookmark.note && <p className="account-activity-text">{bookmark.note}</p>}
      <button
        type="button"
        className="account-nav-button account-inline-button"
        onClick={() => onOpenBook(bookmark.book_slug)}
      >
        Открыть
      </button>
    </article>
  )
}

export function BookmarksSection({ bookmarks, onOpenBook }) {
  return (
    <section className="account-block">
      <h3 className="account-section-title">Закладки</h3>

      <div className="account-activity-list">
        {bookmarks.length ? (
          bookmarks
            .slice(0, 4)
            .map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onOpenBook={onOpenBook}
              />
            ))
        ) : (
          <p className="account-text">Закладок пока нет.</p>
        )}
      </div>
    </section>
  )
}
