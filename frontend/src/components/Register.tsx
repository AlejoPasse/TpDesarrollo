import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.service';
import logoGym from '../assets/img/logo-gimnasio.jpg';
import bgGym from '../assets/img/bg-5.jpg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
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
    setLoading(true);

    try {
      // Enviamos 'name' en lugar de 'nombre' para que coincida con el backend
      await registerUser({ name, email, password });
      
      alert('¡Usuario registrado y guardado en la base de datos con éxito!');
      navigate('/login'); // Redirige al login tras registrarse con éxito
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : 'Error al registrar la cuenta';
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
                Registrate en la plataforma
              </h1>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {mensajeError && (
                <div className="login-error" role="alert">
                  {mensajeError}
                </div>
              )}

              <div className="login-field">
                <label htmlFor="register-name">Nombre y Apellido</label>
                <input
                  id="register-name"
                  className="login-input"
                  type="text"
                  placeholder="Ingresá tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  className="login-input"
                  type="email"
                  placeholder="Ingresá tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="register-password">Contraseña</label>
                <input
                  id="register-password"
                  className="login-input"
                  type="password"
                  placeholder="Ingresá tu contraseña"
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
                  {loading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
              </div>
            </form>

            <div className="login-account">
              <span>¿Ya tenés una cuenta?</span>
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
            Comenzá tu transformación hoy.
          </h2>
          <p className="login-message">
            Crea tu cuenta en segundos y gestiona todas tus actividades en un solo lugar.
          </p>
        </div>
      </section>
    </main>
  );
}