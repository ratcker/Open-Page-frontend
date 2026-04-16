export function AuthFeedback({ type, children }) {
  if (!children) {
    return null
  }

  const className =
    type === 'error'
      ? 'form-feedback form-feedback-error'
      : 'form-feedback form-feedback-success'

  return <p className={className}>{children}</p>
}
