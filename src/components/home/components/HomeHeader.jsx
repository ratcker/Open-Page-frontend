export function HomeHeader({ onNavigateAccount }) {
  return (
    <header className="home-header">
      <div>
        <h1 className="home-title">Каталог книг</h1>
        <p className="home-subtitle">ОпенПейч</p>
      </div>

      <div className="home-header-actions">
        <button
          type="button"
          className="home-header-button"
          onClick={onNavigateAccount}
        >
          Аккаунт
        </button>
      </div>
    </header>
  )
}
