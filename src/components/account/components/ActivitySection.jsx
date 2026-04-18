export function ActivitySection({ items }) {
  return (
    <section className="account-block">
      <h3 className="account-section-title">Последняя активность</h3>

      <div className="account-activity-list">
        {items.length ? (
          items.map((item) => (
            <article key={item.id} className="account-activity-card">
              <h4 className="account-activity-title">{item.title}</h4>
              <p className="account-activity-text">{item.description}</p>
            </article>
          ))
        ) : (
          <p className="account-text">Активность пока не найдена.</p>
        )}
      </div>
    </section>
  )
}
