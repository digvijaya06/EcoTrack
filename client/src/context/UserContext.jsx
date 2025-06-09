import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser({
          ...response.data,
          totalPoints: response.data.points || 0
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const updatePoints = (pointsToAdd) => {
    if (!user) return;
    setUser(prevUser => ({
      ...prevUser,
      totalPoints: (prevUser.totalPoints || 0) + pointsToAdd,
      actionsCompleted: (prevUser.actionsCompleted || 0) + 1
    }));
    // Optionally, make an API call to update points on the server
  };

  const login = (token, userData) => {
    setToken(token);
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, loading, updatePoints, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
