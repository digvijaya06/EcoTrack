import API, { getAuthHeader } from './api';

// Fetch user actions with optional filters
export const fetchUserActions = async (filters) => {
  try {
    const response = await API.get('/actions', {
      headers: getAuthHeader(),
      params: filters,
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
    const response = await API.get('/users/dashboard', {
      headers: getAuthHeader(),
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
    if (!actionData.tags) {
      actionData.tags = [];
    }

    const response = await API.post('/actions', actionData, {
      headers: getAuthHeader(),
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
    const response = await API.put(`/actions/${id}`, actionData, {
      headers: getAuthHeader(),
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
    await API.delete(`/actions/${id}`, {
      headers: getAuthHeader(),
    });
    return true;
  } catch (error) {
    console.error('Error deleting action:', error);
    throw error;
  }
};

// Fetch user achievements
export const fetchUserAchievements = async () => {
  try {
    const response = await API.get('/users/me/achievements', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
};
