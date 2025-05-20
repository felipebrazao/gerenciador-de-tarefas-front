import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/apiClient';
import { 
  Usuario, 
  RegisterData, 
  LoginData, 
  AuthResponse, 
  RegisterResponse, 
  AuthContextType,
  ApiError
} from '../utils/auth';

export { AuthContext };


const AuthContext = createContext<AuthContextType>({
  usuario: null,
  isAdmin: false, // Adicione esta linha
  register: async () => {},
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const isAdmin = usuario?.authorities?.some(auth => 
    auth.authority === "ROLE_ADMIN"
  ) || false;


  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post<RegisterResponse>('/auth/register', {
        
        nome: data.nome,
        email: data.email, 
        senha: data.senha
      });

      if (response.token && response.Usuario) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.Usuario));
        setUsuario(response.Usuario);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro durante o registro');
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email: data.email,
        senha: data.senha
      });

       if (response.token && response.usuario) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        setUsuario(response.usuario); // Deve incluir authorities
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Credenciais inválidas');
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  const savedUsuario = localStorage.getItem('usuario');

  if (token && savedUsuario) {
    try {
      const usuario = JSON.parse(savedUsuario);
      
      // Verificação leve - token existe e dados são válidos
      if (usuario?.id && usuario?.email) { // Ajuste os campos obrigatórios
        setUsuario(usuario);
        
        // Verificação opcional com chamada a qualquer endpoint
        api.get('/usuarios') // Exemplo: endpoint que requer auth
          .catch(() => {
            clearAuthData();
          });
      } else {
        clearAuthData();
      }
    } catch {
      clearAuthData();
    }
  }


  
  function clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }
}, []);

  return (
    <AuthContext.Provider value={{
      usuario,
      isAdmin,
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

