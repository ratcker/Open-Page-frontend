export function SubmitButton({ children, isLoading = false }) {
  return (
    <button type="submit" className="submit-button" disabled={isLoading}>
      {isLoading ? 'Подождите...' : children}
    </button>
  )
}
