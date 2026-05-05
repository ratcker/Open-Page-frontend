export function BookTopBar({ onNavigateHome, onNavigateAccount, onLogout }) {
  return (
    <header className="book-topbar">
      <h1 className="book-brand">ОпенПейч</h1>
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
        <button type="button" className="book-topbar-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </header>
  )
}
