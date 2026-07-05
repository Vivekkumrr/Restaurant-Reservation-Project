import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/reservations', label: 'Reservations' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <nav className="jn-navbar">
        <Link to="/" className="jn-navbar__brand">
          Johnny's<span> Restaurant</span>
        </Link>

        <ul className="jn-navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`jn-navbar__link${isActive(to) ? ' jn-navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="jn-navbar__right">
          {user ? (
            <>
              <span className="jn-navbar__user">
                {user.name || user.username || 'Guest'}
              </span>
              <button className="jn-navbar__cta" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="jn-navbar__cta">
              Sign In
            </Link>
          )}
        </div>

        <button
          className="jn-navbar__burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}
          />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span
            style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}}
          />
        </button>
      </nav>

      <div className={`jn-mobile-menu${menuOpen ? ' jn-mobile-menu--open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? 'active' : ''}
          >
            {label}
          </Link>
        ))}
        <div className="jn-mobile-menu__actions">
          {user ? (
            <button className="jn-navbar__cta" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="jn-navbar__cta">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;