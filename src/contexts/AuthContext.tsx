/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from 'react';

// 1. Definimos o formato dos dados que vamos guardar
interface AuthContextType {
  isAuthenticated: boolean;
  username?: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('auth_status');
    return storedAuth === 'logado';
  });

  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('auth_user');
  });

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('auth_status', 'logado');
    localStorage.setItem('auth_user', username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('auth_status');
    localStorage.removeItem('auth_user');   
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};