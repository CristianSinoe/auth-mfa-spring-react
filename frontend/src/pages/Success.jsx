// src/pages/Success.jsx
import { useEffect, useState } from "react";
import { apiMe } from "../api";
import Loader from "../components/Loader";

export default function Success() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          setMsg("No hay token. Inicia sesión de nuevo.");
          return;
        }

        const data = await apiMe(token);
        setMsg(data.message || "Autenticado correctamente.");
      } catch (e) {
        setMsg(e.message || "No autorizado.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="glitch-form-wrapper cyber-theme">
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {!loading && (
        <div className="glitch-card" style={{ width: "100%", maxWidth: 420 }}>
          <div className="card-header">
            <div className="card-title">SESIÓN INICIADA</div>
            <div className="card-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="card-body">
            <p style={{ fontSize: "1rem", color: "#e5e5e5", textAlign: "center" }}>
              {msg}
            </p>

            <button
              onClick={() => {
                localStorage.removeItem("jwt");
                window.location.href = "/login";
              }}
              className="submit-btn neon-btn"
              data-text="Cerrar sesión"
              style={{ marginTop: "1.5rem" }}
            >
              <span className="btn-text">Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
