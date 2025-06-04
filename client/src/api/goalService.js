import axios from 'axios';
import { API_URL } from '../config/constants';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchGoals = (userId) =>
  axios.get(`${API_URL}/api/goals/${userId}`, { headers: getAuthHeader() });

export const createGoal = (goalData) =>
  axios.post(`${API_URL}/api/goals`, goalData, { headers: getAuthHeader() });

export const updateGoal = (goalId, updatedData) =>
  axios.put(`${API_URL}/api/goals/${goalId}`, updatedData, { headers: getAuthHeader() });

export const deleteGoal = (goalId) =>
  axios.delete(`${API_URL}/api/goals/${goalId}`, { headers: getAuthHeader() });
