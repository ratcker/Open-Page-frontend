export function GenreFilter({ genres, selectedGenreId, onSelectGenre }) {
  if (!genres.length) {
    return null
  }

  return (
    <section className="genre-filter" aria-label="Фильтр по жанрам">
      <button
        type="button"
        className={
          selectedGenreId ? 'genre-filter-button' : 'genre-filter-button is-active'
        }
        onClick={() => onSelectGenre('')}
      >
        Все жанры
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={
            selectedGenreId === genre.id
              ? 'genre-filter-button is-active'
              : 'genre-filter-button'
          }
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </section>
  )
}
