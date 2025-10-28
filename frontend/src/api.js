// src/api.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function registerUser({ firstName, lastNamePaternal, lastNameMaternal, email, password }) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastNamePaternal, lastNameMaternal, email, password }),
  });

  // intenta leer JSON; si no es JSON, cae a texto
  let payload = null;
  let rawText = "";
  try {
    payload = await res.json();
  } catch {
    try {
      rawText = await res.text();
    } catch {
      rawText = "";
    }
  }

  if (!res.ok) {
    // 1) Caso ideal: el backend manda 409 Conflict
    if (res.status === 403) {
      throw new Error("El correo ya está registrado. Usa otro o inicia sesión.");
    }

    // 2) Mensajes típicos del backend/BD (por si llega como 400/500)
    const msg = (payload && (payload.message || payload.error)) || rawText || "";

    // Heurísticas por si viene desde Postgres/Hibernate
    const looksLikeUniqueEmail =
      /duplicate key|unique constraint|uk6dotkott|already exists|23505/i.test(msg) ||
      (/email/i.test(msg) && /exists|registrad/i.test(msg));

    if (looksLikeUniqueEmail) {
      throw new Error("El correo ya está registrado. Usa otro o inicia sesión.");
    }

    // 3) Fallback genérico
    throw new Error(msg || "Error en registro");
  }

  return payload ?? {};
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || "Error en login");
  return payload;
}

export async function verifyOtp({ email, code }) {
  const res = await fetch(`${BASE}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || "OTP inválido");
  return payload;
}

export async function apiMe(token) {
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || "No autorizado");
  return payload;
}
