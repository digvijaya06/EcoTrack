import API, { getAuthHeader } from './api';

// Get dashboard data by time period (week/month/etc)
export const getDashboardData = async (period = 'week') => {
  const res = await API.get('/dashboard', {
    headers: getAuthHeader(),
    params: { period }
  });
  return res.data;
};

// Get admin dashboard data
export const getAdminDashboardData = async () => {
  const res = await API.get('/dashboard', {
    headers: getAuthHeader()
  });
  return res.data;
};

// Update user points manually with reason
export const updateUserPoints = async (userId, points, reason) => {
  const res = await API.post(
    '/points/update',
    { userId, points, reason },
    { headers: getAuthHeader() }
  );
  return res.data;
};
