import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('⚠️ Por favor completá todos los campos');
      return;
    }

    const loginExitoso = login(email, password);
    
    if (loginExitoso) {
      toast.success('✅ ¡Bienvenido! Sesión iniciada correctamente', {
        autoClose: 2000
      });
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      toast.error('❌ Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className="btn-login">
            Ingresar
          </button>
        </form>
        
        <p className="login-hint">
          💡 Usá cualquier email y contraseña para este demo
        </p>
      </div>
    </div>
  );
}

export default Login;