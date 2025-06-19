import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  authError: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  setAuthError: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sync token with axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Function to verify and fetch current user info
  const refreshUser = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/users/me`);
      console.log('refreshUser response:', response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Initial effect on mount
  useEffect(() => {
    refreshUser();
  }, [token]);

  // Login method
  const login = async (email, password) => {
    try {
      setAuthError(null);
      setIsLoading(true);
      console.log('AuthContext: Attempting login for', email);
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      console.log('AuthContext: Login response', response.data);
      const { token, user } = response.data;

      if (token) {
        // Set role based on isAdmin
        user.role = user.isAdmin ? 'admin' : 'registered';

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // store full user object in localStorage
        console.log('AuthContext: Stored user in localStorage:', user);
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true; // explicitly return true on success
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register method
  const register = async (name, username, email, password) => {
    try {
      setAuthError(null);
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/register`, { name, username, email, password });
      const { token, user } = response.data;

      if (token) {
        // Set role based on isAdmin
        user.role = user.isAdmin ? 'admin' : 'registered';

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // store full user object in localStorage
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error('Invalid token during registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // remove username from localStorage
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update user state locally
  const updateUser = (userData) => {
    if (user) {
      setUser(prev => ({ ...prev, ...userData }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        authError,
        login,
        register,
        logout,
        updateUser,
        setAuthError,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to consume the context
export const useAuth = () => useContext(AuthContext);
