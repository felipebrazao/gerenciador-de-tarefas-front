import React from 'react';
import { LoginData } from '../utils/auth';
import styles from './LoginForm.module.css';

type FieldErrors = {
  email?: string;
  password?: string;
};

type Props = {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = React.useState<LoginData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = React.useState<FieldErrors>({});

  const validateField = (name: keyof LoginData, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = 'Preencha este campo';
    } else {
      switch (name) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Insira um email válido';
          }
          break;
        case 'password':
          if (value.length < 6) {
            error = 'A senha deve ter pelo menos 6 caracteres';
          }
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validação em tempo real após o primeiro erro
    if (errors[name as keyof FieldErrors]) {
      validateField(name as keyof LoginData, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof LoginData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valida todos os campos antes de submeter
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (isEmailValid && isPasswordValid) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      {error && <div className={styles.formError}>{error}</div>}
      
      <div className={`${styles.formGroup} ${errors.email ? styles.hasError : ''}`}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.fieldError}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={`${styles.formGroup} ${errors.password ? styles.hasError : ''}`}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          minLength={6}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <span id="password-error" className={styles.fieldError}>
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};
