import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservationAPI } from './services/api';
import './styles/ReservePage.css';

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const buildTimeOptions = () => {
  const opts = [];
  for (let h = 11; h <= 21; h++) {
    for (const m of [0, 30]) {
      if (h === 21 && m === 30) continue;
      const val = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const isPm = h >= 12;
      const h12 = ((h + 11) % 12) + 1;
      opts.push({ value: val, label: `${h12}:${String(m).padStart(2, '0')} ${isPm ? 'PM' : 'AM'}` });
    }
  }
  return opts;
};

const ReservePage = ({ user }) => {
  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => formatDate(today), [today]);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 30);
    return formatDate(d);
  }, [today]);
  const timeOptions = useMemo(() => buildTimeOptions(), []);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    table: '',
    date: minDate,
    time: timeOptions[0]?.value ?? '',
    guests: '2',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    setApiError('');
    setSubmitting(true);
    try {
      const res = await reservationAPI.create({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        table: form.table,
        date: form.date,
        time: form.time,
        guests: Number(form.guests),
        notes: form.notes,
      });
      if (res?.id || res?.success !== false) {
        setSubmitted(true);
      } else {
        setApiError(res?.message || 'Booking failed. Please try again.');
      }
    } catch {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.date &&
    form.time;

  return (
    <>
      <div className="rp">
        <div className="rp__inner">
          <div className="rp__header">
            <p className="rp__eyebrow">Dine With Us</p>
            <h1 className="rp__title">Reserve a <em>Table</em></h1>
            <p className="rp__subtitle">Book in seconds. We'll take care of the rest.</p>
          </div>

          {submitted ? (
            <div className="rp__success">
              <div className="rp__success-icon">🕯️</div>
              <div className="rp__success-title">Reservation Received</div>
              <p className="rp__success-text">
                Thank you, {form.fullName.split(' ')[0]}. We look forward to welcoming you on {form.date} at {timeOptions.find(t => t.value === form.time)?.label}.
              </p>
              <button className="rp__success-btn" onClick={() => setSubmitted(false)}>
                Make Another Reservation
              </button>
            </div>
          ) : (
            <div className="rp__card">
              <form onSubmit={handleSubmit}>
                <div className="rp__grid">
                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-name">Full Name</label>
                    <input
                      id="rp-name"
                      name="fullName"
                      className="rp__input"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-email">Email</label>
                    <input
                      id="rp-email"
                      name="email"
                      type="email"
                      className="rp__input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-phone">Phone</label>
                    <input
                      id="rp-phone"
                      name="phone"
                      type="tel"
                      className="rp__input"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+60..."
                      required
                    />
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-table">Table</label>
                    <select
                      id="rp-table"
                      name="table"
                      className="rp__select"
                      value={form.table}
                      onChange={handleChange}
                    >
                      <option value="">Select a table</option>
                      <option value="1">Table 1</option>
                      <option value="2">Table 2</option>
                      <option value="3">Table 3</option>
                      <option value="4">Table 4</option>
                      <option value="5">Table 5</option>
                    </select>
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-guests">Guests</label>
                    <select
                      id="rp-guests"
                      name="guests"
                      className="rp__select"
                      value={form.guests}
                      onChange={handleChange}
                    >
                      {Array.from({ length: 8 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1)}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-date">Date</label>
                    <input
                      id="rp-date"
                      name="date"
                      type="date"
                      className="rp__input"
                      value={form.date}
                      onChange={handleChange}
                      min={minDate}
                      max={maxDate}
                      required
                    />
                    <span className="rp__help">Up to 30 days in advance</span>
                  </div>

                  <div className="rp__field">
                    <label className="rp__label" htmlFor="rp-time">Time</label>
                    <select
                      id="rp-time"
                      name="time"
                      className="rp__select"
                      value={form.time}
                      onChange={handleChange}
                    >
                      {timeOptions.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <span className="rp__help">11:00 AM – 9:00 PM</span>
                  </div>

                  <div className="rp__field rp__field--full">
                    <label className="rp__label" htmlFor="rp-notes">Notes <span style={{ opacity: 0.4 }}>(optional)</span></label>
                    <textarea
                      id="rp-notes"
                      name="notes"
                      className="rp__textarea"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, special occasions, seating preferences…"
                    />
                  </div>
                </div>

                <hr className="rp__divider" />

                <div className="rp__footer">
                  {apiError && (
                    <p style={{ color: '#e57373', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', margin: 0 }}>
                      {apiError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="rp__submit"
                    disabled={!isComplete || submitting}
                  >
                    {submitting ? 'Confirming...' : 'Confirm Reservation'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="rp__info">
            <div className="rp__info-card">
              <div className="rp__info-label">Phone</div>
              <div className="rp__info-value">
                <a href="tel:+6088686786">+60 (88) 686-786</a>
              </div>
            </div>
            <div className="rp__info-card">
              <div className="rp__info-label">Cancellation</div>
              <div className="rp__info-value">
                Please notify us as early as possible if your plans change.
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginPopup && (
        <div className="rp__overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="rp__popup" onClick={(e) => e.stopPropagation()}>
            <div className="rp__popup-title">Sign in to Book</div>
            <p className="rp__popup-text">
              You need an account to make a reservation. It only takes a minute.
            </p>
            <div className="rp__popup-actions">
              <Link to="/login" className="rp__popup-btn-primary">Sign In</Link>
              <Link to="/register" className="rp__popup-btn-primary">Register</Link>
              <button className="rp__popup-btn-ghost" onClick={() => setShowLoginPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservePage;