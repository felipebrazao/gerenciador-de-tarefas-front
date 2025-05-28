import axios from 'axios';
import { ApiError } from './auth';



const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


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
  (response) => {
    return response;
  },
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


export const api = {
  get: <T>(url: string, config?: any) => 
    apiClient.get<T>(url, config).then(res => res.data),
  
  post: <T>(url: string, data?: any, config?: any) => 
    apiClient.post<T>(url, data, config).then(res => res.data),
  
  put: <T>(url: string, data?: any, config?: any) => 
    apiClient.put<T>(url, data, config).then(res => res.data),
  
  delete: <T>(url: string, config?: any) => 
    apiClient.delete<T>(url, config).then(res => res.data),
};



export default apiClient;