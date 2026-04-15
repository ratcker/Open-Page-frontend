export function InsightCard({ value, label }) {
  return (
    <article className="insight-card">
      <p className="insight-value">{value}</p>
      <p className="insight-label">{label}</p>
    </article>
  )
}
