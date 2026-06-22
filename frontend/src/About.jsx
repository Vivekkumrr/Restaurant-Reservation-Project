const About = () => {
  const team = [
    {
      name: 'Johnny Tan',
      role: 'Founder & Head Chef',
      bio: 'With over 25 years in the kitchen, Johnny built this restaurant on the belief that every guest deserves a meal they will never forget.',
      initials: 'JT',
    },
    {
      name: 'Maria Santos',
      role: 'Executive Sous Chef',
      bio: 'Trained in Lyon and Tokyo, Maria brings a rare depth of technique and a passion for locally sourced ingredients.',
      initials: 'MS',
    },
    {
      name: 'Raj Patel',
      role: 'Sommelier',
      bio: 'Raj curates our cellar with surgical care, pairing each dish with wines that transform good meals into great ones.',
      initials: 'RP',
    },
  ];

  const milestones = [
    { year: '1998', event: 'Johnny\'s opens its doors with just 12 tables in Kota Kinabalu.' },
    { year: '2004', event: 'Awarded "Best Fine Dining" by the Sabah Food & Lifestyle Guide.' },
    { year: '2010', event: 'Full renovation — the intimate 60-seat dining room you love today.' },
    { year: '2017', event: 'Launched our seasonal tasting menu, now a local institution.' },
    { year: '2023', event: 'Celebrated 25 years of unforgettable dining experiences.' },
  ];

  return (
    <>
      <style>{`
        .about { background: #0c0a08; color: #f0e8d8; min-height: 100vh; }

        .about__hero {
          background-image: url('https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80');
          background-size: cover;
          background-position: center;
          position: relative;
          height: 440px;
          display: flex;
          align-items: flex-end;
          padding: 3rem 2rem;
        }
        .about__hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(12,10,8,0.3) 0%, rgba(12,10,8,0.9) 100%);
        }
        .about__hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
        }
        .about__eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.85rem;
        }
        .about__hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
        }
        .about__hero-title em { font-style: italic; color: #e8c46a; }

        .about__story {
          max-width: 820px;
          margin: 0 auto;
          padding: 5rem 2rem;
          text-align: center;
        }
        .about__story-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .about__story p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(240,232,216,0.72);
          line-height: 1.8;
          margin-bottom: 1.2rem;
        }

        .about__milestones {
          background: #141210;
          border-top: 1px solid rgba(232,196,106,0.12);
          border-bottom: 1px solid rgba(232,196,106,0.12);
          padding: 5rem 2rem;
        }
        .about__milestones-inner { max-width: 760px; margin: 0 auto; }
        .about__section-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 1rem;
          text-align: center;
        }
        .about__milestones-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 3rem;
        }
        .about__timeline {
          position: relative;
          padding-left: 2.5rem;
        }
        .about__timeline::before {
          content: '';
          position: absolute;
          left: 0.6rem;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 1px;
          background: rgba(232,196,106,0.25);
        }
        .about__milestone {
          position: relative;
          margin-bottom: 2.5rem;
        }
        .about__milestone:last-child { margin-bottom: 0; }
        .about__milestone::before {
          content: '';
          position: absolute;
          left: -2.15rem;
          top: 0.45rem;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e8c46a;
          border: 2px solid #0c0a08;
          box-shadow: 0 0 0 3px rgba(232,196,106,0.2);
        }
        .about__milestone-year {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.3rem;
        }
        .about__milestone-event {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          color: rgba(240,232,216,0.8);
          line-height: 1.6;
        }

        .about__team {
          padding: 5rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .about__team-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .about__team-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #fff;
          margin-top: 0.6rem;
        }
        .about__team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .about__team-card {
          background: #1e1b16;
          border: 1px solid rgba(232,196,106,0.1);
          border-radius: 4px;
          padding: 2rem;
          transition: border-color 0.25s, transform 0.25s;
        }
        .about__team-card:hover { border-color: rgba(232,196,106,0.35); transform: translateY(-4px); }
        .about__team-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(232,196,106,0.12);
          border: 1.5px solid rgba(232,196,106,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #e8c46a;
          margin-bottom: 1.1rem;
        }
        .about__team-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.2rem;
        }
        .about__team-role {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e8c46a;
          margin-bottom: 0.85rem;
        }
        .about__team-bio {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: rgba(240,232,216,0.55);
          line-height: 1.7;
        }
      `}</style>

      <div className="about">
        {/* Hero */}
        <div className="about__hero">
          <div className="about__hero-content">
            <p className="about__eyebrow">Our Story</p>
            <h1 className="about__hero-title">
              Built on Passion,<br />
              Served with <em>Heart</em>
            </h1>
          </div>
        </div>

        {/* Story */}
        <section className="about__story">
          <h2 className="about__story-title">A Table for Every Occasion</h2>
          <p>
            Johnny's Restaurant was born from a simple idea: that a great meal can bring people
            together in ways that nothing else can. Since 1998, we've been welcoming guests through
            our doors — families celebrating milestones, couples on first dates, old friends
            reconnecting over a shared dish.
          </p>
          <p>
            Our kitchen runs on the belief that quality is not a luxury — it's a baseline. Every
            ingredient is chosen with intention, every recipe refined through years of love and
            learning. We cook the way our guests deserve: with care, with honesty, and with pride.
          </p>
        </section>

        {/* Timeline */}
        <section className="about__milestones">
          <div className="about__milestones-inner">
            <p className="about__section-label">Our Journey</p>
            <h2 className="about__milestones-title">25 Years of Moments</h2>
            <div className="about__timeline">
              {milestones.map((m) => (
                <div key={m.year} className="about__milestone">
                  <div className="about__milestone-year">{m.year}</div>
                  <div className="about__milestone-event">{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="about__team">
          <div className="about__team-header">
            <p className="about__section-label">The People Behind the Plates</p>
            <h2 className="about__team-title">Meet the Team</h2>
          </div>
          <div className="about__team-grid">
            {team.map((m) => (
              <div key={m.name} className="about__team-card">
                <div className="about__team-avatar">{m.initials}</div>
                <div className="about__team-name">{m.name}</div>
                <div className="about__team-role">{m.role}</div>
                <p className="about__team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;