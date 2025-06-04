import axios from 'axios';
import { API_URL } from '../config/constants';
import { getAuthHeader } from './goalService'; // reuse auth header function

export const getUserBadges = () =>
  axios.get(`${API_URL}/api/users/me/badges`, { headers: getAuthHeader() });
