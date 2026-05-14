import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthShell = ({ title, subtitle, children }) => (
  <div className="vt-auth-page">
    <style>{`
      .vt-auth-page { min-height: 100vh; background: #fdfcf7; display: flex; align-items: center; justify-content: center; padding: 110px 20px 50px; font-family: 'Inter', sans-serif; }
      .vt-auth-card { width: 100%; max-width: 430px; background: #fff; border: 1px solid #f0eee4; border-radius: 24px; padding: 36px; box-shadow: 0 24px 55px rgba(45,51,42,.10); }
      .vt-auth-logo { display: block; width: 92px; margin: 0 auto 18px; }
      .vt-auth-card h1 { font-family: 'Playfair Display', serif; color: #2d332a; margin: 0; text-align: center; font-size: 2rem; }
      .vt-auth-card p { color: #6b7280; text-align: center; margin: 8px 0 28px; }
      .vt-field { margin-bottom: 16px; }
      .vt-field label { display: block; color: #2d332a; font-size: .9rem; font-weight: 700; margin-bottom: 7px; }
      .vt-field input { width: 100%; box-sizing: border-box; border: 1px solid #e5e1d4; border-radius: 12px; padding: 13px 14px; font-size: 1rem; outline: none; }
      .vt-field input:focus { border-color: #d4a34d; box-shadow: 0 0 0 3px rgba(212,163,77,.14); }
      .vt-auth-btn { width: 100%; border: 0; border-radius: 12px; padding: 14px; background: #d4a34d; color: #fff; font-weight: 800; cursor: pointer; margin-top: 8px; }
      .vt-auth-btn:disabled { opacity: .65; cursor: not-allowed; }
      .vt-auth-error { background: #fee2e2; color: #991b1b; border-radius: 12px; padding: 11px; font-size: .9rem; margin-bottom: 14px; text-align: center; }
      .vt-auth-link { color: #d4a34d; font-weight: 700; text-decoration: none; }
    `}</style>
    <div className="vt-auth-card">
      <img src="/logo.png" alt="VedhaThrive" className="vt-auth-logo" />
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to continue your healing journey.">
      {error && <div className="vt-auth-error">{error}</div>}
      <form onSubmit={submit}>
        <div className="vt-field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="vt-field"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <button className="vt-auth-btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <p>New here? <Link className="vt-auth-link" to="/signup">Create an account</Link></p>
    </AuthShell>
  );
};

export default Login;
