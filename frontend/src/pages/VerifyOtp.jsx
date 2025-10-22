import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyOtp } from '../api'

export default function VerifyOtp(){
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email || ''
  const [code, setCode] = useState(['','','','','',''])
  const [msg, setMsg] = useState('')

  const inputs = Array.from({length:6}).map(()=>useRef(null))

  useEffect(()=>{ if(!email) navigate('/login') }, [email, navigate])

  function onChange(i, val){
    const v = val.replace(/\D/g,'').slice(0,1)
    const next = [...code]; next[i]=v; setCode(next)
    if(v && i<5) inputs[i+1].current?.focus()
  }

  async function onSubmit(e){
    e.preventDefault()
    setMsg('')
    try{
      const tokenResp = await verifyOtp({ email, code: code.join('') })
      localStorage.setItem('jwt', tokenResp.token)
      navigate('/success')
    }catch(err){
      setMsg(err.message || 'OTP inválido')
    }
  }

  return (
    <div className="glitch-form-wrapper">
      <div className="glitch-card">
        <div className="card-header">
          <div className="card-title">VERIFICAR OTP</div>
          <div className="card-dots"><span></span><span></span><span></span></div>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit} style={{display:'grid', gap:16}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(6, 48px)', gap:8, justifyContent:'center'}}>
              {code.map((c,i)=>(
                <input
                  key={i}
                  ref={inputs[i]}
                  inputMode="numeric"
                  maxLength={1}
                  value={c}
                  onChange={e=>onChange(i, e.target.value)}
                  style={{
                    textAlign:'center',
                    fontSize:24,
                    padding:8,
                    background:'transparent',
                    color:'var(--text-color)',
                    border:'2px solid rgba(0, 242, 234, 0.3)',
                    borderRadius:6
                  }}
                />
              ))}
            </div>
            <button className="neon-btn" type="submit">Verificar</button>
          </form>
          {msg && <p style={{marginTop:12}}>{msg}</p>}
          <p style={{opacity:.7, marginTop:8}}>Código enviado a: <b>{email}</b></p>
        </div>
      </div>
    </div>
  )
}
