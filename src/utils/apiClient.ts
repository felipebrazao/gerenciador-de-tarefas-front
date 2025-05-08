import axios from 'axios';

// 1. Tipos TypeScript para o Spring Boot
type ApiResponse<T = any> = {
  data: T;
  message?: string;
  timestamp?: string;
  status?: number;
  path?: string;
};

type ApiError = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
};

// 2. Configuração básica
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 3. Criando instância com tipagem segura
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. Interceptores com tipos mínimos
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const springError = error.response.data as ApiError;
      console.error(`[${springError.status}] ${springError.message}`);
      return Promise.reject(springError);
    }
    return Promise.reject({
      message: error.message || 'Erro de conexão',
      status: 500,
    });
  }
);

// 5. Interface da API com tipos genéricos
export const api = {
  get: <T>(url: string, config?: any) => 
    apiClient.get<ApiResponse<T>>(url, config).then(res => res.data),
  
  post: <T>(url: string, data?: any, config?: any) => 
    apiClient.post<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  put: <T>(url: string, data?: any, config?: any) => 
    apiClient.put<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  delete: <T>(url: string, config?: any) => 
    apiClient.delete<ApiResponse<T>>(url, config).then(res => res.data),
};

export default apiClient;