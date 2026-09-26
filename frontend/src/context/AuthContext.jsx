import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('gridskill_token');
    const savedUser = localStorage.getItem('gridskill_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('gridskill_token');
        localStorage.removeItem('gridskill_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const accessToken = data.token.access_token;
    const userData = data.user;

    localStorage.setItem('gridskill_token', accessToken);
    localStorage.setItem('gridskill_user', JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    const accessToken = data.token.access_token;
    const userData = data.user;

    localStorage.setItem('gridskill_token', accessToken);
    localStorage.setItem('gridskill_user', JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('gridskill_token');
    localStorage.removeItem('gridskill_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
