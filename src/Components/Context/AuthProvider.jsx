import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const savedUser = localStorage.getItem('user_profile');
    try {
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Invalid user_profile JSON in localStorage:', error);
      return null;
    }
  });

  const login = (data) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user_profile', JSON.stringify(data.user_profile));
    setUserProfile(data.user_profile);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_profile');
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

