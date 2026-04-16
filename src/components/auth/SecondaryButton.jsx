export function SecondaryButton({
  children,
  type = 'button',
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className="secondary-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
