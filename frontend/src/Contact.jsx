import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire to your backend when ready
    setSent(true);
  };

  return (
    <>
      <style>{`
        .contact { background: #0c0a08; color: #f0e8d8; min-height: 100vh; padding: 5rem 2rem; }
        .contact__inner { max-width: 1100px; margin: 0 auto; }
        .contact__header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .contact__eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.85rem;
        }
        .contact__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .contact__title em { font-style: italic; color: #e8c46a; }
        .contact__subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-style: italic;
          color: rgba(240,232,216,0.55);
          margin-top: 0.75rem;
        }

        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 768px) { .contact__grid { grid-template-columns: 1fr; } }

        .contact__info { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact__info-card {
          background: #1e1b16;
          border: 1px solid rgba(232,196,106,0.1);
          border-radius: 4px;
          padding: 1.75rem;
        }
        .contact__info-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.6rem;
        }
        .contact__info-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: rgba(240,232,216,0.8);
          line-height: 1.65;
        }
        .contact__info-value a {
          color: rgba(240,232,216,0.8);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact__info-value a:hover { color: #e8c46a; }
        .contact__hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .contact__hours-row:last-child { border-bottom: none; }
        .contact__hours-day { color: rgba(240,232,216,0.45); }
        .contact__hours-time { color: rgba(240,232,216,0.75); }

        .contact__form-card {
          background: #141210;
          border: 1px solid rgba(232,196,106,0.12);
          border-radius: 4px;
          padding: 2.5rem;
        }
        .contact__form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.75rem;
        }
        .contact__form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 560px) { .contact__form-row { grid-template-columns: 1fr; } }
        .contact__field { margin-bottom: 1rem; }
        .contact__label {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,232,216,0.55);
          margin-bottom: 0.5rem;
          display: block;
        }
        .contact__input,
        .contact__textarea {
          width: 100%;
          background: #0c0a08;
          border: 1px solid rgba(232,196,106,0.18);
          border-radius: 2px;
          color: #f0e8d8;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .contact__input:focus,
        .contact__textarea:focus { border-color: rgba(232,196,106,0.55); }
        .contact__textarea { resize: vertical; min-height: 130px; }
        .contact__submit {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: #e8c46a;
          color: #0c0a08;
          border: none;
          padding: 0.95rem 2.4rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 0.5rem;
        }
        .contact__submit:hover { background: #f5dfa0; transform: translateY(-2px); }
        .contact__success {
          background: rgba(232,196,106,0.1);
          border: 1px solid rgba(232,196,106,0.3);
          border-radius: 4px;
          padding: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: #e8c46a;
          text-align: center;
        }
      `}</style>

      <div className="contact">
        <div className="contact__inner">
          <div className="contact__header">
            <p className="contact__eyebrow">Reach Out</p>
            <h1 className="contact__title">
              We'd Love to <em>Hear from You</em>
            </h1>
            <p className="contact__subtitle">
              Questions, feedback, or just want to say hello — we're here.
            </p>
          </div>

          <div className="contact__grid">
            {/* Info */}
            <div className="contact__info">
              <div className="contact__info-card">
                <div className="contact__info-label">Address</div>
                <div className="contact__info-value">
                  123 Harbour View<br />
                  Kota Kinabalu, Sabah<br />
                  Malaysia
                </div>
              </div>

              <div className="contact__info-card">
                <div className="contact__info-label">Phone & Email</div>
                <div className="contact__info-value">
                  <a href="tel:+6088686786">+60 (88) 686-786</a><br />
                  <a href="mailto:hello@johnnysrestaurant.com">
                    hello@johnnysrestaurant.com
                  </a>
                </div>
              </div>

              <div className="contact__info-card">
                <div className="contact__info-label">Opening Hours</div>
                <div className="contact__info-value">
                  {[
                    { day: 'Mon – Thu', time: '11 AM – 9 PM' },
                    { day: 'Friday', time: '11 AM – 10 PM' },
                    { day: 'Saturday', time: '10 AM – 10 PM' },
                    { day: 'Sunday', time: '10 AM – 8 PM' },
                  ].map(({ day, time }) => (
                    <div key={day} className="contact__hours-row">
                      <span className="contact__hours-day">{day}</span>
                      <span className="contact__hours-time">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact__form-card">
              <h2 className="contact__form-title">Send a Message</h2>
              {sent ? (
                <div className="contact__success">
                  Thank you! Your message has been received.<br />
                  We'll get back to you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="contact__form-row">
                    <div>
                      <label className="contact__label" htmlFor="c-name">Name</label>
                      <input
                        id="c-name"
                        name="name"
                        className="contact__input"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="contact__label" htmlFor="c-email">Email</label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        className="contact__input"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="c-subject">Subject</label>
                    <input
                      id="c-subject"
                      name="subject"
                      className="contact__input"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="c-message">Message</label>
                    <textarea
                      id="c-message"
                      name="message"
                      className="contact__textarea"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us anything…"
                      required
                    />
                  </div>

                  <button type="submit" className="contact__submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;