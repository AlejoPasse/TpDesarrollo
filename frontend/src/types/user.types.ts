export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string; // 'admin' o 'cliente'
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  token: string;
  user: User; 
}