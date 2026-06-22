import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from './services/api';

const RegisterPage = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const payload = { name: name.trim() || 'Customer', email: email.trim(), password };
      const res = await authAPI.register(payload);
      if (res && res.success && res.user) {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess({
            name: res.user.name || res.user.username || (name.trim() || 'Customer'),
            user_type: res.user.user_type || 'member',
            email: res.user.email || email.trim(),
            is_staff: !!res.user.is_staff,
            is_superuser: !!res.user.is_superuser,
          });
        }
      } else {
        const msg = (res && res.message) || (res && res.error) || 'Registration failed';
        setError(msg);
      }
    } catch (err) {
      setError(err?.message || 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-2">Create Account</h1>
      <p className="text-muted mb-4">Sign up to make reservations and more.</p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reg-name" className="form-label">
            Full Name
          </label>
          <input
            id="reg-name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-password" className="form-label">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-confirm" className="form-label">
            Confirm Password
          </label>
          <input
            id="reg-confirm"
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>

      <div className="text-center mt-3">
        <span className="text-muted">Already have an account? </span>
        <Link to="/login">Sign in.</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
