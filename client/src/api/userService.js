import API, { getAuthHeader } from './api';

export const getUserBadges = async () => {
  try {
    const response = await API.get('/users/me/badges', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await API.get('/admin/users', {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await API.put(`/admin/users/${userId}`, updates, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/admin/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
