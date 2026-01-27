// // import axios from 'axios';

// // const API = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
// // });

// // // Automatically attach token to all requests if it exists
// // API.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('adminToken');
// //   if (token && config.headers) {
// //     config.headers['Authorization'] = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // Admin APIs
// // export const registerAdmin = async (email: string, password: string, name?: string) => {
// //   const res = await API.post('/admin/register', { email, password, name });
// //   return res.data;
// // };

// // export const loginAdmin = async (email: string, password: string) => {
// //   const res = await API.post('/admin/login', { email, password });
// //   return res.data;
// // };

// // export const fetchDashboardData = async () => {
// //   const res = await API.get('/admin/dashboard');
// //   return res.data;
// // };

// // export default API;
// // src/utils/api.ts
// const BASE_URL = import.meta.env.VITE_API_URL;

// export const registerAdmin = async (email: string, password: string, name: string) => {
//   const res = await fetch(`${BASE_URL}/admin/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password, name }),
//   });
//   return res.json();
// };

// export const loginAdmin = async (email: string, password: string) => {
//   const res = await fetch(`${BASE_URL}/admin/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// };

// // Example function for Admin Dashboard
// export const fetchDashboardData = async () => {
//   const token = localStorage.getItem('adminToken');
//   const res = await fetch(`${BASE_URL}/admin/dashboard`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.json();
// };