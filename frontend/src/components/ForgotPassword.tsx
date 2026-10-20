import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoGym from '../assets/img/logo-gimnasio.jpg';
import bgGym from '../assets/img/bg-5.jpg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');
    setLoading(true);

    try {
      // Petición al backend para actualizar la contraseña directamente
      const response = await fetch('http://localhost:3000/api/usuarios/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar la contraseña');
      }

      setMensajeExito('¡Contraseña actualizada con éxito! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : 'No se pudo actualizar la contraseña';
      setMensajeError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-aside">
        <div className="login-wrapper">
          <div className="login-body">
            <div className="login-logo">
              <img src={logoGym} alt="Fitness Gym" />
            </div>

            <div className="login-header">
              <h1 className="login-title">
                Restablecer contraseña
              </h1>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {mensajeError && (
                <div className="login-error" role="alert">
                  {mensajeError}
                </div>
              )}

              {mensajeExito && (
                <div 
                  className="login-error" 
                  role="alert" 
                  style={{ color: '#0f5132', background: '#d1e7dd', borderColor: '#badbcc' }}
                >
                  {mensajeExito}
                </div>
              )}

              <div className="login-field">
                <label htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email"
                  className="login-input"
                  type="email"
                  placeholder="Ingresá tu email registrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="forgot-password">Nueva Contraseña</label>
                <input
                  id="forgot-password"
                  className="login-input"
                  type="password"
                  placeholder="Ingresá tu nueva clave"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-actions">
                <button
                  className="login-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                </button>
              </div>
            </form>

            <div className="login-account">
              <span>¿Recordaste tu clave?</span>
              {' '}
              <Link to="/login" className="login-register">
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="login-content"
        style={{ backgroundImage: `url(${bgGym})` }}
      >
        <div className="login-content-inner">
          <h2 className="login-welcome">
            Actualiza tu clave de acceso.
          </h2>
          <p className="login-message">
            Ingresa tu correo y tu nueva contraseña para volver a gestionar tu gimnasio al instante.
          </p>
        </div>
      </section>
    </main>
  );
}