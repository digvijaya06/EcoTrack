// Added API calls for category targets

import axios from 'axios';

const API_URL = '/api/rewards/';

// Get all rewards
export const fetchRewards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get reward by ID
export const fetchRewardById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${id}`, config);
  return response.data;
};

// Create new reward
export const createReward = async (rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, rewardData, config);
  return response.data;
};

// Update reward
export const updateReward = async (id, rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}`, rewardData, config);
  return response.data;
};

// Delete reward
export const deleteReward = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

// Get all users with impact progress and badge eligibility
export const fetchUsersWithEligibility = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}eligibility/users`, config);
  return response.data;
};

// Approve badge for a user
export const approveBadge = async (userId, badgeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}approve`, { userId, badgeId }, config);
  return response.data;
};

// Send email with badge image
export const sendBadgeEmail = async (userEmail, badgeImageUrl, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}send-email`, { userEmail, badgeImageUrl }, config);
  return response.data;
};

// Get all category targets
export const fetchCategoryTargets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}category-targets`, config);
  return response.data;
};

// Set or update category target points
export const setCategoryTarget = async (categoryTargetData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}category-targets`, categoryTargetData, config);
  return response.data;
};
