// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            setCurrentUser(decoded);
            setIsAuthenticated(true);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/api/token/', { username, password });
    const { access, refresh } = response.data;
    
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    
    const decoded = jwtDecode(access);
    setCurrentUser(decoded);
    setIsAuthenticated(true);
    
    navigate('/');
    return decoded;
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await api.post('/api/token/refresh/', {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      const decoded = jwtDecode(access);
      setCurrentUser(decoded);
      return true;
    } catch (error) {
      handleLogout();
      return false;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout: handleLogout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};