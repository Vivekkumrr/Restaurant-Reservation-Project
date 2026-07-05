import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservationAPI } from './services/api';
import './styles/AdminDashboard.css';


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
      <div className="ad">
        {/* Header */}
        <header className="ad__header">
          <div className="ad__brand">
            <span className="ad__brand-icon">🍽️</span>
            Johnny's<span> Restaurant</span>
          </div>
          <div className="ad__user">
            <span>{user?.name || 'Admin'}</span>
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