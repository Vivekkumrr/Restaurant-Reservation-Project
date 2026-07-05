import { useState } from 'react';
import './styles/Contact.css';

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