import { useState } from 'react';
import { authAPI } from '../api/authAPI';
import { RegisterData } from './auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.register(data);
      // Aqui você pode armazenar o token/user no contexto ou localStorage
      console.log('Registro bem-sucedido:', response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};