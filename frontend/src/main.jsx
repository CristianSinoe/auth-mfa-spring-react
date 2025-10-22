import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Success from './pages/Success.jsx'

function App() {
  return (
    <BrowserRouter>
      <nav style={{display:'flex', gap:16, padding:16, borderBottom:'1px solid #ddd'}}>
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
      </nav>
      <div style={{padding:16}}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
