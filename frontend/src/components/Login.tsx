import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/auth.service';
import logoGym from '../assets/img/logo-gimnasio.jpg';
import bgGym from '../assets/img/bg-5.jpg';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('login-body');

    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMensajeError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      console.log('Login exitoso:', data);
      
      // Redirigir al usuario al dashboard tras un inicio de sesión exitoso
      navigate('/dashboard');
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error
          ? err.message
          : 'Credenciales inválidas';

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
            {/* Logo */}
            <div className="login-logo">
              <img src={logoGym} alt="Fitness Gym" />
            </div>

            {/* Título */}
            <div className="login-header">
              <h1 className="login-title">
                Ingreso de los usuarios activos en la plataforma
              </h1>
            </div>

            {/* Formulario */}
            <form className="login-form" onSubmit={handleSubmit}>
              {mensajeError && (
                <div className="login-error" role="alert">
                  {mensajeError}
                </div>
              )}

              <div className="login-field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  className="login-input"
                  type="email"
                  placeholder="Ingresá tu email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  id="login-password"
                  className="login-input"
                  type="password"
                  placeholder="Ingresá tu contraseña"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" name="remember" />
                  <span>Recordarme</span>
                </label>

                <Link to="/forgot-password" className="login-forgot">
                  Olvidé mi clave
                </Link>
              </div>  

              <div className="login-actions">
                <button
                  className="login-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Ingresar'}
                </button>
              </div>
            </form>

            {/* Registro */}
            <div className="login-account">
              <span>¿No tenés una cuenta todavía?</span>
              {' '}
              <Link to="/register" className="login-register">
                Crear cuenta
              </Link>
            </div>
          </div> {/* Cierra login-body */}
        </div> {/* Cierra login-wrapper */}
      </section> {/* Cierra login-aside */}

      {/* Panel derecho */}
      <section
        className="login-content"
        style={{ backgroundImage: `url(${bgGym})` }}
      >
        <div className="login-content-inner">
          <h2 className="login-welcome">
            Todo tu gimnasio, conectado.
          </h2>

          <p className="login-message">
            Un solo lugar para gestionar tu actividad, consultar
            información y estar al día.
          </p>
        </div>
      </section>
    </main>
  );
}