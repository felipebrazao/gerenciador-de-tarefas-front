import { AuthResponse, RegisterData } from '../utils/auth';

// Esta será substituída pela implementação real posteriormente
export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    console.log('Dados enviados para registro:', data);
    
    // Simulando delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retorno mockado - será removido quando o backend estiver pronto
    return {
      user: {
        id: '1',
        name: data.name,
        email: data.email
      },
      token: 'mock-token-123456'
    };
  }
};