import axios from 'axios';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Log API URL in development mode
if (import.meta.env.DEV) {
  console.log('🌐 API URL:', API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log en mode développement
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }
    return config;
  },
  (error) => {
    console.error('❌ Erreur dans request:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log en mode développement
    if (import.meta.env.DEV) {
      console.log(`📥 Réponse ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Log détaillé des erreurs
    if (import.meta.env.DEV) {
      console.error('❌ Erreur API:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Ne pas rediriger si on est déjà sur la page de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

