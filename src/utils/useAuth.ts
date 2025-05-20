import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';





export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro do AuthProvider');
  }

  return context;
};