import { useEffect, useState } from 'react'
import { apiMe } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Success() {
  const [msg, setMsg] = useState('Cargando...')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      setMsg('No hay token. Inicia sesión.')
      return
    }
    apiMe(token)
      .then(data => setMsg(`✅ Acceso exitoso. ${data.message}`))
      .catch(() => {
        setMsg('Token inválido/expirado. Inicia sesión de nuevo.')
        localStorage.removeItem('jwt')
        setTimeout(() => navigate('/login'), 1500)
      })
  }, [navigate])

  return (
    <div>
      <h2>Éxito</h2>
      <p>{msg}</p>
    </div>
  )
}
