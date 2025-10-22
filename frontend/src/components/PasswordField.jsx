import { useState } from "react";

export default function PasswordField({ value, onChange, required }) {
  const [show, setShow] = useState(false);
  return (
    <div className="form-group" style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-label="Contraseña"
      />
      <label className="form-label" data-text="CONTRASEÑA">CONTRASEÑA</label>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        style={{
          position: "absolute", right: 0, top: 6, bottom: 6,
          display: "grid", placeItems: "center",
          background: "transparent", border: "none", color: "#00f2ea",
          cursor: "pointer", padding: "0 6px"
        }}
      >
        {show ? "Mostrar" : "Ocultar"}
      </button>
    </div>
  );
}
