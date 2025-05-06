import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { RegisterForm } from './RegisterForm';
import { RegisterData } from '../utils/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      // Redirecionar para a página de login após registro bem-sucedido
      navigate('/login');
    } catch (err) {
      // O erro já está sendo tratado no hook useAuth
      console.error('Falha no registro:', err);
    }
  };

  return (
    <div className="auth-page">
      <h1>Criar nova conta</h1>
      <RegisterForm 
        onSubmit={handleRegister} 
        isLoading={isLoading}
        error={error}
      />
      <p className="auth-link">
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};