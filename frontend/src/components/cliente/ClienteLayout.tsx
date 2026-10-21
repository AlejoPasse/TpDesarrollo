import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Cliente.css';

export default function ClienteLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="cliente-layout">
      {/* Sidebar de navegación */}
      <aside className="cliente-sidebar">
        <div className="cliente-logo">
          Fitness Gym 🏋️‍♂️
        </div>
        
        <nav className="cliente-nav">
          <Link to="/cliente/dashboard" className="cliente-nav-link active-link">
            📊 Mi Panel
          </Link>
          <Link to="/cliente/rutinas" className="cliente-nav-link">
            💪 Mis Rutinas
          </Link>
          <Link to="/cliente/clases" className="cliente-nav-link">
            📅 Clases y Reservas
          </Link>
          <Link to="/cliente/membresia" className="cliente-nav-link">
            💳 Mi Membresía
          </Link>
        </nav>

        <button onClick={handleLogout} className="cliente-logout-btn">
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido Principal */}
      <main className="cliente-main">
        <header className="cliente-header">
          {/* Espacio superior limpio o libre de notificaciones */}
        </header>

        <div className="cliente-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}