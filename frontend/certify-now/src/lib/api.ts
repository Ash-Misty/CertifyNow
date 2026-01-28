import axios from 'axios';

// Configure your backend base URL here
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear token and redirect
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/api/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  
  uploadSettings: (formData: FormData) =>
    api.post('/api/admin/settings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  generateCertificates: () => api.post('/api/admin/generate'),
};

// Excel API
export const excelAPI = {
  uploadExcel: (formData: FormData) =>
    api.post('/api/excel/upload-excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Verification API (Public)
export const verifyAPI = {
  verifyCertificate: (certificateId: string) =>
    api.get(`/api/verify/${certificateId}`),
  
  downloadCertificate: (certificateId: string) =>
    `${API_BASE_URL}/api/download/${certificateId}`,
};