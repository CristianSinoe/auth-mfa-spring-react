import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await loginUser({ email, password });
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setMsg(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glitch-form-wrapper cyber-theme">
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div className="glitch-card" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-header">
          <div className="card-title">INICIAR SESIÓN</div>
          <div className="card-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="form-label" data-text="Correo electrónico">
                Correo electrónico
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="form-label" data-text="Contraseña">
                Contraseña
              </label>
            </div>

            <button className="submit-btn neon-btn" data-text="Entrar">
              <span className="btn-text">Entrar</span>
            </button>
          </form>

          {msg && <p style={{ marginTop: 12, color: "#f88" }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
