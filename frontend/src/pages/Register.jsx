import { useState } from 'react'
import { registerUser } from '../api'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastNamePaternal, setLastNamePaternal] = useState('')
  const [lastNameMaternal, setLastNameMaternal] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await registerUser({
        firstName,
        lastNamePaternal,
        lastNameMaternal: lastNameMaternal || null,
        email,
        password
      })

      setFirstName('')
      setLastNamePaternal('')
      setLastNameMaternal('')
      setEmail('')
      setPassword('')

      setMsg('✅ Usuario registrado correctamente. Ahora inicia sesión.')
      setTimeout(() => window.location.href = '/login', 1000)


    } catch (err) {
      setMsg(err.message || 'Error al registrar usuario.')
    }
  }

  return (
    <div className="glitch-form-wrapper cyber-theme">
      <div className="glitch-card" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-header">
          <div className="card-title">REGISTRO</div>
          <div className="card-dots"><span></span><span></span><span></span></div>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                placeholder=" "
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <label className="form-label" data-text="Nombre">Nombre</label>
            </div>

            <div className="form-group">
              <input
                placeholder=" "
                value={lastNamePaternal}
                onChange={e => setLastNamePaternal(e.target.value)}
                required
              />
              <label className="form-label" data-text="Apellido paterno">Apellido paterno</label>
            </div>

            <div className="form-group">
              <input
                placeholder=" "
                value={lastNameMaternal}
                onChange={e => setLastNameMaternal(e.target.value)}
              />
              <label className="form-label" data-text="Apellido materno (opcional)">
                Apellido materno (opcional)
              </label>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label className="form-label" data-text="Correo">Correo</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label className="form-label" data-text="Contraseña">Contraseña (min 8)</label>
            </div>

            <button className="neon-btn" type="submit">Crear cuenta</button>
          </form>

          {msg && (
            <p style={{
              marginTop: 12,
              color: msg.startsWith('') ? '#0fffa0' : '#ff6b6b',
              textAlign: 'center'
            }}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
