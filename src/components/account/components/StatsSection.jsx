function StatCard({ label, value }) {
  return (
    <div className="account-stat-card">
      <p className="account-stat-label">{label}</p>
      <p className="account-stat-value">{value}</p>
    </div>
  )
}

export function StatsSection({ stats }) {
  return (
    <section className="account-block">
      <h3 className="account-section-title">Статистика</h3>

      <div className="account-stats-grid">
        <StatCard label="Книг в библиотеке" value={stats.libraryCount} />
        <StatCard label="Прочитано" value={stats.readCount} />
        <StatCard label="Закладок" value={stats.bookmarkCount} />
        <StatCard label="Отзывов" value={stats.commentCount} />
      </div>
    </section>
  )
}
