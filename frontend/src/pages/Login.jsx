import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await apiLogin({ email, password })
      // Guardamos el email para la pantalla de OTP
      sessionStorage.setItem('otp_email', email)
      navigate('/verify-otp')
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:360}}>
        <input type="email" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button>Entrar</button>
      </form>
      {msg && <p style={{marginTop:12}}>{msg}</p>}
      <p style={{marginTop:12, fontSize:13}}>Después de este paso recibirás un código OTP por correo.</p>
    </div>
  )
}
