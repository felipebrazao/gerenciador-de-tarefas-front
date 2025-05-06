export interface User {
  id?: string;
  name: string;
  email: string;
}


export interface LoginData {
  email: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}