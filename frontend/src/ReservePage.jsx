import { useMemo, useState } from 'react';

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

const ReservePage = () => {
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
    date: minDate,
    time: timeOptions[0]?.value ?? '',
    guests: '2',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire to API later
    setSubmitted(true);
  };

  const isComplete =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.date &&
    form.time;

  return (
    <>
      <style>{`
        .rp {
          background: #0c0a08;
          color: #f0e8d8;
          min-height: 100vh;
          padding: 5rem 2rem 6rem;
        }
        .rp__inner { max-width: 760px; margin: 0 auto; }

        .rp__header { text-align: center; margin-bottom: 3.5rem; }
        .rp__eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.85rem;
        }
        .rp__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
        }
        .rp__title em { font-style: italic; color: #e8c46a; }
        .rp__subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(240,232,216,0.5);
          margin-top: 0.75rem;
        }

        .rp__card {
          background: #141210;
          border: 1px solid rgba(232,196,106,0.12);
          border-radius: 4px;
          padding: 2.5rem;
        }

        .rp__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 560px) { .rp__grid { grid-template-columns: 1fr; } }

        .rp__field { display: flex; flex-direction: column; gap: 0.45rem; }
        .rp__field--full { grid-column: 1 / -1; }

        .rp__label {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(240,232,216,0.5);
        }
        .rp__input,
        .rp__select,
        .rp__textarea {
          background: #0c0a08;
          border: 1px solid rgba(232,196,106,0.18);
          border-radius: 2px;
          color: #f0e8d8;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          padding: 0.75rem 1rem;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
          appearance: none;
        }
        .rp__input::placeholder { color: rgba(240,232,216,0.25); }
        .rp__input:focus,
        .rp__select:focus,
        .rp__textarea:focus { border-color: rgba(232,196,106,0.5); }
        .rp__select { cursor: pointer; }
        .rp__select option { background: #1e1b16; }
        .rp__textarea { resize: vertical; min-height: 110px; }

        .rp__help {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(240,232,216,0.3);
          margin-top: 0.15rem;
        }

        .rp__divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 1.75rem 0;
        }

        .rp__footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .rp__submit {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: #e8c46a;
          color: #0c0a08;
          border: none;
          padding: 0.9rem 2.4rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .rp__submit:hover:not(:disabled) { background: #f5dfa0; transform: translateY(-2px); }
        .rp__submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .rp__success {
          background: rgba(232,196,106,0.08);
          border: 1px solid rgba(232,196,106,0.28);
          border-radius: 4px;
          padding: 2.5rem;
          text-align: center;
        }
        .rp__success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .rp__success-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        .rp__success-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(240,232,216,0.6);
          line-height: 1.65;
        }
        .rp__success-btn {
          margin-top: 1.75rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: transparent;
          color: #e8c46a;
          border: 1px solid rgba(232,196,106,0.35);
          padding: 0.65rem 1.6rem;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .rp__success-btn:hover { border-color: #e8c46a; background: rgba(232,196,106,0.07); }

        .rp__info {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 560px) { .rp__info { grid-template-columns: 1fr; } }
        .rp__info-card {
          background: #1e1b16;
          border: 1px solid rgba(232,196,106,0.08);
          border-radius: 4px;
          padding: 1.25rem 1.5rem;
        }
        .rp__info-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.4rem;
        }
        .rp__info-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: rgba(240,232,216,0.65);
          line-height: 1.6;
        }
        .rp__info-value a {
          color: rgba(240,232,216,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .rp__info-value a:hover { color: #e8c46a; }
      `}</style>

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
                  <button
                    type="submit"
                    className="rp__submit"
                    disabled={!isComplete}
                  >
                    Confirm Reservation
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
    </>
  );
};

export default ReservePage;