import './styles/About.css'
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