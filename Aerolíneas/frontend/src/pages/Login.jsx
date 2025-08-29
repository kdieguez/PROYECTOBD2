import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthFormInput from "../components/AuthFormInput";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!EMAIL_RE.test(form.email)) errs.email = "Ingresa un correo válido.";
    if (!form.password || form.password.length < 6) errs.password = "Mínimo 6 caracteres.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await authService.login(form.email, form.password);
      // Espera { token, user }
      login(data);
      navigate("/"); // redirige al Home o a donde quieras
    } catch (err) {
      setApiError(err?.response?.data?.message || "No pudimos iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Iniciar sesión</h2>

        <AuthFormInput
          label="Correo"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          error={errors.email}
        />

        <AuthFormInput
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />

        <div className="row-between">
          <label className="remember">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Recordarme
          </label>
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>

        {apiError ? <div className="api-error">{apiError}</div> : null}

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="muted">
          ¿No tienes cuenta? <Link to="/registro">Crear una</Link>
        </p>
      </form>
    </div>
  );
}
