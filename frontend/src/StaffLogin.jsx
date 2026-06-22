import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaffLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Accept any credentials for now
    if (username.trim() || password.trim()) {
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess({
          name: username.trim() || 'Staff',
          user_type: 'staff'
        });
      }
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0c0a08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Header */}
        <div className="text-center mb-4">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1.5px solid rgba(232,196,106,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.3rem',
            }}
          >
            🔑
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: '2rem',
              color: '#fff',
              marginBottom: '0.4rem',
            }}
          >
            Staff Portal
          </h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Restricted access — authorised personnel only.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#141210',
            border: '1px solid rgba(232,196,106,0.15)',
            borderRadius: 4,
            padding: '2rem',
          }}
        >
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="staff-username" className="form-label">
                Username
              </label>
              <input
                id="staff-username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="staff-password" className="form-label">
                Password
              </label>
              <input
                id="staff-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                background: '#e8c46a',
                color: '#0c0a08',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                padding: '0.75rem',
                borderRadius: 2,
              }}
            >
              Sign In to Portal
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>
            Not staff?{' '}
          </span>
          <Link to="/login" style={{ fontSize: '0.85rem', color: '#e8c46a' }}>
            Customer login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StaffLogin;