import API, { getAuthHeader } from './api';

export const getOverallKPIs = async () => {
  const res = await API.get('/admin/analytics/overall-kpis', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getOverallMonthlyImpact = async () => {
  const res = await API.get('/admin/analytics/impact', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getWeeklyActivity = async () => {
  const res = await API.get('/admin/analytics/weekly-activity', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getActionCategories = async () => {
  const res = await API.get('/admin/analytics/category-summary', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getImpactData = async () => {
  const res = await API.get('/admin/analytics/impact-data', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getAchievements = async () => {
  const res = await API.get('/admin/analytics/achievements', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getSummary = async () => {
  const res = await API.get('/admin/analytics/summary', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getActions = async () => {
  const res = await API.get('/admin/analytics/actions', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getGoals = async () => {
  const res = await API.get('/admin/analytics/goals', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getQuestions = async () => {
  const res = await API.get('/admin/analytics/questions', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getTopUsers = async () => {
  const res = await API.get('/admin/analytics/top-users', {
    headers: getAuthHeader(),
  });
  return res.data;
};

// New export analytics API call
export const exportAnalyticsData = async (filters) => {
  const params = {};
  if (filters.timeRange) params.timeRange = filters.timeRange;
  if (filters.category) params.category = filters.category;
  if (filters.userType) params.userType = filters.userType;

  const response = await API.get('/admin/analytics/export', {
    params,
    headers: getAuthHeader(),
    responseType: 'blob', // important for file download
  });
  return response.data;
};
