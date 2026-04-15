export function InputField({ name, type = 'text', placeholder }) {
  return (
    <label className="field">
      <span className="sr-only">{placeholder}</span>
      <input type={type} name={name} placeholder={placeholder} />
    </label>
  )
}
