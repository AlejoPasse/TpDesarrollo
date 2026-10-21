import type { LoginCredentials, AuthResponse } from '../types/user.types';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }

  // Guardamos el token JWT y los datos del usuario (que incluyen 'role': 'admin' o 'cliente') en localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

// Modificamos 'nombre' por 'name' para que coincida con el backend y el formulario
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al registrar el usuario');
  }

  return data;
};