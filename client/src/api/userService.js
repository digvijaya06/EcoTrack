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
