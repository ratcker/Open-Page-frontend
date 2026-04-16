export function InputField({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="field">
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
