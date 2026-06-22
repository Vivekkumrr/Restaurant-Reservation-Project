import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import s from './styles/homepage.module.css';

const specialties = [
  { icon: '🥩', title: 'Prime Cuts',      desc: 'Hand-selected aged steaks, cooked to your perfection over hardwood flame.' },
  { icon: '🍷', title: 'Curated Cellar',  desc: 'An intimate wine list sourced from boutique estates around the world.' },
  { icon: '🌿', title: 'Garden Fresh',    desc: 'Seasonal produce from local farms, crafted into vibrant starters and sides.' },
  { icon: '🎂', title: 'Artisan Desserts',desc: 'House-made confections that end every meal on an unforgettable note.' },
];

const testimonials = [
  { quote: 'The finest dining experience in the city. Every detail is perfection.',      name: 'Sarah M.',  title: 'Food Critic'   },
  { quote: "Johnny's is where we celebrate everything that matters. Impeccable.",        name: 'David L.',  title: 'Regular Guest' },
  { quote: 'The ambiance, the food, the service — nothing else compares.',               name: 'Priya N.',  title: 'Food Blogger'  },
];

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 18;
      const y = (e.clientY / h - 0.5) * 12;
      hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className={s.hp}>

      {/* ── Hero ── */}
      <section className={s.hero} ref={heroRef}>
        <div className={s.heroContent}>
          <p className={s.heroEyebrow}>Est. 1998 · Fine Dining</p>
          <h1 className={s.heroTitle}>
            Where Every Meal<br />
            Becomes a <em>Memory</em>
          </h1>
          <p className={s.heroSub}>
            Refined flavours, warm ambiance, and service that feels like home —
            welcome to Johnny's.
          </p>
          <div className={s.heroActions}>
            <Link to="/reservations" className={s.btnPrimary}>Reserve a Table</Link>
            <Link to="/menu"         className={s.btnOutline}>View Menu</Link>
          </div>
        </div>
        <div className={s.scroll}>
          <span>Scroll</span>
          <div className={s.scrollLine} />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className={s.intro}>
        <div className={s.introInner}>
          <p className={s.sectionLabel}>Our Philosophy</p>
          <h2 className={s.introTitle}>
            More than a restaurant.<br />A ritual.
          </h2>
          <p className={s.introBody}>
            At Johnny's, we believe that great food is only the beginning.
            It's the laughter across the table, the clinking of glasses, the quiet satisfaction
            of a perfect bite — those are the moments we craft every single day.
          </p>
        </div>
      </section>

      {/* ── Specialties ── */}
      <section className={s.specialties}>
        <div className={s.specialtiesInner}>
          <div className={s.specialtiesHeader}>
            <p className={s.sectionLabel}>What We Do Best</p>
            <h2 className={s.specialtiesTitle}>Our Specialties</h2>
          </div>
          <div className={s.specialtiesGrid}>
            {specialties.map((item) => (
              <div key={item.title} className={s.specialtyCard}>
                <span className={s.specialtyIcon}>{item.icon}</span>
                <div className={s.specialtyName}>{item.title}</div>
                <p className={s.specialtyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parallax Divider ── */}
      <div className={s.divider}>
        <div className={s.dividerContent}>
          <p className={s.dividerQuote}>
            "Food is the ingredient that binds us together —
            and at Johnny's, every table tells a <em>story</em>."
          </p>
          <Link to="/about" className={s.btnOutline}>Our Story</Link>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <section className={s.testimonials}>
        <div className={s.testimonialsInner}>
          <div className={s.testimonialsHeader}>
            <p className={s.sectionLabel}>Guest Voices</p>
            <h2 className={s.testimonialsTitle}>What Our Guests Say</h2>
          </div>
          <div className={s.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={s.testimonial}>
                <p className={s.testimonialText}>{t.quote}</p>
                <div className={s.testimonialDivider} />
                <div className={s.testimonialName}>{t.name}</div>
                <div className={s.testimonialRole}>{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2 className={s.ctaTitle}>
            Ready for an<br /><em>Unforgettable</em> Evening?
          </h2>
          <p className={s.ctaSub}>
            Secure your table today. Whether it's a quiet dinner for two or a
            celebration with loved ones, we'll make it extraordinary.
          </p>
          <div className={s.ctaActions}>
            <Link to="/reservations" className={s.btnPrimary}>Book a Table</Link>
            <Link to="/contact"      className={s.btnOutline}>Get in Touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;