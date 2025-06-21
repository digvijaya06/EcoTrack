import API, { getAuthHeader } from './api';

// Fetch a user's profile by ID
export const fetchUserProfile = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update the current user's profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put('/users/profile', profileData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Fetch leaderboard with optional time frame
export const fetchLeaderboard = async (timeFrame = 'all') => {
  try {
    const response = await API.get('/users/leaderboard', {
      headers: getAuthHeader(),
      params: { timeFrame },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};
