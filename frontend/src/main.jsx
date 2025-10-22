// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Success from "./pages/Success.jsx";
import Loader from "./components/Loader.jsx";
import "./App.css";

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Simula carga inicial
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav
        style={{
          display: "flex",
          gap: 16,
          padding: 16,
          borderBottom: "1px solid #222",
          background: "#050505",
        }}
      >
        <Link to="/register" style={{ color: "#00f2ea" }}>
          Registro
        </Link>
        <Link to="/login" style={{ color: "#00f2ea" }}>
          Iniciar sesión
        </Link>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
