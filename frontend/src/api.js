const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function apiRegister({ firstName, lastName, email, password }) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Error en registro');
  return res.json();
}

export async function apiLogin({ email, password }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Error en login');
  return res.json(); // { message: 'OTP enviado al correo' }
}

export async function apiVerifyOtp({ email, code }) {
  const res = await fetch(`${BASE}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ email, code })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'OTP inválido');
  return res.json(); // { token: '...' }
}

export async function apiMe(token) {
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}
