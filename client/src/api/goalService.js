import API, { getAuthHeader } from './api';

export const fetchGoals = () =>
  API.get('/goals', { headers: getAuthHeader() });

export const createGoal = (goalData) =>
  API.post('/goals', goalData, { headers: getAuthHeader() });

export const updateGoal = (goalId, updatedData) =>
  API.put(`/goals/${goalId}`, updatedData, { headers: getAuthHeader() });

export const deleteGoal = (goalId) =>
  API.delete(`/goals/${goalId}`, { headers: getAuthHeader() });
