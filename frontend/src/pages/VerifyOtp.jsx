import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiVerifyOtp } from '../api'

export default function VerifyOtp() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const e = sessionStorage.getItem('otp_email')
    if (!e) {
      setMsg('No hay email pendiente de verificación. Vuelve a Login.')
    } else {
      setEmail(e)
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      const res = await apiVerifyOtp({ email, code })
      localStorage.setItem('jwt', res.token)
      navigate('/success')
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div>
      <h2>Verificar OTP</h2>
      <p>Hemos enviado un código a: <b>{email || '(sin email)'}</b></p>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:240}}>
        <input placeholder="Código de 6 dígitos" value={code} onChange={e=>setCode(e.target.value)} required />
        <button>Confirmar</button>
      </form>
      {msg && <p style={{marginTop:12}}>{msg}</p>}
    </div>
  )
}
