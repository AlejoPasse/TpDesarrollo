export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  usuario?: {
    id: number;
    email: string;
    nombre: string;
  };
}