import { InputField } from './InputField.jsx'
import { SubmitButton } from './SubmitButton.jsx'
import { SecondaryButton } from './SecondaryButton.jsx'
import { AuthFeedback } from './AuthFeedback.jsx'

export function VerificationModal({
  isOpen,
  email,
  code,
  isLoading,
  errorMessage,
  successMessage,
  onCodeChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="verification-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-title"
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Закрыть окно подтверждения"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-copy">
          <p className="modal-eyebrow">Подтверждение email</p>
          <h2 id="verification-title" className="modal-title">
            Введите код из письма
          </h2>
          <p className="modal-text">
            Мы отправили шестизначный код на <span>{email}</span>.
          </p>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <InputField
            name="code"
            placeholder="Код подтверждения"
            value={code}
            onChange={onCodeChange}
          />

          <AuthFeedback type="error">{errorMessage}</AuthFeedback>
          <AuthFeedback type="success">{successMessage}</AuthFeedback>

          <div className="modal-actions">
            <SecondaryButton onClick={onClose} disabled={isLoading}>
              Позже
            </SecondaryButton>
            <SubmitButton isLoading={isLoading}>Зарегистрироваться</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}
