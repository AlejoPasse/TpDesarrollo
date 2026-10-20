import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // <--- 1. Importar

function Dashboard() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Poppins' }}>
      <h1>¡Bienvenido al Panel Principal de la Plataforma!</h1>
      <p>Has iniciado sesión correctamente.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- 2. Definir ruta */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}