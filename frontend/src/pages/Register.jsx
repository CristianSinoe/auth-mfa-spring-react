import { useState } from 'react'
import { apiRegister } from '../api'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await apiRegister({ firstName, lastName, email, password })
      setMsg('Usuario registrado. Ahora inicia sesión.')
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:360}}>
        <input placeholder="Nombre" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
        <input placeholder="Apellidos" value={lastName} onChange={e=>setLastName(e.target.value)} required />
        <input type="email" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña (min 8)" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button>Crear cuenta</button>
      </form>
      {msg && <p style={{marginTop:12}}>{msg}</p>}
    </div>
  )
}
