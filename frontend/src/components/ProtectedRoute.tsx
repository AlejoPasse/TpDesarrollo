import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRole: 'admin' | 'cliente';
}

export const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  // Si no hay token o datos de usuario, lo mandamos al login
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  // Si el rol del usuario no coincide con el rol requerido para esta ruta
  if (user.role !== allowedRole) {
    // Lo redirigimos automáticamente a su propio dashboard correspondiente
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/cliente/dashboard'} replace />;
  }

  // Si todo es correcto, permitimos el acceso a la ruta protegida
  return <Outlet />;
};