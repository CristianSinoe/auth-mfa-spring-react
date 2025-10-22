// src/api.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function registerUser({ firstName, lastNamePaternal, lastNameMaternal, email, password }) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastNamePaternal, lastNameMaternal, email, password }),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || "Error en registro");
  return payload;
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
