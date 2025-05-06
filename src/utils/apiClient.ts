import axios from 'axios';

// 1. Definindo os tipos manualmente (solução mais segura)
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface AxiosError<T = any> extends Error {
  config: any;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

// 2. Criando a instância do axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Interceptores com tipagem manual
apiClient.interceptors.request.use(
  (config) => {
    // Adicione seu token JWT ou outros headers aqui se necessário
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Retorna apenas os dados da resposta
    return response.data;
  },
  (error: AxiosError) => {
    // Tratamento global de erros
    if (error.response) {
      console.error('Erro na resposta:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.request);
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;