import axios from 'axios';
import { API_BASE_URL, API_HEADERS } from '../constants/api.constants';

//  axios instance with base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: API_HEADERS,
});

// // Add request interceptor to include token in headers
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor to handle errors
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Token expired or invalid
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default api;