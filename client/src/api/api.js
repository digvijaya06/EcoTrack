import axios from 'axios';

// Create a reusable Axios instance with the base API URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Utility to attach JWT token from localStorage to headers
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API;
