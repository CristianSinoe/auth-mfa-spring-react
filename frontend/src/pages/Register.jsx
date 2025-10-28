import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastNamePaternal, setLastNamePaternal] = useState("");
  const [lastNameMaternal, setLastNameMaternal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Expresión regular: solo letras, espacios y acentos
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    // 🔍 Validaciones antes de enviar
    if (!nameRegex.test(firstName)) {
      setMsg("El nombre solo puede contener letras y espacios.");
      return;
    }
    if (!nameRegex.test(lastNamePaternal)) {
      setMsg("El apellido paterno solo puede contener letras y espacios.");
      return;
    }
    if (lastNameMaternal && !nameRegex.test(lastNameMaternal)) {
      setMsg("El apellido materno solo puede contener letras y espacios.");
      return;
    }
    if (password.length < 8) {
      setMsg("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Las contraseñas no coinciden.");
      return;
    }

    // 🚀 Si pasa todas las validaciones, registrar
    try {
      await registerUser({
        firstName,
        lastNamePaternal,
        lastNameMaternal: lastNameMaternal || null,
        email,
        password,
      });

      //Limpiar campos
      setFirstName("");
      setLastNamePaternal("");
      setLastNameMaternal("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setMsg("Usuario registrado correctamente. Ahora inicia sesión.");
      setTimeout(() => (window.location.href = "/login"), 1200);
    } catch (err) {
      setMsg(err.message || "Error al registrar usuario.");
    }
  }

  return (
    <div className="glitch-form-wrapper cyber-theme">
      <div className="glitch-card" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-header">
          <div className="card-title">REGISTRO</div>
          <div className="card-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            {/* Nombre */}
            <div className="form-group">
              <input
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label className="form-label" data-text="Nombre">
                Nombre
              </label>
            </div>

            {/* Apellido paterno */}
            <div className="form-group">
              <input
                placeholder=" "
                value={lastNamePaternal}
                onChange={(e) => setLastNamePaternal(e.target.value)}
                required
              />
              <label className="form-label" data-text="Apellido paterno">
                Apellido paterno
              </label>
            </div>

            {/* Apellido materno */}
            <div className="form-group">
              <input
                placeholder=" "
                value={lastNameMaternal}
                onChange={(e) => setLastNameMaternal(e.target.value)}
              />
              <label
                className="form-label"
                data-text="Apellido materno (opcional)"
              >
                Apellido materno (opcional)
              </label>
            </div>

            {/* Correo */}
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

            {/* Contraseña */}
            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="form-label" data-text="Contraseña">
                Contraseña (min 8)
              </label>
            </div>

            {/* Confirmar contraseña */}
            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label
                className="form-label"
                data-text="Confirmar contraseña"
              >
                Confirmar contraseña
              </label>
              {/*Validación en tiempo real */}
              {confirmPassword &&
                password !== confirmPassword && (
                  <small style={{ color: "#ff6b6b" }}>
                    Las contraseñas no coinciden
                  </small>
                )}
            </div>

            <button className="neon-btn" type="submit">
              Crear cuenta
            </button>
          </form>

          {/* Mensaje de estado */}
          {msg && (
            <p
              style={{
                marginTop: 12,
                color: msg.startsWith("") ? "#0fffa0" : "#ff6b6b",
                textAlign: "center",
              }}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
