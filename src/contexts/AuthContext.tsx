import React, { createContext, useContext, useState } from 'react';
import { User, RegisterData } from '../utils/auth'; // Assumindo que essas tipagens existem

type AuthContextType = {
  user: User | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Substitua por sua chamada real à API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha no registro');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Substitua por sua chamada real à API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Adicione chamada à API de logout se necessário
  };

  return (
    <AuthContext.Provider value={{
      user,
      register,
      login,
      logout,
      isLoading,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);