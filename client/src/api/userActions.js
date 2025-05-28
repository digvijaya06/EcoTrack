import axios from 'axios';
import { API_URL } from '../config/constants';

// Get the auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch user actions with optional filters
export const fetchUserActions = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/api/actions`, {
      headers: getAuthHeader(),
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user actions:', error);
    throw error;
  }
};

// Fetch user dashboard data
export const fetchUserDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/dashboard`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Add new action
export const addAction = async (actionData) => {
  try {
    const response = await axios.post(`${API_URL}/api/actions`, actionData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error adding action:', error);
    throw error;
  }
};

// Update existing action
export const updateAction = async (id, actionData) => {
  try {
    const response = await axios.put(`${API_URL}/api/actions/${id}`, actionData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating action:', error);
    throw error;
  }
};

// Delete an action
export const deleteAction = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/actions/${id}`, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error deleting action:', error);
    throw error;
  }
};
