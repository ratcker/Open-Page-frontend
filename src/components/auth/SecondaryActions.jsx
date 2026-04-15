const benefitItems = [
  'Мгновенное переключение между регистрацией и входом',
  'Отдельные блоки для дальнейшего подключения API и валидации',
  'Широкий макет, который легко развивать до dashboard-flow',
]

export function SecondaryActions({ isLoginMode, onToggleMode }) {
  return (
    <div className="secondary-actions">
      <div className="mode-switch-card">
        <p className="mode-switch-title">
          {isLoginMode ? 'Нужна новая учётная запись?' : 'Уже есть аккаунт?'}
        </p>
        <p className="mode-switch-text">
          {isLoginMode
            ? 'Перейдите к регистрации и заполните полную форму с адресом почты.'
            : 'Откройте упрощённый вход, если у вас уже есть доступ.'}
        </p>
        <button type="button" className="ghost-button" onClick={onToggleMode}>
          {isLoginMode ? 'Перейти к регистрации' : 'Перейти ко входу'}
        </button>
      </div>

      <div className="benefits-card">
        <p className="benefits-title">Что уже готово в интерфейсе</p>
        <div className="benefits-list">
          {benefitItems.map((item) => (
            <div key={item} className="benefit-item">
              <span className="benefit-marker" aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
