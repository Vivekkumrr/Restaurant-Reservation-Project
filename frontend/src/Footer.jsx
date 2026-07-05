import { Link } from 'react-router-dom';
import './styles/Footer.css';



const Footer = () => (
  <>
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