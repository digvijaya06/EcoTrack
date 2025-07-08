import axios from 'axios';

// Create a reusable Axios instance with the base API URL
const API = axios.create({
  baseURL: '/api',
});

// Utility to attach JWT token from localStorage to headers
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token and user info from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
