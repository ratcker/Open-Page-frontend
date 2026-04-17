export function BookTopBar({ onNavigateHome, onNavigateAccount }) {
  return (
    <header className="book-topbar">
      <h1 className="book-brand">ОпенПейч</h1>
      <input className="book-search" type="search" placeholder="Поиск..." />
      <div className="book-topbar-actions">
        <button
          type="button"
          className="book-topbar-button"
          onClick={onNavigateHome}
        >
          Главная
        </button>
        <button
          type="button"
          className="book-topbar-button"
          onClick={onNavigateAccount}
        >
          Аккаунт
        </button>
      </div>
    </header>
  )
}
