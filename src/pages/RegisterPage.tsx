import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { RegisterForm } from './RegisterForm';
import { RegisterData } from '../utils/auth';
import styles from './RegisterPage.module.css'; // Importe os estilos
import { Logo } from '../components/Logo/Logo';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      navigate('/login');
    } catch (err) {
      console.error('Falha no registro:', err);
    }
  };

  return (
    <div className={styles.authPage}>
      <a href="/"><Logo size="large" /></a>
      <h1 className={styles.authTitle}>Criar nova conta</h1>
      
      <div className={styles.authFormContainer}>
        {error && (
          <div className={styles.authError}>
            {typeof error === 'string' ? error : 'Ocorreu um erro no registro'}
          </div>
        )}
        
        <RegisterForm 
          onSubmit={handleRegister} 
          isLoading={isLoading}
        />
      </div>
      
      <p className={styles.authLink}>
        Já tem uma conta? <a href="/login" className={styles.authTransition}>Faça login</a>
      </p>
    </div>
  );
};