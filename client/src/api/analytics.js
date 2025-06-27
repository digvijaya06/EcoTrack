import API, { getAuthHeader } from './api';

export const getOverallKPIs = async () => {
  const res = await API.get('/analytics/overall-kpis', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getOverallMonthlyImpact = async () => {
  const res = await API.get('/analytics/overall-monthly-impact', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getWeeklyActivity = async () => {
  const res = await API.get('/analytics/weekly-activity', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getActionCategories = async () => {
  const res = await API.get('/analytics/action-categories', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getImpactData = async () => {
  const res = await API.get('/analytics/impact-data', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getAchievements = async () => {
  const res = await API.get('/analytics/achievements', {
    headers: getAuthHeader(),
  });
  return res.data;
};


export const getSummary = async () => {
  const res = await API.get('/analytics/summary', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getActions = async () => {
  const res = await API.get('/analytics/actions', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getGoals = async () => {
  const res = await API.get('/analytics/goals', {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getQuestions = async () => {
  const res = await API.get('/analytics/questions', {
    headers: getAuthHeader(),
  });
  return res.data;
};
