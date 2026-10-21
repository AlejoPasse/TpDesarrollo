import { useState } from 'react';
import './Cliente.css';

export default function ClienteDashboard() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

  const [isEditing, setIsEditing] = useState(false);
  const [peso, setPeso] = useState(user.peso || 75);
  const [altura, setAltura] = useState(user.altura || 1.75);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const imcVal = Number(altura) > 0 ? (Number(peso) / (Number(altura) * Number(altura))).toFixed(1) : '0';

  const getImcCategory = (val: number) => {
    if (val < 18.5) return 'Bajo peso';
    if (val < 25) return 'Peso normal';
    if (val < 30) return 'Sobrepeso';
    return 'Obesidad';
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/usuarios/cliente/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ peso: Number(peso), altura: Number(altura) })
      });

      if (!response.ok) throw new Error('No se pudo actualizar el perfil');

      const data = await response.json();
      
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      setIsEditing(false);
      setMensaje('¡Datos actualizados con éxito!');
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      console.error(err);
      setMensaje('Error al actualizar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 className="cliente-dashboard-title">
            Bienvenido, {user.name || 'seba'}
          </h1>
          <p className="cliente-dashboard-subtitle">
            Este es tu panel principal. Aquí tienes el resumen completo de tu estado actual y actividad.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            padding: '10px 18px',
            backgroundColor: isEditing ? '#64748b' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {isEditing ? 'Cancelar' : '✏️ Actualizar mis datos'}
        </button>
      </div>

      {mensaje && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: mensaje.includes('éxito') ? '#065f46' : '#991b1b',
          color: '#fff',
          fontWeight: '500'
        }}>
          {mensaje}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSave} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '30px', display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '6px' }}>Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', width: '140px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '6px' }}>Altura (ej. 1.75)</label>
            <input
              type="number"
              step="0.01"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', width: '140px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '11px 20px', background: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      )}

      <div className="cliente-cards-grid">
        <div className="cliente-card">
          <h3 className="cliente-card-title">ESTADO DE MEMBRESÍA</h3>
          <p className="cliente-card-value-active">Activa</p>
        </div>

        <div className="cliente-card">
          <h3 className="cliente-card-title">ASISTENCIA DEL MES</h3>
          <p className="cliente-card-value-warning">8 asistencias</p>
        </div>

        <div className="cliente-card">
          <h3 className="cliente-card-title">ALTURA</h3>
          <p className="cliente-card-value-neutral">{user.altura || altura} m</p>
        </div>

        <div className="cliente-card">
          <h3 className="cliente-card-title">PESO</h3>
          <p className="cliente-card-value-neutral">{user.peso || peso} kg</p>
        </div>

        <div className="cliente-card">
          <h3 className="cliente-card-title">IMC (ÍNDICE MASA CORPORAL)</h3>
          <p className="cliente-card-value-neutral">
            {imcVal} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#94a3b8' }}>({getImcCategory(Number(imcVal))})</span>
          </p>
        </div>
      </div>
    </div>
  );
}