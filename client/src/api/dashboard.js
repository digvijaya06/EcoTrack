import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getDashboardData = async () => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: 'Bearer ' + token } : {};

  const res = await axios.get(API_URL + '/api/dashboard', { headers });
  return res.data;
};

export const updateUserPoints = async (userId, points, reason) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: 'Bearer ' + token } : {};

  const res = await axios.post(
    API_URL + '/api/points/update',
    { userId, points, reason },
    { headers }
  );
  return res.data;
};
