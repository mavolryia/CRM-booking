import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginRequest, register as registerRequest, fetchMe } from '../api/auth';

const AuthContext = createContext(null);

const STORAGE_KEY = 'crm_auth_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetchMe(token)
      .then(({ user }) => setUser(user))
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(email, password) {
    const { token, user } = await loginRequest(email, password);
    localStorage.setItem(STORAGE_KEY, token);
    setToken(token);
    setUser(user);
  }

  async function register(email, password) {
    const { token, user } = await registerRequest(email, password);
    localStorage.setItem(STORAGE_KEY, token);
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
