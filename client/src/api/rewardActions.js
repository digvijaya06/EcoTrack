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
