// frontend/src/services/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL,
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;