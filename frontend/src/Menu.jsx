import { useState } from 'react';
import './styles/Menu.css';

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