import axios from 'axios';
import { API_URL } from '../config/constants';

// Get the auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
};

// Fetch community posts
export const fetchCommunityPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/community`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    throw error;
  }
};

// Add new community post
export const addCommunityPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/api/community`, postData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error adding community post:', error);
    throw error;
  }
};
