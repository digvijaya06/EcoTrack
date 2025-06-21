import API, { getAuthHeader } from './api';

// Fetch community posts
export const fetchCommunityPosts = async () => {
  try {
    const response = await API.get('/community', {
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

    if (postData.tags?.length) {
      formData.append('tags', JSON.stringify(postData.tags));
    }

    if (postData.media?.length) {
      postData.media.forEach(file => {
        formData.append('media', file);
      });
    }

    const response = await API.post('/community', formData, {
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
