import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservationAPI, tableAPI } from './services/api';
import './styles/AdminDashboard.css';


const TABS = ['Reservations', 'Menu', 'Tables'];

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Reservations');
  const [reservations, setReservations] = useState([]);

  const [tables, setTables] = useState([]);
  const emptyTableForm = { table_number: '', capacity: '', status: 'available', is_available: true };
  const [tableForm, setTableForm] = useState(emptyTableForm);
  const [editingTableId, setEditingTableId] = useState(null);
  const [tableError, setTableError] = useState('');

  useEffect(() => {
    const loadReservations = async () => {
      if (activeTab !== 'Reservations') return;
      const data = await reservationAPI.getAll();
      setReservations(Array.isArray(data) ? data : data?.results || []);
    };
    loadReservations();
  }, [activeTab]);

  useEffect(() => {
    const loadTables = async () => {
      if (activeTab !== 'Tables') return;
      const data = await tableAPI.getAll();
      setTables(Array.isArray(data) ? data : data?.results || []);
    };
    loadTables();
  }, [activeTab]);

  const handleStatusChange = async (id, status) => {
    const updated = await reservationAPI.updateStatus(id, status);
    if (updated?.id) {
      setReservations((prev) => prev.map((item) => (item.id === updated.id ? { ...item, status: updated.status } : item)));
    }
  };

  const handleDeleteReservation = async (id) => {
    const result = await reservationAPI.delete(id);
    if (result?.success) {
      setReservations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleTableFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTableForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTableEdit = (table) => {
    setEditingTableId(table.table_id ?? table.id);
    setTableForm({
      table_number: table.table_number ?? '',
      capacity: table.capacity ?? '',
      status: table.status ?? 'available',
      is_available: table.is_available ?? true,
    });
  };

  const handleTableCancelEdit = () => {
    setEditingTableId(null);
    setTableForm(emptyTableForm);
  };

  const handleTableSubmit = async (e) => {
    e.preventDefault();
    setTableError('');
    const payload = {
      table_number: Number(tableForm.table_number),
      capacity: Number(tableForm.capacity),
      status: tableForm.status,
      is_available: tableForm.is_available,
    };

    if (editingTableId) {
      const updated = await tableAPI.update(editingTableId, payload);
      if (updated?.table_id ?? updated?.id) {
        setTables((prev) => prev.map((t) => ((t.table_id ?? t.id) === editingTableId ? updated : t)));
        handleTableCancelEdit();
      } else {
        setTableError(updated?.table_number?.[0] || updated?.message || 'Update failed. Please try again.');
      }
    } else {
      const created = await tableAPI.create(payload);
      if (created?.table_id ?? created?.id) {
        setTables((prev) => [...prev, created]);
        setTableForm(emptyTableForm);
      } else {
        setTableError(created?.table_number?.[0] || created?.message || 'Creation failed. Please try again.');
      }
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
                    <button className="ad__delete-btn" onClick={() => handleDeleteReservation(reservation.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'Tables' ? (
            <div>
              <form className="ad__table-form" onSubmit={handleTableSubmit}>
                <input
                  className="ad__input"
                  name="table_number"
                  type="number"
                  placeholder="Table Number"
                  value={tableForm.table_number}
                  onChange={handleTableFieldChange}
                  required
                />
                <input
                  className="ad__input"
                  name="capacity"
                  type="number"
                  placeholder="Capacity"
                  value={tableForm.capacity}
                  onChange={handleTableFieldChange}
                  required
                />
                <select className="ad__select" name="status" value={tableForm.status} onChange={handleTableFieldChange}>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
                <label className="ad__checkbox-label">
                  <input
                    name="is_available"
                    type="checkbox"
                    checked={tableForm.is_available}
                    onChange={handleTableFieldChange}
                  />
                  Is Available
                </label>
                <button className="ad__btn ad__btn--confirm" type="submit">{editingTableId ? 'Update Table' : 'Add Table'}</button>
                {editingTableId && (
                  <button className="ad__btn ad__btn--cancel" type="button" onClick={handleTableCancelEdit}>Cancel</button>
                )}
                {tableError && <p className="ad__form-error">{tableError}</p>}
              </form>

              <div className="ad__table-grid">
                {tables.length === 0 ? (
                  <div className="ad__placeholder">No tables yet.</div>
                ) : tables.map((table) => (
                  <div key={table.table_id ?? table.id} className="ad__table-card">
                    <div className="ad__table-number">Table {table.table_number}</div>
                    <div className="ad__table-row">Capacity: {table.capacity}</div>
                    <div className="ad__table-row">{table.is_available ? 'Available' : 'Not Available'}</div>
                    <span className={`ad__table-status ad__table-status--${table.status}`}>{table.status}</span>
                    <div className="ad__actions">
                      <button className="ad__btn ad__btn--confirm" onClick={() => handleTableEdit(table)}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
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