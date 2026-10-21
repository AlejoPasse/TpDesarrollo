import { createContext, useContext, useState, type ReactNode } from 'react';    

import { loginUser} from '../services/auth.service';
import type { LoginCredentials, AuthResponse } from '../types/user.types';

interface AuthContextType { 
    user: AuthResponse ["usuario"] | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthResponse ["usuario"] | null>(null);

    const login = async (credentials: LoginCredentials): Promise<void> => { 
        const response = await loginUser(credentials);
        setUser(response.usuario);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    }   

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}