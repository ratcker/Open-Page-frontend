export function InputField({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="field">
      <span className="sr-only">{placeholder}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  )
}
