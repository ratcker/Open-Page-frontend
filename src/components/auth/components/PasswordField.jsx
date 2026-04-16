export function PasswordField({
  name = 'password',
  placeholder = 'Пароль',
  value,
  onChange,
}) {
  return (
    <label className="field field-password">
      <span className="field-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 7.73V18a1 1 0 1 0 2 0v-1.27a2 2 0 1 0-2 0ZM10 9V7a2 2 0 1 1 4 0v2h-4Z" />
        </svg>
      </span>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  )
}
