// src/pages/RegisterPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { RegisterForm } from './RegisterForm';
import styles from './RegisterPage.module.css';
import { Logo } from '../components/Logo/Logo';


interface RegisterPageLocationState {
  registrationSuccess?: boolean;
  email?: string;
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (data: { nome: string; email: string; senha: string }) => {
    try {
      await register(data);
      navigate('/login', { 
        state: { 
          registrationSuccess: true,
          email: data.email
        }  as RegisterPageLocationState
      });
    } catch (err) {
      console.error('Falha no registro:', err);
    }
  };

  return (
    <div className={styles.authPage}>
      <a href="/" className={styles.logoLink}>
        <Logo size="large" />
      </a>
      <h1 className={styles.authTitle}>Criar nova conta</h1>
      
      <div className={styles.authFormContainer}>
        {error && (
          <div className={styles.authError}>
            {error.includes('Email já') ? (
              <>
                {error}. <a href="/login" className={styles.authLink}>Fazer login</a>
              </>
            ) : (
              error
            )}
          </div>
        )}
        
        <RegisterForm 
          onSubmit={handleRegister} 
          isLoading={isLoading}
          error={error}
        />
      </div>
      
      <p className={styles.authLink}>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};