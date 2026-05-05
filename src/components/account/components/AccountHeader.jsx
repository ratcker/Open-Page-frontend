export function AccountHeader({ onNavigateHome, onNavigateBook, onLogout }) {
  return (
    <header className="account-header">
      <h1 className="account-brand">ОпенПейч</h1>
      <div className="account-header-links">
        <button
          type="button"
          className="account-nav-button"
          onClick={onNavigateHome}
        >
          Главная
        </button>
        <button
          type="button"
          className="account-nav-button"
          onClick={onNavigateBook}
        >
          Книга
        </button>
        <button type="button" className="account-nav-button" onClick={onLogout}>
          Выйти
        </button>
        <span>Профиль</span>
      </div>
    </header>
  )
}
