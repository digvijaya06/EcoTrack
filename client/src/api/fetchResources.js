// src/api/fetchResources.js

import axios from 'axios';
import { API_URL } from '../config/constants';

// Get the auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch resources, optionally by category and pagination
export const fetchResources = async (category, page = 1, limit = 10) => {
  try {
    const params = {};
    if (category) params.category = category;
    params.page = page;
    params.limit = limit;

    const response = await axios.get(`${API_URL}/api/resources`, {
      headers: getAuthHeader(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// Fetch events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
