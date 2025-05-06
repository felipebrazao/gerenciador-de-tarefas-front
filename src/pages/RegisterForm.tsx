import React from 'react';
import { RegisterData } from '../utils/auth';

type Props = {
  onSubmit: (data: RegisterData) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const RegisterForm: React.FC<Props> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = React.useState<RegisterData>({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Criar conta'}
      </button>
    </form>
  );
};