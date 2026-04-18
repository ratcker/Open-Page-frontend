export function SearchBar({ value, onChange }) {
  return (
    <section className="search-panel">
      <label className="search-label" htmlFor="book-search">
        Поиск по каталогу
      </label>
      <input
        id="book-search"
        className="search-input"
        type="search"
        placeholder="Название, автор или жанр"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  )
}
