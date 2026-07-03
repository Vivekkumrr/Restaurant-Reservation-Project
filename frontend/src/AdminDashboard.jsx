import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservationAPI } from './services/api';

const TABS = ['Reservations', 'Menu', 'Tables'];

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Reservations');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      if (activeTab !== 'Reservations') return;
      const data = await reservationAPI.getAll();
      setReservations(Array.isArray(data) ? data : data?.results || []);
    };
    loadReservations();
  }, [activeTab]);

  const handleStatusChange = async (id, status) => {
    const updated = await reservationAPI.updateStatus(id, status);
    if (updated?.id) {
      setReservations((prev) => prev.map((item) => (item.id === updated.id ? { ...item, status: updated.status } : item)));
    }
  };

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
        .ad__list { display: grid; gap: 1rem; }
        .ad__card { background: #141210; border: 1px solid rgba(232,196,106,0.15); border-radius: 6px; padding: 1rem 1.1rem; }
        .ad__card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; }
        .ad__card h4 { margin: 0; color: #fff; }
        .ad__meta { color: rgba(240,232,216,0.65); font-size: 0.92rem; margin: 0.2rem 0; }
        .ad__actions { display: flex; gap: 0.6rem; margin-top: 0.8rem; }
        .ad__btn { border: none; padding: 0.45rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
        .ad__btn--confirm { background: #e8c46a; color: #0c0a08; }
        .ad__btn--cancel { background: #7f1d1d; color: #fff; }
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
          {activeTab === 'Reservations' ? (
            <div className="ad__list">
              {reservations.length === 0 ? (
                <div className="ad__placeholder">No reservations yet.</div>
              ) : reservations.map((reservation) => (
                <div key={reservation.id} className="ad__card">
                  <div className="ad__card-head">
                    <h4>{reservation.name}</h4>
                    <span>{reservation.status}</span>
                  </div>
                  <p className="ad__meta">{reservation.email}</p>
                  <p className="ad__meta">Phone: {reservation.phone || 'N/A'}</p>
                  <p className="ad__meta">{reservation.date} at {reservation.time} • {reservation.guests} guests</p>
                  <div className="ad__actions">
                    {reservation.status === 'pending' && (
                      <>
                        <button className="ad__btn ad__btn--confirm" onClick={() => handleStatusChange(reservation.id, 'confirmed')}>Confirm</button>
                        <button className="ad__btn ad__btn--cancel" onClick={() => handleStatusChange(reservation.id, 'cancelled')}>Cancel</button>
                      </>
                    )}
                    {reservation.status === 'confirmed' && (
                      <button className="ad__btn ad__btn--cancel" onClick={() => handleStatusChange(reservation.id, 'cancelled')}>Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ad__placeholder">
              {activeTab} panel — connect to API to populate.
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;