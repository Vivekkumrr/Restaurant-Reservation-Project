import { useState } from 'react';
import { Link } from 'react-router-dom';

const TABS = ['Reservations', 'Menu', 'Tables'];

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Reservations');

  return (
    <>
      <style>{`
        .ad { min-height: 100vh; background: #0c0a08; color: #f0e8d8; font-family: 'Jost', sans-serif; }

        .ad__header {
          background: #141210;
          border-bottom: 1px solid rgba(232,196,106,0.15);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ad__brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #e8c46a;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .ad__brand span { color: #fff; }
        .ad__brand-icon { font-size: 1.1rem; }
        .ad__user {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: rgba(240,232,216,0.5);
        }
        .ad__logout {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0c0a08;
          background: #e8c46a;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ad__logout:hover { background: #f5dfa0; }

        .ad__tabs {
          background: #141210;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          padding: 0 2rem;
          gap: 0.25rem;
        }
        .ad__tab {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,232,216,0.45);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 1rem 1.25rem;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .ad__tab:hover { color: rgba(240,232,216,0.8); }
        .ad__tab--active { color: #e8c46a; border-bottom-color: #e8c46a; }

        .ad__body { padding: 2.5rem 2rem; max-width: 1100px; margin: 0 auto; }

        .ad__panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
        }

        .ad__placeholder {
          background: #141210;
          border: 1px dashed rgba(232,196,106,0.2);
          border-radius: 4px;
          padding: 3rem 2rem;
          text-align: center;
          color: rgba(240,232,216,0.3);
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="ad">
        {/* Header */}
        <header className="ad__header">
          <div className="ad__brand">
            <span className="ad__brand-icon">🍽️</span>
            Johnny's<span> Restaurant</span>
          </div>
          <div className="ad__user">
            <span>{user?.name || 'Staff'}</span>
            <Link className="ad__logout" to="/login">Logout</Link>
          </div>
        </header>

        {/* Tabs */}
        <nav className="ad__tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`ad__tab${activeTab === tab ? ' ad__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Body */}
        <main className="ad__body">
          <div className="ad__panel-title">{activeTab}</div>
          <div className="ad__placeholder">
            {activeTab} panel — connect to API to populate.
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;