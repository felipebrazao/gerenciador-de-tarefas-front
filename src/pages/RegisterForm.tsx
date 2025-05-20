import React from 'react';
import styles from './RegisterForm.module.css';
import { FieldErrors } from '../utils/auth';


type Props = {
  onSubmit: (data: { nome: string; email: string; senha: string }) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const RegisterForm: React.FC<Props> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [errors, setErrors] = React.useState<FieldErrors>({});

  const validateField = (fieldName: keyof typeof formData, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = 'Preencha este campo';
    } else {
      switch (fieldName) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Insira um email válido';
          }
          break;
        case 'senha':
          if (value.length < 6) {
            error = 'A senha deve ter pelo menos 6 caracteres';
          }
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FieldErrors]) {
      validateField(name as keyof typeof formData, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNomeValid = validateField('nome', formData.nome);
    const isEmailValid = validateField('email', formData.email);
    const isSenhaValid = validateField('senha', formData.senha);
    
    if (isNomeValid && isEmailValid && isSenhaValid) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
      {error && (
        <div className={styles.formError} role="alert" aria-live="assertive">
          {typeof error === 'string' ? error : 'Ocorreu um erro no registro'}
        </div>
      )}
      
      <div className={`${styles.formGroup} ${errors.nome ? styles.hasError : ''}`}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-describedby={errors.nome ? "nome-error" : undefined}
          className={styles.formInput}
        />
        {errors.nome && (
          <span id="nome-error" className={styles.fieldError}>
            {errors.nome}
          </span>
        )}
      </div>

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
          aria-describedby={errors.email ? "login-error" : undefined}
          className={styles.formInput}
        />
        {errors.email && (
          <span id="login-error" className={styles.fieldError}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={`${styles.formGroup} ${errors.senha ? styles.hasError : ''}`}>
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          minLength={6}
          aria-describedby={errors.senha ? "senha-error" : undefined}
          className={styles.formInput}
        />
        {errors.senha && (
          <span id="senha-error" className={styles.fieldError}>
            {errors.senha}
          </span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            Registrando...
          </>
        ) : (
          'Criar conta'
        )}
      </button>
    </form>
  );
};