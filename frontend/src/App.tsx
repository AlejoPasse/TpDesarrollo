import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import ClienteLayout from './components/cliente/ClienteLayout';
import ClienteDashboard from './components/cliente/ClienteDashboard';

// Componente temporal del Administrador
function AdminDashboard() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Poppins' }}>
      <h1>Panel de Administración (Admin)</h1>
      <p>Bienvenido, administrador. Zona segura protegida por rol.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Rutas Protegidas para Administradores */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Rutas Protegidas para Clientes (con Layout y Dashboard modularizados) */}
        <Route element={<ProtectedRoute allowedRole="cliente" />}>
          <Route path="/cliente" element={<ClienteLayout />}>
            <Route path="dashboard" element={<ClienteDashboard />} />
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}