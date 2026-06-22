import { Link } from 'react-router-dom';

const Footer = () => (
  <>
    <style>{`
      .jn-footer {
        background: #080604;
        border-top: 1px solid rgba(232,196,106,0.12);
        padding: 4rem 2rem 2rem;
        font-family: 'Jost', sans-serif;
        color: rgba(240,232,216,0.5);
      }
      .jn-footer__inner {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.8fr 1fr 1fr;
        gap: 3rem;
      }
      .jn-footer__brand {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #e8c46a;
        margin-bottom: 0.85rem;
      }
      .jn-footer__brand span { color: #fff; }
      .jn-footer__tagline {
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-size: 1rem;
        color: rgba(240,232,216,0.45);
        line-height: 1.65;
        margin-bottom: 1.5rem;
      }
      .jn-footer__contact a {
        display: block;
        color: rgba(240,232,216,0.55);
        text-decoration: none;
        font-size: 0.88rem;
        font-weight: 300;
        letter-spacing: 0.03em;
        line-height: 2;
        transition: color 0.2s;
      }
      .jn-footer__contact a:hover { color: #e8c46a; }
      .jn-footer__col-title {
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #e8c46a;
        margin-bottom: 1.2rem;
      }
      .jn-footer__links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .jn-footer__links a {
        font-size: 0.9rem;
        font-weight: 300;
        color: rgba(240,232,216,0.55);
        text-decoration: none;
        transition: color 0.2s;
      }
      .jn-footer__links a:hover { color: #e8c46a; }
      .jn-footer__hours-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.87rem;
        font-weight: 300;
        line-height: 2;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 0.15rem;
      }
      .jn-footer__hours-day { color: rgba(240,232,216,0.45); }
      .jn-footer__hours-time { color: rgba(240,232,216,0.65); }
      .jn-footer__bottom {
        max-width: 1100px;
        margin: 2.5rem auto 0;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255,255,255,0.06);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        font-size: 0.78rem;
        font-weight: 300;
        letter-spacing: 0.04em;
        color: rgba(240,232,216,0.3);
      }
      @media (max-width: 768px) {
        .jn-footer__inner { grid-template-columns: 1fr; gap: 2rem; }
        .jn-footer__bottom { justify-content: center; text-align: center; }
      }
    `}</style>

    <footer className="jn-footer">
      <div className="jn-footer__inner">
        {/* Brand */}
        <div>
          <div className="jn-footer__brand">Johnny's<span> Restaurant</span></div>
          <p className="jn-footer__tagline">
            Fine dining with the warmth of home. Every table is a celebration.
          </p>
          <div className="jn-footer__contact">
            <a href="tel:+6088686786">+60 (88) 686-786</a>
            <a href="mailto:hello@johnnysrestaurant.com">hello@johnnysrestaurant.com</a>
            <a href="#">123 Harbour View, Kota Kinabalu, Sabah</a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="jn-footer__col-title">Navigate</div>
          <ul className="jn-footer__links">
            {[
              { to: '/', label: 'Home' },
              { to: '/menu', label: 'Menu' },
              { to: '/reservations', label: 'Reservations' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <div className="jn-footer__col-title">Opening Hours</div>
          {[
            { day: 'Mon – Thu', time: '11:00 AM – 9:00 PM' },
            { day: 'Friday', time: '11:00 AM – 10:00 PM' },
            { day: 'Saturday', time: '10:00 AM – 10:00 PM' },
            { day: 'Sunday', time: '10:00 AM – 8:00 PM' },
          ].map(({ day, time }) => (
            <div key={day} className="jn-footer__hours-row">
              <span className="jn-footer__hours-day">{day}</span>
              <span className="jn-footer__hours-time">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="jn-footer__bottom">
        <span>© {new Date().getFullYear()} Johnny's Restaurant. All rights reserved.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  </>
);

export default Footer;