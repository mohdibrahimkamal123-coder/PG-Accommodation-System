import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Verified properties',
      description: 'Every home is physically inspected and verified for high-speed Wi-Fi, hygiene, and appliances by our local teams.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      title: 'Instant booking',
      description: 'Skip the endless negotiations and paperwork. Reserve your favorite space online in under 5 minutes.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      title: 'Secure payments',
      description: 'Automated digital invoicing, split billing options with roommates, and multiple secure transaction modes.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      )
    }
  ];

  return (
    <section className="why-us-section">
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Section Header */}
        <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Benefits</span>
        <h2 style={{ marginBottom: '16px' }}>Quiet confidence, built-in.</h2>
        <p style={{ maxWidth: '540px', margin: '0 auto 56px auto', fontSize: '16px' }}>
          We design stays that eliminate the stress of moving, allowing you to settle in and start living immediately.
        </p>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-card hover-lift" style={{ textAlign: 'left' }}>
              <div className="feature-icon-box">
                {feat.icon}
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
