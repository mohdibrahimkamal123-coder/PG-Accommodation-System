import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const metrics = [
    { label: 'Happy Residents', value: '15,000+' },
    { label: 'Active Cities', value: '4 Hubs' },
    { label: 'Inspected Homes', value: '500+' },
    { label: 'Customer Rating', value: '4.9/5★' }
  ];

  const values = [
    {
      title: 'Design-Driven',
      desc: 'We curate spaces that inspire focus, productivity, and absolute comfort.'
    },
    {
      title: 'Trust First',
      desc: 'Transparent pricing, standard lock-ins, and 100% verified rooms.'
    },
    {
      title: 'Community Driven',
      desc: 'Connecting like-minded remote professionals, makers, and innovators.'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '80vh' }}>
      <div className="container">
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Our Story</span>
          <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>Reimagining flexible city living.</h1>
          <p className="hero-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            SmartStay was founded with a simple vision: to eliminate the friction of moving and renting, giving modern professionals a place to settle in instantly and focus on what matters.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid-cols-4 grid" style={{ marginBottom: '100px' }}>
          {metrics.map((m, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--accent-color)', marginBottom: '8px' }}>
                {m.value}
              </div>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)', fontSize: '14px' }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Vision & Values */}
        <div className="grid-cols-2 grid" style={{ gap: '64px', marginBottom: '100px', alignItems: 'center' }}>
          <div>
            <span className="section-tag">Our Vision</span>
            <h2 style={{ marginBottom: '20px', fontSize: '32px' }}>Your home, everywhere.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
              In a world where work is fluid and travel is second nature, the concept of home should be equally flexible. We are building a global network of vetted residential spaces where you can live, work, and connect seamlessly.
            </p>
            <Link to="/find-pg" className="btn btn-primary">Find Your Space</Link>
          </div>
          <div className="hover-zoom-img-container" style={{ borderRadius: '28px', height: '360px', boxShadow: 'var(--shadow-md)' }}>
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80" alt="" />
          </div>
        </div>

        {/* Values Grid */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-tag">Core Values</span>
            <h2>How we work.</h2>
          </div>
          <div className="grid-cols-3 grid">
            {values.map((v, idx) => (
              <div key={idx} className="feature-card" style={{ background: '#FFFFFF' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
