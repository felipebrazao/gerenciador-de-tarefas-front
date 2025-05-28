type Usuario = {
  id: string;
  nome: string;
  email: string;
  authorities?: {authority: string }[];
};

export interface AuthResponse{
  token: string;
  usuario: Usuario;
}


export interface LoginData {
  email: string;
  senha: string;
};

export interface RegisterResponse {
  token: string;
  usuario?: {
    id: string;
    nome: string;
    email: string;
  };
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export type ApiResponse<T = any> = {
  data: T;
  token?: string;
  message?: string;
  timestamp?: string;
  status?: number;
  path?: string;
};

export type ApiError = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
};

export type AuthContextType = {
  usuario: Usuario | null;
  isAdmin: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: { email: string; senha: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

export type FieldErrors = {
  nome?: string;
  email?: string;
  senha?: string;
};
