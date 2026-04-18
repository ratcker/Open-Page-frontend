function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
    </div>
  )
}

export function CatalogSummary({ totalBooks, visibleBooks }) {
  return (
    <section className="catalog-summary" aria-label="Сводка по каталогу">
      <SummaryCard label="Всего книг" value={totalBooks} />
      <SummaryCard label="Найдено" value={visibleBooks} />
    </section>
  )
}
