import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      <style>{`
        .jn-navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          transition: background 0.35s ease, box-shadow 0.35s ease;
          background: ${scrolled ? 'rgba(12,10,8,0.97)' : 'transparent'};
          box-shadow: ${scrolled ? '0 2px 24px rgba(0,0,0,0.55)' : 'none'};
          backdrop-filter: ${scrolled ? 'blur(12px)' : 'none'};
        }
        .jn-navbar__brand {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e8c46a;
          text-decoration: none;
          letter-spacing: 0.03em;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .jn-navbar__brand span { color: #fff; }
        .jn-navbar__brand:hover { opacity: 0.85; }
        .jn-navbar__links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0 auto;
          list-style: none;
          padding: 0;
        }
        .jn-navbar__link {
          font-family: 'Cormorant Garamond', 'Palatino Linotype', serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          border-radius: 2px;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .jn-navbar__link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%; right: 50%;
          height: 1.5px;
          background: #e8c46a;
          transition: left 0.25s ease, right 0.25s ease;
        }
        .jn-navbar__link:hover,
        .jn-navbar__link--active {
          color: #e8c46a;
        }
        .jn-navbar__link:hover::after,
        .jn-navbar__link--active::after {
          left: 0.85rem; right: 0.85rem;
        }
        .jn-navbar__right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .jn-navbar__user {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.04em;
        }
        .jn-navbar__cta {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0c0a08;
          background: #e8c46a;
          border: none;
          padding: 0.45rem 1.2rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .jn-navbar__cta:hover { background: #f0d08a; transform: translateY(-1px); }
        .jn-navbar__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
          margin-left: auto;
        }
        .jn-navbar__burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #e8c46a;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .jn-mobile-menu {
          display: none;
          position: fixed;
          top: 72px; left: 0; right: 0;
          background: rgba(12,10,8,0.98);
          backdrop-filter: blur(16px);
          padding: 1.5rem 2rem 2rem;
          border-top: 1px solid rgba(232,196,106,0.2);
          z-index: 999;
          flex-direction: column;
          gap: 0.25rem;
        }
        .jn-mobile-menu--open { display: flex; }
        .jn-mobile-menu a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: color 0.2s;
        }
        .jn-mobile-menu a:hover,
        .jn-mobile-menu a.active { color: #e8c46a; }
        .jn-mobile-menu__actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .jn-navbar__links { display: none; }
          .jn-navbar__right { display: none; }
          .jn-navbar__burger { display: flex; }
        }
      `}</style>

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