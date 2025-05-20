import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { LoginForm } from './LoginForm';
import styles from './LoginPage.module.css';
import { Logo } from '../components/Logo/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (data: { email: string; senha: string }) => {
    try {
      await login(data);
      navigate('/usuarios');
    } catch (err) {
      console.error('Falha no login:', err);
    }
  };

  return (
    <div className={styles.authPage}>
        <a href="/"><Logo size="large" /></a>
      <h1 className={styles.authTitle}>Acesse sua conta</h1>
      
      <div className={styles.authFormContainer}>
        {error && (
          <div className={styles.authError}>
            {typeof error === 'string' ? error : 'Credenciais inválidas'}
          </div>
        )}
        
        <LoginForm 
          onSubmit={handleLogin} 
          isLoading={isLoading}
        />
      </div>
      
      <p className={styles.authLink}>
        Novo por aqui? <a href="/register" className={styles.authTransition}>Crie uma conta</a>
      </p>
    </div>
  );
};