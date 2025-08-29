export default function AuthFormInput({ label, type="text", value, onChange, name, placeholder, error }) {
  return (
    <div className="auth-input">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={type === "password" ? "current-password" : "email"}
        required
      />
      {error ? <small className="error">{error}</small> : null}
    </div>
  );
}
