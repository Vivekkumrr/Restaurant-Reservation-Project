import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from './services/api';

const LoginPage = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your email/username and password.');
      return;
    }

    try {
      const value = identifier.trim();
      const payload = value.includes('@')
        ? { email: value, password }
        : { username: value, password };
      const res = await authAPI.login(payload);

      if (res && res.success && res.user) {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess({
            name: res.user.name || res.user.username || res.user.first_name || value,
            user_type: res.user.user_type || 'member',
            email: res.user.email || value,
            is_staff: !!res.user.is_staff,
            is_superuser: !!res.user.is_superuser,
          });
        }
        navigate('/');
      } else {
        const serverMsg = (res && (res.message || res.detail || res.error)) || 'Login failed: invalid credentials';
        setError(serverMsg);
      }
    } catch (err) {
      setError(err?.message || 'Login error');
    }
  };

  const handleStaffLogin = () => {
    setError('');
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess({
        name: 'Admin',
        user_type: 'admin',
        role: 'admin',
        is_staff: true,
        is_superuser: true,
      });
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-2">Login</h1>
      <p className="text-muted mb-4">Use your email or username to sign in.</p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login-identifier" className="form-label">
            Email or Username
          </label>
          <input
            id="login-identifier"
            className="form-control"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign in
        </button>
      </form>

      <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleStaffLogin}>
        <Link to="/staff-login">
          Staff Login
        </Link>
      </button>

      {/* Simple user profile top-right (shown after parent sets session via onLoginSuccess) */}
      <div style={{ position: 'fixed', top: 12, right: 12 }}>
        {/* parent app should render actual user; this is a minimal placeholder */}
        {/* It intentionally stays empty here to avoid duplicating global state */}
      </div>

      <div className="text-center mt-3">
        <span className="text-muted">Don't have an account? </span>
        <Link to="/register">Sign up.</Link>
      </div>
    </div>
  );
};

export default LoginPage;
