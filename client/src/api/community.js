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

// Add new community post with support for photo upload
export const addCommunityPost = async (postData) => {
  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.tags && postData.tags.length > 0) {
      formData.append('tags', JSON.stringify(postData.tags));
    }
    if (postData.media && postData.media.length > 0) {
      postData.media.forEach((file) => {
        formData.append('media', file);
      });
    }
    const response = await axios.post(`${API_URL}/api/community`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding community post:', error);
    throw error;
  }
};
