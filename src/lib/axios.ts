// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://lk8m9fzs-8085.inc1.devtunnels.ms',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request or response interceptors
api.interceptors.request.use(
  (config) => {
    // Example: Add authorization token
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: Handle global errors (e.g., redirect to login on 401)
    // if (error.response && error.response.status === 401) {
    //   console.log('Unauthorized, redirecting to login...');
    // }
    return Promise.reject(error);
  }
);

export default api;