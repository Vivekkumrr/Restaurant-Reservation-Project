import { useState } from 'react';

const CATEGORIES = ['All', 'Main Dishes', 'Side Snacks', 'Drinks'];

const Menu = ({ menuItems = [], loading = false, error = null }) => {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = menuItems.filter((item) => {
    const matchCat = active === 'All' || item.category === active;
    const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        .menu-page {
          background: #0c0a08;
          color: #f0e8d8;
          min-height: 100vh;
          padding: 4rem 2rem 6rem;
        }
        .menu-page__header { text-align: center; margin-bottom: 3rem; }
        .menu-page__eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.85rem;
        }
        .menu-page__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
        }
        .menu-page__title em { font-style: italic; color: #e8c46a; }
        .menu-page__subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-style: italic;
          color: rgba(240,232,216,0.55);
          margin-top: 0.75rem;
        }

        .menu-page__controls {
          max-width: 900px;
          margin: 0 auto 3rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
        }
        .menu-page__tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .menu-page__tab {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: transparent;
          color: rgba(240,232,216,0.55);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.45rem 1.1rem;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .menu-page__tab:hover { color: #e8c46a; border-color: rgba(232,196,106,0.35); }
        .menu-page__tab--active {
          background: rgba(232,196,106,0.1);
          color: #e8c46a;
          border-color: rgba(232,196,106,0.45);
        }
        .menu-page__search {
          background: #141210;
          border: 1px solid rgba(232,196,106,0.18);
          border-radius: 2px;
          color: #f0e8d8;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          padding: 0.5rem 1rem;
          outline: none;
          width: 220px;
          transition: border-color 0.2s;
        }
        .menu-page__search::placeholder { color: rgba(240,232,216,0.3); }
        .menu-page__search:focus { border-color: rgba(232,196,106,0.5); }

        .menu-page__grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.5rem;
        }
        .menu-card {
          background: #1e1b16;
          border: 1px solid rgba(232,196,106,0.1);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
        }
        .menu-card:hover { border-color: rgba(232,196,106,0.38); transform: translateY(-4px); }
        .menu-card__img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          background: #2a2520;
        }
        .menu-card__img-placeholder {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, #2a2520, #1e1b16);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }
        .menu-card__body {
          padding: 1.4rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .menu-card__cat {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.45rem;
        }
        .menu-card__name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .menu-card__desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(240,232,216,0.5);
          line-height: 1.6;
          flex: 1;
          margin-bottom: 1rem;
        }
        .menu-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 0.85rem;
        }
        .menu-card__price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #e8c46a;
        }
        .menu-card__type {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          color: rgba(240,232,216,0.35);
          letter-spacing: 0.06em;
        }

        .menu-page__empty {
          text-align: center;
          padding: 5rem 2rem;
          grid-column: 1/-1;
        }
        .menu-page__empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .menu-page__empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: rgba(240,232,216,0.45);
        }

        .menu-page__loading {
          text-align: center;
          padding: 6rem 2rem;
        }
        .menu-page__spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(232,196,106,0.15);
          border-top-color: #e8c46a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1.5rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .menu-page__loading p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: rgba(240,232,216,0.45);
          font-size: 1.1rem;
        }
      `}</style>

      <div className="menu-page">
        <div className="menu-page__header">
          <p className="menu-page__eyebrow">What We Serve</p>
          <h1 className="menu-page__title">
            Our <em>Menu</em>
          </h1>
          <p className="menu-page__subtitle">
            Every dish crafted with intention. Every bite, a memory.
          </p>
        </div>

        {!loading && !error && (
          <div className="menu-page__controls">
            <div className="menu-page__tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`menu-page__tab${active === cat ? ' menu-page__tab--active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              className="menu-page__search"
              placeholder="Search dishes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {loading ? (
          <div className="menu-page__loading">
            <div className="menu-page__spinner" />
            <p>Preparing the menu…</p>
          </div>
        ) : error ? (
          <div className="menu-page__empty">
            <div className="menu-page__empty-icon">⚠️</div>
            <p className="menu-page__empty-text">{error}</p>
          </div>
        ) : (
          <div className="menu-page__grid">
            {filtered.length === 0 ? (
              <div className="menu-page__empty">
                <div className="menu-page__empty-icon">🍽️</div>
                <p className="menu-page__empty-text">
                  No dishes found. Try a different filter.
                </p>
              </div>
            ) : (
              filtered.map((item) => {
                const emoji =
                  item.category === 'Drinks' ? '🥂'
                  : item.category === 'Side Snacks' ? '🍮'
                  : '🍽️';
                return (
                  <div key={item.id} className="menu-card">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="menu-card__img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="menu-card__img-placeholder">{emoji}</div>
                    )}
                    <div className="menu-card__body">
                      <div className="menu-card__cat">{item.category}</div>
                      <div className="menu-card__name">{item.name}</div>
                      <p className="menu-card__desc">{item.description}</p>
                      <div className="menu-card__footer">
                        <span className="menu-card__price">
                          ${Number(item.price).toFixed(2)}
                        </span>
                        {item.type && (
                          <span className="menu-card__type">{item.type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;