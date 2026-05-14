import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSubscription = async () => {
    if (!localStorage.getItem('vt_user_token')) {
      setSubscription(null);
      return null;
    }
    const sub = await api.getMySubscription();
    setSubscription(sub);
    localStorage.setItem('user_subscribed', sub?.status === 'Active' ? 'true' : 'false');
    return sub;
  };

  useEffect(() => {
    const stored = localStorage.getItem('vt_user');
    if (!stored || !localStorage.getItem('vt_user_token')) {
      setLoading(false);
      return;
    }
    setUser(JSON.parse(stored));
    refreshSubscription().finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    setUser(data.user);
    localStorage.setItem('vt_user_token', data.token);
    localStorage.setItem('vt_user', JSON.stringify(data.user));
    await refreshSubscription();
    return data.user;
  };

  const signup = async (name, email, password) => {
    const data = await api.signup(name, email, password);
    setUser(data.user);
    localStorage.setItem('vt_user_token', data.token);
    localStorage.setItem('vt_user', JSON.stringify(data.user));
    await refreshSubscription();
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setSubscription(null);
    localStorage.removeItem('vt_user_token');
    localStorage.removeItem('vt_user');
    localStorage.removeItem('user_subscribed');
  };

  const subscribe = async (plan) => {
    const sub = await api.checkoutSubscription(plan);
    setSubscription(sub);
    localStorage.setItem('user_subscribed', sub?.status === 'Active' ? 'true' : 'false');
    return sub;
  };

  return (
    <AuthContext.Provider value={{ user, subscription, loading, login, signup, logout, subscribe, refreshSubscription, isSubscribed: subscription?.status === 'Active' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
