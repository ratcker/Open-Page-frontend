export function AccountHeader({ onNavigateHome, onNavigateBook }) {
  return (
    <header className="account-header">
      <h1 className="account-brand">OpenPage</h1>
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
        <span>Профиль</span>
      </div>
    </header>
  )
}
