import { useState } from 'react';
import { api } from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (data: { nome: string; email: string; senha: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post<{
        id: number;
        email: string;
        name: string;
      }>('/auth/register', data);

      // Redireciona para login após registro bem-sucedido
      navigate('/login', { 
        state: { 
          registrationSuccess: true,
          email: data.email 
        } 
      });

      return response.data;
    } catch (err: any) { // Usando 'any' temporariamente para simplificar
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Erro durante o registro';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};