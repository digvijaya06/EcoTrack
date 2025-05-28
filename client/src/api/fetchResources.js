// src/api/fetchResources.js

import axios from 'axios';
import { API_URL } from '../config/constants';

// Get the auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch resources, optionally by category
export const fetchResources = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/api/resources`, {
      headers: getAuthHeader(),
      params: category ? { category } : {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};
